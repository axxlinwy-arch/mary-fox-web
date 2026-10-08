"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { MARY_FOX } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { cn } from "@/lib/utils";

const SIDE_SHOTS = [
  {
    src: ASSETS.delaettattomary,
    alt: "Работа Mary Fox — cover up",
    className: "left-[-2%] top-[8%] w-[11.5rem] lg:left-0 lg:w-[11rem] xl:left-[-8%] xl:w-[14.5rem]",
  },
  {
    src: ASSETS.delaettattomary2,
    alt: "Работа Mary Fox",
    className: "bottom-[10%] right-[-2%] w-[11rem] rotate-[7deg] lg:right-0 lg:w-[10.5rem] xl:right-[-8%] xl:w-[14.5rem]",
  },
] as const;

const MOBILE_PHOTOS = [
  { src: ASSETS.mary, alt: "Mary Fox — EUPHORIA" },
  { src: ASSETS.delaettattomary2, alt: "Работа Mary Fox" },
  { src: ASSETS.delaettattomary, alt: "Работа Mary Fox — cover up" },
] as const;

const MF_STATS = [
  {
    target: 5000,
    suffix: "+",
    label: "клиентов",
    aria: "Более 5000 клиентов",
  },
  {
    target: 9,
    suffix: "",
    label: "лет опыта",
    aria: "9 лет опыта",
  },
] as const;

const MF_RING_R = 52;
const MF_RING_C = 2 * Math.PI * MF_RING_R;

