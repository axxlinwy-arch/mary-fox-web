"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STUDIO } from "@/constants/content";
import { ASSETS } from "@/constants/site";
import { cn } from "@/lib/utils";

const STUDIO_IMAGES = {
  studio: ASSETS.studio,
  studia1: ASSETS.studia1,
  studia2: ASSETS.studia2,
  studia3: ASSETS.studia3,
  studia4: ASSETS.studia4,
  studia5: ASSETS.studia5,
  studia7: ASSETS.studia7,
  studia8: ASSETS.studia8,
} as const;

type StudioPhotoKey = keyof typeof STUDIO_IMAGES;

const COLLAGE_SLOTS: ReadonlyArray<{
  className: string;
  rotate: string;
  delay: string;
}> = [
  { className: "left-0 top-[6%] h-44 w-36", rotate: "-8deg", delay: "0s" },
  { className: "right-0 top-[2%] h-40 w-32", rotate: "7deg", delay: "0.6s" },
  { className: "left-0 top-[42%] h-32 w-40", rotate: "5deg", delay: "1.2s" },
  { className: "right-0 top-[40%] h-44 w-36", rotate: "-6deg", delay: "1.8s" },
  { className: "bottom-0 left-[7%] h-40 w-32", rotate: "6deg", delay: "0.4s" },
  { className: "bottom-[3%] right-[8%] h-36 w-40", rotate: "-5deg", delay: "1.4s" },
  { className: "left-[18%] top-0 h-36 w-28", rotate: "4deg", delay: "2s" },
];

/** Слот i всегда принадлежит photos[i + 1]. Если оно в центре — на его место встаёт photos[0]. */
function getSlotPhotoIndex(slotIdx: number, activeIndex: number) {
  const homeIndex = slotIdx + 1;
  if (activeIndex === homeIndex) return 0;
  return homeIndex;
}

const arrowClass =
  "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(180,35,100,0.38)] text-champagne/80 transition-colors hover:border-[rgba(180,35,100,0.55)] hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70";

