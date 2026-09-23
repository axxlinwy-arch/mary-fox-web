"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { COWORKING } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { CtaButton } from "@/components/euphoria/cta-button";
import { cn } from "@/lib/utils";

const PHOTO_SRC = {
  studia3: ASSETS.studia3,
  studia6: ASSETS.studia6,
  studia7: ASSETS.studia7,
} as const;

type TariffId = (typeof COWORKING.tariffs)[number]["id"];

function ComfortExtras() {
  return (
    <div className="mt-6 border-t border-accent-gold/20 pt-5">
      <p className="text-[10px] uppercase tracking-[0.28em] text-accent-yellow">
        Дополнительно в «Комфорт»
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {COWORKING.comfortExtras.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm leading-snug text-[#F1ECE5]/68"
          >
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-gold" strokeWidth={2} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CoworkingSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<TariffId>("standard");
  const active = COWORKING.tariffs.find((t) => t.id === activeId) ?? COWORKING.tariffs[1];
  const showExtras = active.id === "comfort";
  const sectionRef = useRef<HTMLElement>(null);
  const gorgonRef = useRef<HTMLImageElement>(null);
  const [statueSize, setStatueSize] = useState<{ w: number; h: number } | null>(null);
  const [perseyTop, setPerseyTop] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const gorgon = gorgonRef.current;
    if (!section || !gorgon) return;

    const sync = () => {
      gorgon.style.height = "";
      gorgon.style.width = "";
      if (!window.matchMedia("(min-width: 768px)").matches) {
        setStatueSize(null);
        setPerseyTop(null);
        return;
      }
      const width = gorgon.offsetWidth;
      const height = gorgon.offsetHeight;
      if (width <= 0 || height <= 0) return;
      setStatueSize({ w: width, h: height });
      setPerseyTop(section.clientHeight * 0.98 - height);
    };

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={COWORKING.id}
      className="relative scroll-mt-20 overflow-hidden bg-[#090709] py-20 md:py-28"
    >
      <div className="relative max-md:overflow-visible md:overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={gorgonRef}
        src={ASSETS.gargonavrost}
        alt=""
        className="pointer-events-none absolute -right-[2%] top-[-4rem] z-0 h-[58vw] w-auto max-w-none select-none object-contain object-right mix-blend-screen opacity-90 [mask-image:linear-gradient(to_left,black_22%,black_48%,transparent_86%),linear-gradient(to_bottom,transparent_0%,black_10%,black_72%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_left,black_22%,black_48%,transparent_86%),linear-gradient(to_bottom,transparent_0%,black_10%,black_72%,transparent_100%)] [-webkit-mask-composite:source-in] md:-right-[12%] md:top-[-2%] md:h-[96%] md:w-[min(52vw,998px)] md:[mask-image:linear-gradient(to_left,black_22%,black_48%,transparent_86%),linear-gradient(to_bottom,transparent_0%,black_10%,black_88%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_left,black_22%,black_48%,transparent_86%),linear-gradient(to_bottom,transparent_0%,black_10%,black_88%,transparent_100%)]"
        style={
          statueSize
            ? { width: statueSize.w, height: statueSize.h }
            : undefined
        }
      />
      <div className="pointer-events-none absolute inset-y-[10%] left-[24%] right-[24%] z-[1] bg-gradient-to-r from-transparent via-[#090709]/28 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[58rem] px-6 md:px-8">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]">
            <span className="h-px w-8 bg-accent-yellow/40" />
            {COWORKING.label}
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
          <h2 className="font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
            {COWORKING.titleLine1}
            <br />
            <span className="text-gradient-euphoria">{COWORKING.titleLine2}</span>
            <br />
            {COWORKING.titleLine3}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#F1ECE5]/48 sm:text-[15px]">
            {COWORKING.text}
          </p>
        </motion.header>

        <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 md:mt-12 md:gap-4">
          {COWORKING.photos.map((photo, index) => (
            <motion.figure
              key={photo.key}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative overflow-hidden rounded-xl neon-border",
                index === 1 ? "aspect-[3/4] sm:aspect-[4/5]" : "aspect-[3/4] translate-y-3 sm:translate-y-4"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTO_SRC[photo.key]}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="media-zoom absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <div
            role="tablist"
            aria-label="Тарифы коворкинга"
            className="mx-auto grid max-w-lg grid-cols-3 gap-1 rounded-full border border-[rgba(180,35,100,0.38)] bg-[#110C11] p-1 shadow-volume"
          >
            {COWORKING.tariffs.map((tariff) => {
              const selected = tariff.id === activeId;
              return (
                <button
                  key={tariff.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(tariff.id)}
                  className={cn(
                    "rounded-full px-2 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors sm:text-xs sm:tracking-[0.18em]",
                    selected
                      ? "bg-accent text-white"
                      : "text-secondary-foreground hover:text-foreground"
                  )}
                >
                  {tariff.name}
                </button>
              );
            })}
          </div>

          <div className="review-glow-card mt-6 overflow-hidden rounded-2xl p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <p className="shrink-0 font-serif text-3xl text-[#F1ECE5] sm:text-4xl">
                {active.name}
              </p>
              <span className="h-[6px] w-[6px] shrink-0 rotate-45 bg-gradient-to-br from-accent-yellow to-[#F21B83]" />
              <span className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-accent-yellow via-[#FF7A45] to-transparent" />
              {active.note ? (
                <p className="hidden max-w-[11rem] text-right text-[10px] uppercase leading-snug tracking-[0.14em] text-accent-yellow sm:block">
                  {active.note}
                </p>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-[#F1ECE5]/48">{active.tagline}</p>
            {active.note ? (
              <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-accent-yellow sm:hidden">
                {active.note}
              </p>
            ) : null}

            <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-accent-yellow">
              Что входит
            </p>

            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {COWORKING.baseIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-snug text-[#F1ECE5]/68"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                    strokeWidth={2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {showExtras ? <ComfortExtras /> : null}

            <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-champagne">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
              {COWORKING.sharedNote}
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.persey}
        alt=""
        className="pointer-events-none absolute -left-[2%] top-4 z-0 h-[58vw] w-auto max-w-none select-none object-contain object-left mix-blend-screen opacity-90 md:-left-[12%] md:top-auto md:h-auto"
        style={{
          top: statueSize ? (perseyTop ?? undefined) : undefined,
          bottom: statueSize && perseyTop == null ? "-2%" : undefined,
          width: statueSize?.w,
          height: statueSize?.h,
          maskImage:
            "linear-gradient(to right, black 16%, black 40%, rgba(0,0,0,0.35) 70%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 62%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 16%, black 40%, rgba(0,0,0,0.35) 70%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 62%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 mx-auto mt-8 w-full max-w-[58rem] px-6 md:mt-10 md:px-8"
      >
        <div className="review-glow-card relative overflow-hidden rounded-2xl">
          <div className="pointer-events-none absolute right-4 top-6 z-20 hidden h-[calc(100%-3rem)] w-3 flex-col items-center gap-2 md:flex">
            <span className="h-[6px] w-[6px] shrink-0 rotate-45 bg-gradient-to-br from-accent-yellow to-[#F21B83]" />
            <span className="w-px min-h-[2rem] flex-1 bg-gradient-to-b from-accent-yellow via-[#FF7A45] to-transparent" />
          </div>
          <div className="relative grid items-stretch md:grid-cols-[minmax(13rem,18rem)_minmax(0,1fr)]">
            <div className="relative h-52 w-full md:h-auto md:min-h-[17rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.golovapodpiska}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[50%_38%] mix-blend-screen md:[mask-image:linear-gradient(to_right,black_58%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_right,black_58%,transparent_100%)]"
              />
            </div>
            <article className="relative z-10 flex h-full flex-col justify-evenly gap-4 px-6 py-7 text-center md:px-10 md:py-8 md:pr-14 md:text-left">
              <p className="text-[10px] uppercase tracking-[0.32em] text-accent-yellow">
                {COWORKING.subscription.title}
              </p>
              <h3 className="font-serif text-[1.55rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-[1.9rem]">
                Больше, чем
                <br />
                просто рабочее место
              </h3>
              <p className="text-sm leading-relaxed text-[#F1ECE5]/50">
                {COWORKING.subscription.text}
              </p>
              <a
                href={CONTACT.instagramCoworkingHighlight}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-draw inline-block self-center text-xs font-semibold uppercase tracking-[0.16em] text-accent-yellow hover:text-accent-gold md:self-start"
              >
                {COWORKING.subscription.more} →
              </a>
            </article>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 mt-10 flex justify-center px-6">
        <CtaButton href={CONTACT.instagram}>
          <span className="text-sm font-semibold uppercase tracking-[0.08em]">
            {COWORKING.cta}
          </span>
        </CtaButton>
      </div>
    </section>
  );
}