function MfStatRings() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const [counts, setCounts] = useState([0, 0]);
  const [progress, setProgress] = useState(0);
  const [plusFlash, setPlusFlash] = useState(false);
  const [idleSpark, setIdleSpark] = useState([false, false]);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) {
      setActive(true);
      setDone(true);
      setProgress(1);
      setCounts(MF_STATS.map((s) => s.target));
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setActive(true);
        io.disconnect();
      },
      { threshold: 0.08, rootMargin: "80px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reducedRef.current) return;
    const duration = 2000;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 1 - (1 - p) ** 3;
      setProgress(ease);
      setCounts(MF_STATS.map((s) => Math.round(s.target * ease)));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setPlusFlash(true);
      setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  useEffect(() => {
    if (!done || reducedRef.current) return;
    let cancelled = false;
    const timers: number[] = [];
    const pulse = (ring: number) => {
      if (cancelled || document.hidden) return;
      setIdleSpark((prev) => {
        const next = [...prev];
        next[ring] = true;
        return next;
      });
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setIdleSpark((prev) => {
            const next = [...prev];
            next[ring] = false;
            return next;
          });
        }, 1200)
      );
    };
    const loop = () => {
      pulse(0);
      timers.push(window.setTimeout(() => pulse(1), 3500));
    };
    const intervalId = window.setInterval(loop, 7000);
    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [done]);

  const sparking = active && !reducedRef.current && progress < 1;
  const sparkFade = progress > 0.9 ? (1 - progress) / 0.1 : 1;
  const dashOffset = MF_RING_C * (1 - progress);

  return (
    <div ref={rootRef} className="mf-stats cascade-item" style={{ animationDelay: "0.76s" }}>
      {MF_STATS.map((stat, i) => (
        <div key={stat.label} className="mf-stat">
          <div className="mf-stat-col">
            <div className="mf-ring" role="img" aria-label={stat.aria}>
              <svg className="mf-ring-svg" viewBox="0 0 120 120" aria-hidden>
                <defs>
                  <linearGradient id={`mf-arc-grad-${i}`} x1="18" y1="10" x2="102" y2="110">
                    <stop offset="0%" stopColor="#f5b51b" />
                    <stop offset="100%" stopColor="#ff7a45" />
                  </linearGradient>
                </defs>
                <circle className="mf-ring-track" cx="60" cy="60" r={MF_RING_R} />
                <circle
                  className="mf-ring-arc"
                  cx="60"
                  cy="60"
                  r={MF_RING_R}
                  stroke={`url(#mf-arc-grad-${i})`}
                  strokeDasharray={MF_RING_C}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 60 60)"
                />
                {i === 0 && plusFlash ? (
                  <circle className="mf-ring-flash" cx="60" cy="60" r={MF_RING_R} />
                ) : null}
                {sparking ? (
                  <g
                    className="mf-spark"
                    opacity={sparkFade}
                    transform={`rotate(${progress * 360} 60 60)`}
                  >
                    <circle className="mf-spark-tail" cx="60" cy="8" r="1.15" transform="rotate(-22 60 60)" opacity="0.12" />
                    <circle className="mf-spark-tail" cx="60" cy="8" r="1.45" transform="rotate(-14 60 60)" opacity="0.22" />
                    <circle className="mf-spark-tail" cx="60" cy="8" r="1.9" transform="rotate(-7 60 60)" opacity="0.4" />
                    <circle className="mf-spark-core" cx="60" cy="8" r="2.55" />
                  </g>
                ) : null}
                {idleSpark[i] ? (
                  <g className="mf-spark mf-spark--idle">
                    <circle className="mf-spark-core" cx="60" cy="8" r="2.2" />
                  </g>
                ) : null}
              </svg>
              <p className="mf-ring-value" aria-hidden>
                {counts[i]}
                {stat.suffix && counts[i] >= stat.target ? stat.suffix : ""}
              </p>
            </div>
            <p className="mf-stat-caption" aria-hidden>
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const photoArrowClass =
  "absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(241,236,229,0.2)] bg-[rgba(9,7,9,0.7)] text-[#f1ece5] transition-[color,border-color,box-shadow] duration-200 hover:border-[#f21b83] hover:text-[#f21b83] hover:shadow-[0_0_16px_rgba(242,27,131,0.35)] focus-visible:border-[#f21b83] focus-visible:text-[#f21b83] focus-visible:shadow-[0_0_16px_rgba(242,27,131,0.35)] focus-visible:outline-none";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M9.78 18.65 10.06 14.4l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.92-.25-.94-.92.2-1.37l15.97-6.16c.77-.33 1.51.18 1.23 1.28l-2.72 12.81c-.19.91-.74 1.13-1.5.7l-4.22-3.12-1.99 1.93c-.23.23-.42.42-.83.42Z" />
    </svg>
  );
}

const HIGHLIGHT_BUST: Record<(typeof MARY_FOX.highlights)[number]["id"], string> = {
  styles: ASSETS.golova1,
  education: ASSETS.golova3,
  coworking: ASSETS.golova4,
};

function BrandWatermark({ className, soft }: { className?: string; soft?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-[1] select-none",
        soft ? "master-fox-ink--soft" : "master-fox-ink",
        className
      )}
    >
      <p className="font-display leading-[0.76] tracking-tight">MARY</p>
      <p className="pl-[0.34em] font-display text-[0.82em] leading-[0.76] tracking-tight">FOX</p>
    </div>
  );
}

