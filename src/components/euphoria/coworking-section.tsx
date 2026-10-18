"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { COWORKING } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { CarouselArrows, SlideCounter } from "@/components/euphoria/carousel-controls";
import { CtaButton } from "@/components/euphoria/cta-button";
import { cn } from "@/lib/utils";

function rootScale() {
  if (typeof document === "undefined") return 1;
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return (Number.isFinite(root) ? root : 16) / 16;
}

const SHOW_MOBILE_FIGURES = true;
const SHOW_TIER_TITLE_GLOW = false;
const MotionImage = motion.create(Image);

const PHOTO_SRC = {
  studia3: ASSETS.studia3,
  studia6: ASSETS.studia6,
  studia7: ASSETS.studia7,
} as const;

const tiers = COWORKING.tiers;
type TierId = (typeof tiers)[number]["id"];

const ease = [0.22, 1, 0.36, 1] as const;
const PERSEUS_OFFSET_X = "clamp(2rem, 3.5vw, 4.5rem)";
const STATUE_LAYER_LIFT = 220;
const archHeights = ["lg:h-[26.25rem]", "lg:h-[31.25rem]", "lg:h-[28.125rem]"] as const;
const archShift = ["", "lg:-translate-y-[1.875rem]", ""] as const;

export function CoworkingSection() {
  const reduced = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);
  const gorgonRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [statueSize, setStatueSize] = useState<{ w: number; h: number } | null>(null);
  const [perseyTop, setPerseyTop] = useState<number | null>(null);
  const [photoMask, setPhotoMask] = useState<{ top: string; fade: string } | null>(null);
  const [isLg, setIsLg] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const statueY = useTransform(scrollYProgress, (progress) => (40 - 120 * progress) * rootScale());
  const archY = [
    useTransform(scrollYProgress, (progress) => (28 + -56 * progress) * rootScale()),
    useTransform(scrollYProgress, (progress) => (12 + -24 * progress) * rootScale()),
    useTransform(scrollYProgress, (progress) => (44 + -88 * progress) * rootScale()),
  ] as const;
  const bustY = useTransform(scrollYProgress, (progress) => (18 + -36 * progress) * rootScale());
  const copyY = useTransform(scrollYProgress, (progress) => (32 + -64 * progress) * rootScale());
  const move = isLg && !reduced;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsLg(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const gorgon = gorgonRef.current;
    if (!section || !gorgon) return;

    const sync = () => {
      gorgon.style.height = "";
      gorgon.style.width = "";
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setStatueSize(null);
        setPerseyTop(null);
        setPhotoMask(null);
        return;
      }
      const width = gorgon.offsetWidth;
      const height = gorgon.offsetHeight;
      if (width <= 0 || height <= 0) return;
      setStatueSize({ w: width, h: height });
      const renderedH = Math.min(height, width * (1536 / 1024));
      const bitmapTop = Math.max(0, height - renderedH);
      const fadeEnd = Math.min(bitmapTop + renderedH * 0.14, height * 0.7);
      setPhotoMask({
        top: `${(bitmapTop / height) * 100}%`,
        fade: `${(fadeEnd / height) * 100}%`,
      });
      const line = lineRef.current;
      const lineTop = line
        ? line.getBoundingClientRect().top - section.getBoundingClientRect().top
        : section.clientHeight * 0.62;
      setPerseyTop(lineTop - height);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(section);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={COWORKING.id}
      className={cn(
        "cascade relative scroll-mt-20 overflow-x-clip bg-[#090709] pb-[4.5rem] pt-[12.25rem] lg:py-28 lg:pt-[calc(7rem+1.5rem)]"
      )}
    >
      <div className="cowork-figure-layer pointer-events-none absolute inset-0 lg:-top-[13.75rem]">
      {SHOW_MOBILE_FIGURES ? (
        <div
          aria-hidden
          className="pointer-events-none absolute z-0 lg:hidden"
          style={{
            top: "-8vw",
            left: "-28vw",
            width: "110vw",
            height: "100vw",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(242,27,131,0.4) 0%, rgba(242,27,131,0.18) 16%, rgba(196,20,98,0.07) 28%, transparent 76%)",
            filter: "blur(4.25rem)",
          }}
        />
      ) : null}
      <MotionImage
        ref={gorgonRef}
        src={ASSETS.gargonavrost}
        alt=""
        width={2048}
        height={3072}
        quality={95}
        sizes="(min-width: 1024px) 62.375rem, 124vw"
        className={cn(
          "cowork-statue cowork-statue--gorgon cowork-figure cowork-figure--gorgon pointer-events-none absolute left-[-40vw] top-[-1.25rem] z-[1] h-[158vw] w-[124vw] max-w-none select-none object-cover object-top opacity-100 lg:left-auto lg:top-[-2%] lg:z-0 lg:h-[96%] lg:-right-[12%] lg:w-[min(52vw,62.375rem)] lg:object-contain lg:object-right-bottom lg:mix-blend-screen lg:opacity-90",
          !SHOW_MOBILE_FIGURES && "max-lg:hidden"
        )}
        initial={false}
        animate={undefined}
        style={{
          ...(statueSize
            ? {
                width: statueSize.w,
                height: statueSize.h,
                top: (perseyTop ?? 0) + STATUE_LAYER_LIFT * rootScale(),
              }
            : {}),
          ["--statue-top" as string]: photoMask?.top,
          ["--statue-fade" as string]: photoMask?.fade,
          ...(move ? { y: statueY } : {}),
        }}
      />

      <MotionImage
        src={ASSETS.persey}
        alt=""
        width={2048}
        height={3072}
        quality={95}
        sizes="62.375rem"
        className="cowork-statue cowork-statue--persey cowork-figure cowork-figure--persey pointer-events-none absolute z-0 hidden max-w-none select-none object-contain object-right-bottom mix-blend-screen lg:-left-[12%] lg:right-auto lg:top-auto lg:block lg:h-auto lg:w-auto lg:opacity-90"
        style={{
          top: statueSize ? (perseyTop ?? 0) + STATUE_LAYER_LIFT * rootScale() : undefined,
          bottom: statueSize && perseyTop == null ? "-2%" : undefined,
          width: statueSize?.w,
          height: statueSize?.h,
          ["--statue-top" as string]: photoMask?.top,
          ["--statue-fade" as string]: photoMask?.fade,
          x: isLg ? `calc(${PERSEUS_OFFSET_X} * -1)` : 0,
          y: move ? statueY : 0,
        }}
      />
      </div>

      <CoworkingDesktop
        lineRef={lineRef}
        reduced={reduced}
        isLg={isLg}
        move={move}
        archY={archY}
        bustY={bustY}
        copyY={copyY}
      />
    </section>
  );
}