export function StudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photos = STUDIO.photos;
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitAnimating, setOrbitAnimating] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const selectPhoto = useCallback((index: number) => {
    setActiveIndex((current) => (index === current ? current : index));
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (
        !sectionRef.current?.contains(document.activeElement) &&
        !sectionRef.current?.matches(":hover")
      ) {
        return;
      }
      e.preventDefault();
      if (e.key === "ArrowLeft") goPrev();
      else goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOrbitAnimating(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const activePhoto = photos[activeIndex];
  const collageSlotCount = Math.min(COLLAGE_SLOTS.length, photos.length - 1);

  return (
    <section
      id={STUDIO.id}
      ref={sectionRef}
      className="relative scroll-mt-20 bg-[#090709] py-20 md:py-28"
    >
      <div className="relative mx-auto w-full px-6 md:px-8">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]">
            <span className="h-px w-8 bg-accent-yellow/40" />
            {STUDIO.label}
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
          <h2 className="font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
            {STUDIO.titleLine1}
            <br />
            <span className="text-gradient-euphoria">{STUDIO.titleLine2}</span>
            <br />
            {STUDIO.titleLine3}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#F1ECE5]/48 sm:text-[15px]">
            {STUDIO.text}
          </p>
        </motion.header>

        {/* Mobile: карусель с peek */}
        <div className="relative mt-8 lg:hidden" aria-label="Галерея студии">
          <MobilePeekCarousel
            photos={photos}
            activeIndex={activeIndex}
            onIndexChange={setActiveIndex}
            prefersReducedMotion={Boolean(prefersReducedMotion)}
          />
          <Dots photos={photos} activeIndex={activeIndex} onSelect={selectPhoto} />
        </div>

        {/* Desktop: коллаж */}
        <div className="relative mt-12 hidden lg:block" aria-label="Галерея студии">
          <div className="relative mx-auto min-h-[42rem] w-full max-w-[58rem]">
            {Array.from({ length: collageSlotCount }, (_, slotIdx) => {
              const photoIndex = getSlotPhotoIndex(slotIdx, activeIndex);
              const photo = photos[photoIndex];
              const slot = COLLAGE_SLOTS[slotIdx];
              if (!photo || !slot) return null;

              return (
                <motion.div
                  key={slotIdx}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 16 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 * slotIdx,
                    ease: "easeOut",
                  }}
                  className={cn("absolute z-10", slot.className)}
                >
                  <div
                    className={cn(
                      "h-full w-full studio-orbit-float",
                      !orbitAnimating && "studio-orbit-float-paused"
                    )}
                    style={{ animationDelay: slot.delay }}
                  >
                    <button
                      type="button"
                      aria-label={`Показать фото ${photoIndex + 1}`}
                      onClick={() => selectPhoto(photoIndex)}
                      style={{ rotate: slot.rotate }}
                      className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl neon-border bg-card shadow-volume transition-[transform,box-shadow] duration-300 hover:z-30 hover:scale-105 hover:shadow-glow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/60"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={photo.key}
                        src={STUDIO_IMAGES[photo.key as StudioPhotoKey]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={cn(
                          "absolute inset-0 h-full w-full object-cover",
                          !prefersReducedMotion && "studio-main-enter"
                        )}
                      />
                    </button>
                  </div>
                </motion.div>
              );
            })}

            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pointer-events-auto relative w-[min(46%,22rem)]"
              >
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-accent/20 blur-3xl" />
                <MainFrame
                  photo={activePhoto}
                  prefersReducedMotion={Boolean(prefersReducedMotion)}
                />
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Предыдущее фото"
                  className={cn(arrowClass, "left-3")}
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Следующее фото"
                  className={cn(arrowClass, "right-3")}
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <Dots
                  photos={photos}
                  activeIndex={activeIndex}
                  onSelect={selectPhoto}
                  className="mt-3"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobilePeekCarousel({
  photos,
  activeIndex,
  onIndexChange,
  prefersReducedMotion,
}: {
  photos: typeof STUDIO.photos;
  activeIndex: number;
  onIndexChange: (index: number) => void;
  prefersReducedMotion: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const animatingRef = useRef(false);
  const [vw, setVw] = useState(0);
  const [shift, setShift] = useState(0);
  const [skipAnim, setSkipAnim] = useState(false);

  const total = photos.length;
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const slides = [photos[prevIndex], photos[activeIndex], photos[nextIndex]];

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setVw(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const slideW = vw * 0.78;
  const gap = 12;
  const step = slideW + gap;
  const peek = (vw - slideW) / 2;
  const x = vw === 0 ? 0 : peek - (1 - shift) * step;
  const centerPos = 1 - shift;

  const slideMotion = prefersReducedMotion || skipAnim
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.78, ease: [0.4, 0, 0.2, 1] as const };

  const go = (dir: -1 | 1) => {
    if (animatingRef.current || total < 2) return;
    animatingRef.current = true;
    setShift(dir);
  };

  const handleAnimationComplete = () => {
    if (shift === 0) return;
    const next = (activeIndex - shift + total) % total;
    setSkipAnim(true);
    onIndexChange(next);
    setShift(0);
    requestAnimationFrame(() => {
      setSkipAnim(false);
      animatingRef.current = false;
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;
    const delta = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(delta) < 40) return;
    go(delta > 0 ? 1 : -1);
  };

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div
        ref={viewportRef}
        className="relative overflow-hidden py-6 touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartX.current = null;
        }}
      >
        <motion.div
          className="flex items-center"
          style={{ gap }}
          animate={{ x }}
          transition={slideMotion}
          onAnimationComplete={handleAnimationComplete}
        >
          {slides.map((photo, pos) => {
            const isCenter = pos === centerPos;
            return (
              <motion.button
                key={`${photo.key}-${pos}`}
                type="button"
                aria-label={photo.alt}
                aria-current={isCenter ? "true" : undefined}
                onClick={() => {
                  if (!isCenter) go(pos === 0 ? 1 : -1);
                }}
                animate={{
                  scale: isCenter ? 1 : 0.94,
                  opacity: isCenter ? 1 : 0.42,
                }}
                transition={slideMotion}
                className="relative shrink-0 rounded-2xl neon-border bg-card"
                style={{ width: slideW || "78%" }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={STUDIO_IMAGES[photo.key as StudioPhotoKey]}
                    alt={isCenter ? photo.alt : ""}
                    decoding="async"
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-black"
                    animate={{ opacity: isCenter ? 0 : 0.45 }}
                    transition={slideMotion}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <motion.div
                    className="pointer-events-none absolute bottom-4 left-4 right-4"
                    animate={{ opacity: isCenter ? 1 : 0 }}
                    transition={slideMotion}
                  >
                    <span className="inline-block rounded-full border border-accent-yellow/35 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-yellow backdrop-blur-sm">
                      {STUDIO.label}
                    </span>
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Предыдущее фото"
        className={cn(arrowClass, "left-2")}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Следующее фото"
        className={cn(arrowClass, "right-2")}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}

function MainFrame({
  photo,
  prefersReducedMotion,
}: {
  photo: (typeof STUDIO.photos)[number];
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl neon-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={photo.key}
        src={STUDIO_IMAGES[photo.key as StudioPhotoKey]}
        alt={photo.alt}
        decoding="async"
        draggable={false}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover",
          !prefersReducedMotion && "studio-main-enter"
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4">
        <span className="inline-block rounded-full border border-accent-yellow/35 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-yellow backdrop-blur-sm">
          {STUDIO.label}
        </span>
      </div>
    </div>
  );
}

function Dots({
  photos,
  activeIndex,
  onSelect,
  className,
}: {
  photos: typeof STUDIO.photos;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("mt-5 flex justify-center gap-1.5", className)}>
      {photos.map((photo, index) => (
        <button
          key={photo.key}
          type="button"
          aria-label={`Фото ${index + 1}`}
          aria-current={index === activeIndex ? "true" : undefined}
          onClick={() => onSelect(index)}
          className={cn(
            "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
            index === activeIndex
              ? "w-6 bg-accent"
              : "w-2 bg-[#F1ECE5]/25 hover:bg-[#F1ECE5]/40"
          )}
        />
      ))}
    </div>
  );
}