function PhotoFrame({
  src,
  alt,
  sizes,
  priority,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("hero-space-card-face gallery-marquee-card relative overflow-hidden rounded-[0.9rem]", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", imageClassName ?? (src === ASSETS.mary && "object-top"))}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

function MobilePhotoCarousel() {
  const [index, setIndex] = useState(0);
  const total = MOBILE_PHOTOS.length;

  return (
    <div className="mf-mobile-collage relative mx-auto w-full max-w-[34rem] pb-4 lg:hidden">
      <div className="relative z-20 mx-auto w-[calc(100%-2.5rem)] md:w-[76%]">
        <div
          aria-hidden
          className="master-fox-ink--soft mf-mobile-ink mf-mobile-ink--top pointer-events-none absolute z-[1] select-none text-center font-display text-[clamp(4.5rem,26vw,6.5rem)] leading-[0.76] tracking-tight md:-right-[2%] md:-top-[7%] md:text-[clamp(6rem,32vw,9rem)]"
        >
          <p>MARY</p>
          <p className="text-[0.8em]">FOX</p>
        </div>
        <div
          aria-hidden
          className="master-fox-ink--soft mf-mobile-ink mf-mobile-ink--bottom pointer-events-none absolute z-[1] select-none text-center font-display text-[clamp(6.15rem,32vw,9.75rem)] leading-[0.76] tracking-tight md:-bottom-[7.5rem] md:-left-[1%] md:text-[clamp(6.8rem,36vw,11rem)]"
        >
          <p>MARY</p>
          <p className="text-[0.8em]">FOX</p>
        </div>
        <div aria-hidden className="mf-photo-corner-glow mf-photo-corner-glow--tr md:hidden" />
        <div aria-hidden className="mf-photo-corner-glow mf-photo-corner-glow--bl md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div aria-hidden className="master-collage-glow" />
        </div>
        <div className="hero-space-card-face gallery-marquee-card relative z-[1] overflow-hidden rounded-[0.9rem]">
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          >
            {MOBILE_PHOTOS.map((photo, i) => (
              <div key={photo.src} className="relative aspect-[4/5] w-full shrink-0 md:aspect-[3/4]" aria-hidden={i !== index}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={cn("object-cover", photo.src === ASSETS.mary && "object-top")}
                  sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1024px) 76vw, 420px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + total) % total)}
          aria-label="Предыдущее фото"
          className={cn(photoArrowClass, "left-0 -translate-x-1/2")}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % total)}
          aria-label="Следующее фото"
          className={cn(photoArrowClass, "right-0 translate-x-1/2")}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export function MasterSection() {
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = highlightsRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cascadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-shown");
          cascadeObserver.disconnect();
        });
      },
      { threshold: 0.08 }
    );
    cascadeObserver.observe(root);

    const nodes = root.querySelectorAll(".master-highlight");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => {
      cascadeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id={MARY_FOX.id}
      ref={highlightsRef}
      className="cascade relative scroll-mt-20 overflow-x-clip bg-[#090709] pb-12 pt-[5.75rem] lg:pb-16 lg:-mt-8 lg:pt-8"
    >
      <div aria-hidden className="master-corner-glow" />
      <BrandWatermark className="left-[-3%] top-[6%] z-[1] hidden text-[28vw] md:left-0 md:text-[11rem] lg:block lg:text-[13rem]" />

      <div className="relative z-10 mx-auto max-w-7xl overflow-x-visible px-6 md:px-8">
        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
          <div className="relative z-20 order-2 mx-auto flex w-full max-w-[28rem] flex-col items-center justify-center text-center md:max-w-[34rem] lg:order-1 lg:mx-0 lg:max-w-[28rem] lg:items-start lg:text-left">
            <div>
              <p className="cascade-item mb-[18px] flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent-yellow lg:mb-3 lg:justify-start lg:gap-3 lg:text-xs lg:tracking-[0.32em]" style={{ animationDelay: "0.22s" }}>
                <span className="h-px w-6 bg-accent-yellow/40 lg:w-8" />
                {MARY_FOX.label}
                <span className="h-px w-6 bg-accent-yellow/40 lg:w-8" />
              </p>
              <h2 className="cascade-item flex flex-col items-center gap-0 font-serif text-[clamp(1.7rem,7.6vw,2.15rem)] font-semibold leading-[1] tracking-tight text-[#F1ECE5] lg:items-start lg:text-[2.55rem] lg:leading-[0.92] xl:text-[2.9rem]" style={{ animationDelay: "0.4s" }}>
                <span>{MARY_FOX.titleLead}</span>
                <span
                  className="w-max max-w-full overflow-visible whitespace-nowrap text-gradient-euphoria-50"
                  style={{ lineHeight: 0.98, padding: "0.02em 0" }}
                >
                  {MARY_FOX.titleGold}
                </span>
                <span>{MARY_FOX.titleEnd}</span>
              </h2>
            </div>

            <p className="mf-lead cascade-item mx-auto mt-6 max-w-[19rem] text-[13.5px] font-normal leading-[1.5] text-white/75 lg:mx-0 lg:mt-6 lg:max-w-[26rem] lg:text-[15px] lg:leading-[1.55] lg:text-white/70" style={{ animationDelay: "0.58s" }}>
              {MARY_FOX.roles
                .map((role, i) => (i === 0 ? role : role.charAt(0).toLowerCase() + role.slice(1)))
                .join(", ")}
              .
            </p>

            <MfStatRings />

            <div className="mf-tags cascade-item" style={{ animationDelay: "0.94s" }}>
              {MARY_FOX.tags.map((tag) => (
                <span key={tag} className="mf-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mf-socials cascade-item" style={{ animationDelay: "1.12s" }}>
              <a
                href={CONTACT.maryInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mf-social mf-social--ig"
              >
                <Instagram className="mf-social-icon" strokeWidth={1.5} />
                {CONTACT.maryInstagramHandle}
              </a>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mf-social mf-social--tg"
              >
                <TelegramIcon className="mf-social-icon" />
                @maryfoxtattooo
              </a>
            </div>
          </div>

          <div className="cascade-item relative z-10 order-1 lg:order-2" style={{ animationDelay: "0s" }}>
            <MobilePhotoCarousel />

            <div className="relative mx-auto hidden min-h-[34rem] w-full max-w-[32rem] lg:block xl:min-h-[42rem] xl:max-w-[40rem]">
              <BrandWatermark className="right-[-14%] top-[12%] z-[1] text-[10rem] xl:text-[10rem]" />
              <BrandWatermark className="bottom-[9%] left-[-9%] z-[1] text-[7.25rem] xl:text-[8.25rem]" />

              {SIDE_SHOTS.map((shot) => (
                <div key={shot.src} className={cn("absolute z-10", shot.className)}>
                  <PhotoFrame
                    src={shot.src}
                    alt={shot.alt}
                    sizes="240px"
                    className="aspect-[4/5] w-full"
                  />
                </div>
              ))}

              <div className="absolute left-1/2 top-1/2 z-[12] w-[58%] -translate-x-1/2 -translate-y-1/2">
                <div aria-hidden className="studio-main-glow opacity-[0.72]" />
                <PhotoFrame
                  src={ASSETS.mary}
                  alt={`${MARY_FOX.label} — ${MARY_FOX.title}`}
                  sizes="420px"
                  priority
                  className="aspect-[3/4] w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden className="mf-mobile-ink-gap relative z-[1] lg:hidden">
          <div className="master-edge-glow" />
          <div className="master-fox-ink--soft mf-mobile-ink mf-mobile-ink--extra pointer-events-none absolute z-[1] select-none text-center font-display text-[clamp(8rem,38vw,12.5rem)] leading-[0.76] tracking-tight">
            <p>MARY</p>
            <p className="text-[0.8em]">FOX</p>
          </div>
        </div>

        <div className="mf-mob-row mt-4 grid lg:hidden">
          {MARY_FOX.highlights.map((item) => {
            const bustOnLeft = item.id === "education";
            return (
            <a
              key={item.id}
              href={item.href}
              className="master-highlight group relative flex items-center overflow-visible [-webkit-tap-highlight-color:transparent]"
            >
              <div className={cn("master-bust-frame", bustOnLeft ? "master-bust-frame--left from-left" : "master-bust-frame--right from-right")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HIGHLIGHT_BUST[item.id]} alt="" className="master-bust" />
              </div>
              <div
                className={cn(
                  "master-highlight-copy relative z-10 text-left",
                  bustOnLeft ? "ml-auto from-right" : "from-left"
                )}
              >
                <div className="gem-row mb-2.5">
                  <span aria-hidden className="gem" />
                  <h3 className="shrink-0 text-[12px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#f5b51b]">
                    {item.title}
                  </h3>
                  <span aria-hidden className="gem-rule" />
                </div>
                <p className="master-highlight-text text-[14.5px] leading-[1.6] text-[rgba(241,236,229,0.92)]">
                  {item.text}
                </p>
              </div>
            </a>
            );
          })}
        </div>

        <div className="mf-row mt-20">
          {MARY_FOX.highlights.map((item) => (
            <a key={item.id} href={item.href} className="mf-col master-highlight">
              <div className="mf-head from-left">
                <span aria-hidden className="gem" />
                <h3 className="title">{item.title}</h3>
                <span aria-hidden className="gem-rule" />
              </div>
              <div className="mf-text from-left">
                <p>{item.text}</p>
              </div>
              <div className="mf-bust">
                <div className="from-right">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={HIGHLIGHT_BUST[item.id]} alt="" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
