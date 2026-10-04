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

const photoArrowClass =
  "absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(241,236,229,0.2)] bg-[rgba(9,7,9,0.7)] text-[#f1ece5] transition-[color,border-color,box-shadow] duration-200 hover:border-[#f21b83] hover:text-[#f21b83] hover:shadow-[0_0_16px_rgba(242,27,131,0.35)] focus-visible:border-[#f21b83] focus-visible:text-[#f21b83] focus-visible:shadow-[0_0_16px_rgba(242,27,131,0.35)] focus-visible:outline-none";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M9.78 18.65 10.06 14.4l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.92-.25-.94-.92.2-1.37l15.97-6.16c.77-.33 1.51.18 1.23 1.28l-2.72 12.81c-.19.91-.74 1.13-1.5.7l-4.22-3.12-1.99 1.93c-.23.23-.42.42-.83.42Z" />
    </svg>
  );
}

const HIGHLIGHT_BUST: Record<
  (typeof MARY_FOX.highlights)[number]["id"],
  { src: string; className?: string }
> = {
  styles: { src: ASSETS.golova1, className: "origin-bottom-right translate-y-4 scale-[1.06]" },
  education: { src: ASSETS.golova3 },
  coworking: { src: ASSETS.golova4 },
};

function BrandWatermark({ className, soft }: { className?: string; soft?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-[1] select-none",
        soft ? "master-fox-ink--soft blur-[2px]" : "master-fox-ink",
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
    <div className="relative mx-auto w-full max-w-[34rem] pt-[calc(1.7*clamp(4.5rem,26vw,6.5rem))] md:pt-0 lg:hidden">
      <div
        aria-hidden
        className="master-fox-ink--soft pointer-events-none absolute right-[0.75rem] top-0 z-[1] select-none text-right font-display text-[clamp(4.5rem,26vw,6.5rem)] leading-[0.76] tracking-tight blur-[2px] md:-right-[2%] md:-top-[7%] md:right-auto md:text-[clamp(6rem,32vw,9rem)]"
      >
        <p>MARY</p>
        <p className="pr-[0.12em] text-[0.8em]">FOX</p>
      </div>
      <div
        aria-hidden
        className="master-fox-ink--soft pointer-events-none absolute -bottom-[7.5rem] -left-[1%] z-[1] select-none font-display text-[clamp(6.8rem,36vw,11rem)] leading-[0.76] tracking-tight blur-[2px]"
      >
        <p>MARY</p>
        <p className="pl-[0.16em] text-[0.8em]">FOX</p>
      </div>
      <div className="relative z-20 mx-auto w-[calc(100%-2.5rem)] md:w-[76%] md:pt-[10%]">
        <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div aria-hidden className="master-collage-glow" />
        </div>
        <div className="hero-space-card-face gallery-marquee-card relative overflow-hidden rounded-[0.9rem]">
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
      className="cascade relative scroll-mt-20 overflow-x-clip bg-[#090709] pb-12 pt-[7rem] md:pb-14 md:-mt-8 md:pt-0"
    >
      <BrandWatermark className="left-[-3%] top-[6%] z-0 hidden text-[28vw] md:left-0 md:text-[11rem] lg:block lg:text-[13rem]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
          <div className="relative z-20 order-2 mx-auto flex w-full max-w-[28rem] flex-col items-center justify-center text-center md:max-w-[34rem] lg:order-1 lg:mx-0 lg:max-w-[28rem] lg:items-start lg:text-left">
            <div>
              <p className="cascade-item mb-[18px] flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent-yellow lg:mb-3 lg:justify-start lg:gap-3 lg:text-xs lg:tracking-[0.32em]" style={{ animationDelay: "0.12s" }}>
                <span className="h-px w-6 bg-accent-yellow/40 lg:w-8" />
                {MARY_FOX.label}
                <span className="h-px w-6 bg-accent-yellow/40 lg:w-8" />
              </p>
              <h2 className="cascade-item flex flex-col items-center gap-0 font-serif text-[clamp(1.7rem,7.6vw,2.15rem)] font-semibold leading-[1] tracking-tight text-[#F1ECE5] lg:items-start lg:text-[2.55rem] lg:leading-[0.92] xl:text-[2.9rem]" style={{ animationDelay: "0.24s" }}>
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

            <p className="cascade-item mx-auto mt-6 max-w-[19rem] text-[13.5px] font-normal leading-[1.5] text-white/75 lg:mx-0 lg:mt-6 lg:max-w-[26rem] lg:text-[15px] lg:leading-[1.55] lg:text-white/70" style={{ animationDelay: "0.36s" }}>
              {MARY_FOX.roles
                .map((role, i) => (i === 0 ? role : role.charAt(0).toLowerCase() + role.slice(1)))
                .join(", ")}
              .
            </p>

            <div className="cascade-item mt-9 flex flex-wrap items-center justify-center lining-nums lg:mt-6 lg:justify-start" style={{ animationDelay: "0.48s" }}>
              {MARY_FOX.stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  {i > 0 ? (
                    <span className="mx-4 h-14 w-px shrink-0 bg-gradient-to-b from-transparent via-[rgba(245,181,27,0.6)] to-transparent sm:mx-5" />
                  ) : null}
                  <div>
                    <p className="font-serif text-[1.5rem] font-semibold leading-none tracking-tight text-[#f1ece5] md:text-[1.75rem]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10.5px] uppercase tracking-[0.16em] text-[rgba(241,236,229,0.6)]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cascade-item mt-7 flex max-w-[26rem] flex-wrap justify-center gap-2 lg:mt-6 lg:justify-start" style={{ animationDelay: "0.6s" }}>
              {MARY_FOX.tags.map((tag) => (
                <span
                  key={tag}
                  className="master-tag rounded-full px-[0.9rem] py-[0.4rem] text-[11px] uppercase tracking-[0.1em]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="cascade-item mt-[1.6rem] flex flex-row flex-wrap items-center justify-center gap-3 lg:mt-6 lg:justify-start" style={{ animationDelay: "0.72s" }}>
              <a
                href={CONTACT.maryInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[42px] items-center gap-2 rounded-full border border-[rgba(241,236,229,0.25)] px-[1.1rem] text-[14px] text-foreground transition-[color,border-color,box-shadow] duration-300 hover:border-[#f5b51b] hover:text-[#f5b51b] hover:shadow-[0_0_18px_rgba(245,181,27,0.3)] focus-visible:border-[#f5b51b] focus-visible:text-[#f5b51b] focus-visible:shadow-[0_0_18px_rgba(245,181,27,0.3)] focus-visible:outline-none"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
                {CONTACT.maryInstagramHandle}
              </a>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[42px] items-center gap-2 rounded-full border border-[rgba(241,236,229,0.25)] px-[1.1rem] text-[14px] text-foreground transition-[color,border-color,box-shadow] duration-300 hover:border-[#f21b83] hover:text-[#f21b83] hover:shadow-[0_0_18px_rgba(242,27,131,0.35)] focus-visible:border-[#f21b83] focus-visible:text-[#f21b83] focus-visible:shadow-[0_0_18px_rgba(242,27,131,0.35)] focus-visible:outline-none"
              >
                <TelegramIcon className="h-4 w-4" />
                @maryfoxtattooo
              </a>
            </div>
          </div>

          <div className="cascade-item relative z-10 order-1 lg:order-2" style={{ animationDelay: "0s" }}>
            <MobilePhotoCarousel />

            <div className="relative mx-auto hidden min-h-[34rem] w-full max-w-[32rem] lg:block xl:min-h-[42rem] xl:max-w-[40rem]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-[3/4] w-[58%] -translate-x-1/2 -translate-y-1/2">
                <div aria-hidden className="master-collage-glow" />
              </div>
              <BrandWatermark soft className="right-[-14%] top-[12%] text-[10rem] xl:text-[10rem]" />
              <BrandWatermark soft className="bottom-[9%] left-[-9%] text-[7.25rem] xl:text-[8.25rem]" />

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

        <div className="mt-[4.8rem] grid gap-y-10 md:mt-20 md:gap-y-12 lg:mt-16 lg:grid-cols-3 lg:gap-y-0">
          {MARY_FOX.highlights.map((item) => {
            const bustOnLeft = item.id === "education";
            return (
            <a
              key={item.id}
              href={item.href}
              className="master-highlight group relative flex min-h-[16rem] items-center overflow-visible py-8 [-webkit-tap-highlight-color:transparent] md:py-9 lg:min-h-[15.5rem] lg:py-10 lg:pl-8 lg:transition-colors lg:duration-200 lg:hover:bg-white/[0.02]"
            >
              <div className={cn("master-bust-frame", bustOnLeft ? "master-bust-frame--left" : "master-bust-frame--right")}>
                <div aria-hidden className="master-bust-glow" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HIGHLIGHT_BUST[item.id].src} alt="" className="master-bust" />
              </div>
              <div
                className={cn(
                  "master-highlight-copy relative z-10 w-[64%] max-w-[64%] text-left md:w-auto md:max-w-[56%]",
                  bustOnLeft ? "ml-auto md:ml-0" : ""
                )}
              >
                <div className="gem-row mb-2.5 lg:mb-3">
                  <span aria-hidden className="gem" />
                  <h3 className="shrink-0 text-[12px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#f5b51b]">
                    {item.title}
                  </h3>
                  <span aria-hidden className="gem-rule max-w-[4rem]" />
                </div>
                <p className="master-highlight-text text-[14.5px] leading-[1.6] text-[rgba(241,236,229,0.92)] md:text-[15px] md:leading-[1.65] md:text-[rgba(241,236,229,0.88)]">
                  {item.text}
                </p>
              </div>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