function useOnceInView(ref: React.RefObject<HTMLElement | null>, reduced: boolean) {
  const inView = useInView(ref, { once: true, amount: 0.28, margin: "0px 0px -10% 0px" });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (reduced || inView) return;
    const timer = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visible > 72) setForced(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [reduced, inView, ref]);

  return reduced || inView || forced;
}

function CoworkingDesktop({
  lineRef,
  reduced,
  isLg,
  move,
  archY,
  bustY,
  copyY,
}: {
  lineRef: React.RefObject<HTMLDivElement | null>;
  reduced: boolean;
  isLg: boolean;
  move: boolean;
  archY: readonly [MotionValue<number>, MotionValue<number>, MotionValue<number>];
  bustY: MotionValue<number>;
  copyY: MotionValue<number>;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const stripWrapRef = useRef<HTMLDivElement>(null);
  const archRowRef = useRef<HTMLDivElement>(null);
  const tariffsRef = useRef<HTMLDivElement>(null);
  const [activeArch, setActiveArch] = useState(0);
  const [archStep, setArchStep] = useState(0);
  const headerShown = useOnceInView(headerRef, reduced);
  const archesShown = useOnceInView(stripWrapRef, reduced);
  const tariffsShown = useOnceInView(tariffsRef, reduced);
  const stripInView = useInView(stripWrapRef, { amount: 0.35 });
  const { scrollYProgress: archProgress } = useScroll({
    target: archRowRef,
    offset: ["start 80%", "end 40%"],
  });
  const { scrollYProgress: mobileGlint } = useScroll({
    target: stripWrapRef,
    offset: ["start 85%", "end 25%"],
  });

  useLayoutEffect(() => {
    const root = stripWrapRef.current;
    if (!root) return;
    const sync = () => {
      const style = getComputedStyle(root);
      const pad = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      setArchStep(Math.max(0, root.clientWidth - pad));
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const titleDelay = (desktop: number, mobile: number) => (isLg ? desktop : mobile);

  return (
    <div className="cowork-copy relative z-10 mx-auto w-full max-w-[58rem] px-5 lg:px-8">
      <header ref={headerRef} className="relative">
        <motion.p
          className="mb-6 flex items-center justify-end gap-3 text-[0.625rem] uppercase tracking-[0.32em] text-accent-yellow sm:text-[0.6875rem] lg:mb-[calc(1rem+1.75rem)] lg:justify-start"
          initial={reduced ? false : { opacity: 0, y: "1rem" }}
          animate={headerShown || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "1rem" }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
        >
          <span className="h-px w-8 bg-accent-yellow/40" />
          {COWORKING.label}
          <span className="h-px w-8 bg-accent-yellow/40" />
        </motion.p>
        <h2 className="cowork-title ml-auto w-full text-right font-serif text-[clamp(1.875rem,8.6vw,2.375rem)] font-semibold leading-[1.1] tracking-tight text-white [text-shadow:0_2px_1.125rem_rgba(0,0,0,0.7)] lg:ml-0 lg:w-auto lg:text-left lg:text-[2.6rem] lg:leading-[1.18] lg:[text-shadow:none]">
          <MaskLine shown={headerShown} reduced={reduced} delay={titleDelay(0, 0.1)}>{COWORKING.titleLine1}</MaskLine>
          <MaskLine shown={headerShown} reduced={reduced} delay={titleDelay(0.1, 0.2)} className="whitespace-nowrap">
            <span className="text-gradient-euphoria">в которой хочется</span>
          </MaskLine>
          <MaskLine shown={headerShown} reduced={reduced} delay={titleDelay(0.2, 0.3)}>{COWORKING.titleLine3}</MaskLine>
        </h2>
      </header>

      <div ref={stripWrapRef} className="relative mt-10 overflow-hidden lg:mt-16 lg:overflow-visible">
        <motion.div
          ref={archRowRef}
          className="cowork-arch-strip flex w-full min-w-0 py-8 [touch-action:pan-y] lg:grid lg:w-auto lg:grid-cols-3 lg:items-end lg:gap-7 lg:overflow-visible lg:py-0"
          animate={isLg ? { x: 0 } : { x: -activeArch * archStep }}
          transition={{ duration: reduced || isLg ? 0 : 0.45, ease }}
        >
          {COWORKING.photos.map((photo, index) => (
            <ArchPhoto
              key={photo.key}
              index={index}
              src={PHOTO_SRC[photo.key]}
              alt={photo.alt}
              heightClass={archHeights[index]}
              liftClass={archShift[index]}
              y={archY[index]}
              move={move}
              isLg={isLg}
              active={!isLg && activeArch === index}
              stripInView={stripInView}
              reduced={reduced}
              shown={isLg ? archesShown : archesShown && activeArch === index}
              delay={isLg ? index * 0.12 : 0}
              glintProgress={isLg ? archProgress : mobileGlint}
            />
          ))}
        </motion.div>
        <motion.div
          className="mt-2 lg:hidden"
          initial={reduced ? false : { opacity: 0, y: "0.75rem" }}
          animate={archesShown || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.75rem" }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.28, ease }}
        >
          <CarouselArrows
            onPrev={() =>
              setActiveArch((index) => (index - 1 + COWORKING.photos.length) % COWORKING.photos.length)
            }
            onNext={() => setActiveArch((index) => (index + 1) % COWORKING.photos.length)}
            prevLabel="Предыдущая арка"
            nextLabel="Следующая арка"
          >
            <SlideCounter index={activeArch} total={COWORKING.photos.length} />
          </CarouselArrows>
        </motion.div>
      </div>

      <motion.div
        ref={tariffsRef}
        initial={reduced ? false : { opacity: 0, y: "1.125rem" }}
        animate={tariffsShown || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "1.125rem" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
      >
        <TierBoard reduced={reduced} isLg={isLg} />
      </motion.div>

      <div
        ref={lineRef}
        aria-hidden
        className="mt-12 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(245,181,27,0.55)_42%,rgba(242,27,131,0.45)_62%,transparent)] lg:mt-[5.5rem]"
      />

      <div className="relative mt-7 flex flex-col items-center text-center lg:mt-14 lg:grid lg:grid-cols-12 lg:items-center lg:text-left">
        <motion.div
          className="relative mx-auto lg:col-span-5 lg:mx-0 lg:-ml-8"
          style={move ? { y: bustY } : undefined}
          initial={reduced ? false : { opacity: 0, scale: isLg ? 1 : 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
        >
          <div className="relative p-10 lg:w-[clamp(15rem,24vw,20rem)]">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[min(100vw,140%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,27,131,0.34)_0%,rgba(242,27,131,0.1)_40%,transparent_70%)] lg:h-[150%] lg:w-[150%]"
            />
            <div className="cowork-spin-ring" aria-hidden />
            <div className="relative aspect-square w-[clamp(11.875rem,56vw,14.375rem)] overflow-hidden rounded-full lg:w-full">
              <Image
                src={ASSETS.golovapodpiska}
                alt=""
                width={640}
                height={640}
                sizes="(min-width: 1024px) 20rem, 56vw"
                className="h-full w-full object-cover object-[50%_38%]"
              />
            </div>
          </div>
        </motion.div>

        <motion.article
          className="relative mt-7 w-full text-center lg:col-span-7 lg:col-start-6 lg:mt-0 lg:text-left"
          style={move ? { y: copyY } : undefined}
        >
          <motion.p
            className="text-[0.625rem] uppercase tracking-[0.32em] text-accent-yellow sm:text-[0.6875rem]"
            initial={reduced ? false : { opacity: 0, y: isLg ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduced ? 0 : 0.65, ease }}
          >
            ◆ {COWORKING.subscription.title}
          </motion.p>
          <motion.h3
            className="mt-4 font-serif text-[clamp(1.75rem,8vw,2.125rem)] font-semibold leading-[1.12] tracking-tight text-white lg:text-4xl xl:text-5xl"
            initial={reduced ? false : { opacity: 0, y: isLg ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.08, ease }}
          >
            <span className="lg:hidden">
              Больше, чем
              <br />
              просто рабочее место
            </span>
            <span className="hidden lg:inline">
              Больше, чем
              <br />
              просто рабочее место
            </span>
          </motion.h3>
          <motion.p
            className="mx-auto mt-3.5 max-w-[32ch] text-sm leading-relaxed text-white/70 sm:text-[0.9375rem] lg:mx-0 lg:mt-5 lg:max-w-xl"
            initial={reduced ? false : { opacity: 0, y: isLg ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.16, ease }}
          >
            {COWORKING.subscription.text}
          </motion.p>
          <motion.a
            href={CONTACT.instagramCoworkingHighlight}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-draw group mx-auto mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-yellow lg:mx-0 lg:mt-6 [@media(hover:hover)]:hover:text-accent-gold"
            initial={reduced ? false : { opacity: 0, y: isLg ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5, margin: "0px 0px -8% 0px" }}
            transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.24, ease }}
          >
            {COWORKING.subscription.more}
            <span className="transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.article>
      </div>

      <motion.div
        className="mt-9 flex justify-center lg:mt-14"
        initial={reduced ? false : { opacity: 0, y: "0.75rem" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6, margin: "0px 0px -8% 0px" }}
        transition={{ duration: reduced ? 0 : 0.6, ease }}
      >
        <CtaButton href={CONTACT.instagram} className="w-full max-w-[21.25rem] lg:w-auto lg:max-w-none">
          <span className="text-sm font-semibold uppercase tracking-[0.08em]">{COWORKING.cta}</span>
        </CtaButton>
      </motion.div>
    </div>
  );
}

function MaskLine({
  children,
  delay = 0,
  shown,
  reduced,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  shown: boolean;
  reduced: boolean;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        initial={reduced ? false : { y: "100%" }}
        animate={shown || reduced ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function ArchPhoto({
  index,
  src,
  alt,
  heightClass,
  liftClass,
  y,
  move,
  isLg,
  active,
  stripInView,
  reduced,
  shown,
  delay,
  glintProgress,
}: {
  index: number;
  src: string;
  alt: string;
  heightClass: string;
  liftClass: string;
  y: MotionValue<number>;
  move: boolean;
  isLg: boolean;
  active: boolean;
  stripInView: boolean;
  reduced: boolean;
  shown: boolean;
  delay: number;
  glintProgress: MotionValue<number>;
}) {
  const float = !isLg && active && stripInView && !reduced;

  return (
    <motion.figure
      data-arch={index}
      className="relative flex w-full min-w-full shrink-0 basis-full justify-center overflow-visible px-6 lg:block lg:w-auto lg:min-w-0 lg:max-w-none lg:shrink lg:basis-auto lg:px-0"
      style={isLg && move ? { y } : undefined}
    >
      <div className={cn("relative aspect-[1/1.3] w-[94%] max-w-[22rem] lg:aspect-auto lg:w-full lg:max-w-none", heightClass, liftClass)}>
      <motion.div
        className="group relative h-full overflow-visible"
        whileHover={isLg && !reduced ? { y: "-0.375rem" } : undefined}
        animate={isLg ? undefined : float ? { y: [0, "-0.3125rem"] } : { y: 0 }}
        transition={
          float
            ? { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            : { type: "spring", stiffness: 260, damping: 24 }
        }
      >
      {!isLg ? (
        <motion.div aria-hidden className="studio-main-glow studio-main-glow--mobile !z-0" style={{ opacity: active ? 1 : 0 }} />
      ) : null}
      <ArchStroke reduced={reduced} shown={shown} delay={delay} />
      <div className="relative z-10 h-full w-full overflow-hidden rounded-t-[62.4375rem]">
        <motion.div
          className="h-full w-full"
          initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }}
          animate={shown || reduced ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: reduced ? 0 : 0.9, ease: "easeOut", delay: reduced ? 0 : delay }}
        >
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          initial={reduced ? false : { scale: 1.15 }}
          animate={shown || reduced ? { scale: 1 } : { scale: 1.15 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: "easeOut", delay: reduced ? 0 : delay }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#F21B83,rgba(242,27,131,0.35))] opacity-[0.12] mix-blend-soft-light"
        />
        </motion.div>
      </div>
      {reduced ? null : <ArchGlint progress={glintProgress} />}
      </motion.div>
      </div>
    </motion.figure>
  );
}

function useElementSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setSize({ w: rect.width, h: rect.height });
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

const GLINT_COPIES = [
  { len: 0.22, opacity: 0.18, width: 1, stroke: "#F5B51B" },
  { len: 0.14, opacity: 0.35, width: 1.2, stroke: "#F5B51B" },
  { len: 0.08, opacity: 0.6, width: 1.5, stroke: "#F5B51B" },
  { len: 0.04, opacity: 0.95, width: 1.8, stroke: "#FFF4D6" },
] as const;

function ArchGlint({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { w, h } = useElementSize(ref);
  const pos = useTransform(progress, [0, 1], [-0.11, 1.11]);
  const dash0 = useTransform(pos, (value) => -(value - GLINT_COPIES[0].len / 2));
  const dash1 = useTransform(pos, (value) => -(value - GLINT_COPIES[1].len / 2));
  const dash2 = useTransform(pos, (value) => -(value - GLINT_COPIES[2].len / 2));
  const dash3 = useTransform(pos, (value) => -(value - GLINT_COPIES[3].len / 2));
  const dashes = [dash0, dash1, dash2, dash3];

  const pad = 12;
  const radius = w / 2;
  const d =
    w > 0 && h > 0
      ? `M ${pad} ${pad + h} L ${pad} ${pad + radius} A ${radius} ${radius} 0 0 1 ${pad + w} ${pad + radius} L ${pad + w} ${pad + h}`
      : "";

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      {d ? (
        <svg
          aria-hidden
          className="absolute -inset-3 overflow-visible"
          width={w + pad * 2}
          height={h + pad * 2}
          style={{ filter: "drop-shadow(0 0 0.3125rem rgba(245,181,27,0.3))" }}
        >
          {GLINT_COPIES.map((copy, index) => (
            <motion.path
              key={copy.len}
              d={d}
              fill="none"
              stroke={copy.stroke}
              strokeWidth={copy.width}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={`${copy.len} 1`}
              vectorEffect="non-scaling-stroke"
              style={{ strokeDashoffset: dashes[index], opacity: copy.opacity }}
            />
          ))}
        </svg>
      ) : null}
    </div>
  );
}

function ArchStroke({ reduced, shown, delay }: { reduced: boolean; shown: boolean; delay: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 220, h: 420 });

  useLayoutEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const sync = () => {
      const rect = parent.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setSize({ w: rect.width, h: rect.height });
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  const pad = 10;
  const rx = size.w / 2;
  const x0 = pad;
  const y0 = pad;
  const x1 = pad + size.w;
  const y1 = pad + size.h;
  const d = `M ${x0} ${y1} L ${x0} ${y0 + rx} A ${rx} ${rx} 0 0 1 ${x1} ${y0 + rx} L ${x1} ${y1} Z`;

  return (
    <svg
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -inset-[0.625rem] z-20 overflow-visible"
      width={size.w + pad * 2}
      height={size.h + pad * 2}
    >
      <motion.path
        d={d}
        fill="none"
        stroke="#F5B51B"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        className="stroke-[rgba(245,181,27,0.5)] transition-[stroke] duration-300 [@media(hover:hover)]:group-hover:stroke-[rgba(245,181,27,0.95)]"
        initial={reduced ? false : { pathLength: 0 }}
        animate={shown || reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: reduced ? 0 : 1.2, ease, delay: reduced ? 0 : delay }}
      />
    </svg>
  );
}

function TierBoard({ reduced, isLg }: { reduced: boolean; isLg: boolean }) {
  const [activeId, setActiveId] = useState<TierId>("standard");
  const panelId = useId();
  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const index = tiers.findIndex((tier) => tier.id === activeId);
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }
    event.preventDefault();
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (index + 1) % tiers.length
        : (index - 1 + tiers.length) % tiers.length;
    setActiveId(tiers[next].id);
  };

  const roRef = useRef<ResizeObserver | null>(null);
  const [panelHeight, setPanelHeight] = useState<number | "auto">("auto");
  const [canAnimateHeight, setCanAnimateHeight] = useState(false);
  const activeTier = tiers.find((tier) => tier.id === activeId) ?? tiers[1];

  const setMeasure = useCallback((node: HTMLDivElement | null) => {
    roRef.current?.disconnect();
    if (!node) return;
    const apply = () => setPanelHeight(node.offsetHeight);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    roRef.current = observer;
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setCanAnimateHeight(true));
    return () => {
      cancelAnimationFrame(frame);
      roRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="cowork-tariffs relative mt-12 flex flex-col gap-8 [overflow-anchor:none] lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 hidden bg-[radial-gradient(closest-side,rgba(242,27,131,0.16),transparent)] lg:block lg:-inset-[7.5rem]"
      />
      <div
        role="tablist"
        aria-label="Тарифы коворкинга"
        onKeyDown={onKeyDown}
        className="relative flex justify-between border-b border-white/15 lg:col-span-4 lg:flex-col lg:justify-start lg:gap-5 lg:border-0 lg:pl-5"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[3.75rem] -z-10 hidden bg-[radial-gradient(ellipse_at_center,rgba(8,6,10,0.7)_0%,transparent_70%)] lg:block"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 top-0 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(245,181,27,0.35),transparent)] lg:block"
        />
        {tiers.map((tier) => {
          const selected = tier.id === activeId;
          return (
            <button
              key={tier.id}
              type="button"
              role="tab"
              id={`cowork-tab-${tier.id}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tier.id)}
              className={cn(
                "relative min-h-11 whitespace-nowrap text-left font-serif text-[clamp(1.125rem,5.6vw,1.5rem)] leading-none lg:text-5xl",
                !selected && "text-white opacity-[0.55] lg:opacity-[0.62] lg:[text-shadow:0_2px_1.25rem_rgba(0,0,0,0.75)] [@media(hover:hover)]:lg:hover:opacity-70"
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="cowork-tier-rail"
                  className="absolute -bottom-px left-0 h-0.5 w-full bg-[linear-gradient(90deg,#F5B51B,#FF7A45,#F21B83)] lg:-left-5 lg:bottom-auto lg:top-0 lg:h-full lg:w-px lg:bg-[linear-gradient(180deg,#F5B51B,#FF7A45,#F21B83)]"
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
              <motion.span
                className="inline-flex min-h-11 items-center gap-3"
                animate={{ x: selected && isLg && !reduced ? 14 : 0 }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 24 }}
              >
                <span
                  aria-hidden
                  className={cn(
                    "hidden h-2 w-2 shrink-0 rotate-45 lg:block",
                    selected
                      ? "bg-gradient-euphoria"
                      : "border border-accent-gold/80 bg-transparent"
                  )}
                />
                <span className={selected ? "text-gradient-euphoria" : undefined}>{tier.name}</span>
              </motion.span>
            </button>
          );
        })}
      </div>

      <div className="relative min-w-0 lg:col-span-8">
        {SHOW_TIER_TITLE_GLOW ? (
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 -z-10 h-[13.75rem] w-[13.75rem] -translate-x-[18%] -translate-y-[42%] lg:hidden"
            style={{
              background: "radial-gradient(circle, hsl(var(--accent) / 0.18) 0%, transparent 70%)",
            }}
          />
        ) : null}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 hidden bg-[radial-gradient(ellipse_at_center,rgba(8,6,10,0.5)_0%,transparent_70%)] lg:block lg:-inset-[3.75rem]"
        />
        <motion.div
          className="overflow-hidden [overflow-anchor:none]"
          initial={false}
          animate={{ height: panelHeight }}
          transition={{ duration: !canAnimateHeight || reduced ? 0 : 0.42, ease }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTier.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={`cowork-tab-${activeTier.id}`}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.18, ease } }}
              transition={{ duration: reduced ? 0 : 0.32, ease }}
            >
              <div ref={setMeasure}>
                <TierCopy tier={activeTier} reduced={reduced} isLg={isLg} reveal />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

const includeVariants = {
  hidden: { opacity: 0, y: "0.625rem", filter: "blur(0.25rem)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay, ease },
  }),
};

const mobileIncludeVariants = {
  hidden: { opacity: 0, y: "0.625rem", filter: "none" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "none",
    transition: { duration: 0.5, delay, ease },
  }),
};

function TierCopy({
  tier,
  reduced,
  isLg,
  reveal = false,
}: {
  tier: (typeof tiers)[number];
  reduced: boolean;
  isLg: boolean;
  reveal?: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: true, amount: "some" });
  const play = reveal && (reduced || inView);
  const split = Math.ceil(tier.items.length / 2);
  const lastDelay = tier.items.reduce((max, _item, index) => {
    const colIndex = index < split ? 0 : 1;
    const rowIndex = index < split ? index : index - split;
    const delay = isLg ? 0.15 + (rowIndex * 2 + colIndex) * 0.06 : index * 0.06;
    return Math.max(max, delay);
  }, 0.15);

  return (
    <div ref={listRef}>
      <div className="flex items-center gap-3">
        <p className="shrink-0 font-serif text-3xl text-[#F1ECE5]">{tier.name}</p>
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gradient-euphoria" />
        <motion.span
          aria-hidden
          className="h-px min-w-[2rem] flex-1 origin-left bg-[linear-gradient(90deg,#F5B51B,#FF7A45,#F21B83,transparent)]"
          initial={reveal && !reduced ? { scaleX: 0 } : false}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#F1ECE5]/70">{tier.subtitle}</p>
      <p className="mt-8 text-[0.625rem] uppercase tracking-[0.32em] text-accent-yellow">Что входит</p>
      <ul className="mt-4 flex flex-col items-start gap-3 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-3.5">
        {tier.items.map((item, index) => {
          const colIndex = index < split ? 0 : 1;
          const rowIndex = index < split ? index : index - split;
          const delay = isLg ? 0.15 + (rowIndex * 2 + colIndex) * 0.06 : index * 0.06;
          return (
            <motion.li
              key={item}
              custom={delay}
              variants={reduced ? undefined : isLg ? includeVariants : mobileIncludeVariants}
              initial={reduced ? false : "hidden"}
              animate={reduced ? undefined : play ? "show" : "hidden"}
              className="flex items-start gap-2.5 text-sm leading-snug text-[#F1ECE5]/70 lg:col-start-[var(--c)] lg:row-start-[var(--r)]"
              style={{ ["--c" as string]: colIndex + 1, ["--r" as string]: rowIndex + 1 }}
            >
              <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0 overflow-visible text-accent" aria-hidden>
                <motion.path
                  d="M3.2 8.4 L6.4 11.5 L12.8 4.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: reduced || play ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : isLg ? 0.4 : 0.35, delay: reduced || !play ? 0 : delay + 0.12, ease }}
                />
              </svg>
              <span>{item}</span>
            </motion.li>
          );
        })}
      </ul>
      {tier.extra ? (
        <motion.p
          className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent-yellow"
          initial={reduced ? false : { opacity: 0, y: "0.5rem" }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : lastDelay + 0.18, ease }}
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
          {tier.extra}
        </motion.p>
      ) : null}
    </div>
  );
}

