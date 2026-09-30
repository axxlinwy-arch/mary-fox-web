"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react";
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
  "absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(180,35,100,0.38)] bg-[#0C090B]/45 text-[#F1ECE5]/80 backdrop-blur-none transition-colors hover:border-[rgba(180,35,100,0.55)] hover:text-[#F1ECE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70";

const HIGHLIGHT_BUST: Record<
  (typeof MARY_FOX.highlights)[number]["id"],
  { src: string; className?: string }
> = {
  styles: { src: ASSETS.golova1, className: "origin-bottom-right translate-y-4 scale-[1.06]" },
  education: { src: ASSETS.golova3 },
  coworking: { src: ASSETS.golova4 },
};

function BrandWatermark({ className, dim }: { className?: string; dim?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute z-[1] select-none", className)}>
      <p
        className={cn(
          "font-display leading-[0.76] tracking-tight",
          dim ? "text-[#F1ECE5]/[0.055]" : "text-[#F1ECE5]/[0.12] lg:text-[#F1ECE5]/[0.09]"
        )}
      >
        MARY
      </p>
      <p
        className={cn(
          "pl-[0.34em] font-display text-[0.82em] leading-[0.76] tracking-tight",
          dim ? "text-[#F1ECE5]/[0.04]" : "text-[#F1ECE5]/[0.08] lg:text-[#F1ECE5]/[0.06]"
        )}
      >
        FOX
      </p>
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
    <div className="relative mx-auto w-full max-w-[34rem] lg:hidden">
      <div className="glow-wash pointer-events-none absolute left-1/2 top-1/2 z-0 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[2%] -top-[7%] z-[1] select-none text-right font-display text-[clamp(6rem,32vw,9rem)] leading-[0.76] tracking-tight blur-[1.5px]"
      >
        <p className="text-[#F1ECE5]/[0.09]">MARY</p>
        <p className="pr-[0.12em] text-[0.8em] text-[#F1ECE5]/[0.06]">FOX</p>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[7.5rem] -left-[1%] z-[1] select-none font-display text-[clamp(6.8rem,36vw,11rem)] leading-[0.76] tracking-tight blur-[1.5px]"
      >
        <div
          aria-hidden
          className="glow-wash pointer-events-none absolute -left-[0.4em] -top-[1.05em] -z-10 h-[2.15em] w-[2.7em] opacity-50"
        />
        <p className="text-[#F1ECE5]/[0.055]">MARY</p>
        <p className="pl-[0.16em] text-[0.8em] text-[#F1ECE5]/[0.035]">FOX</p>
      </div>
      <div className="relative z-20 mx-auto w-[76%] pt-[10%]">
        <div className="hero-space-card-face gallery-marquee-card relative overflow-hidden rounded-[0.9rem]">
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          >
            {MOBILE_PHOTOS.map((photo, i) => (
              <div key={photo.src} className="relative aspect-[3/4] w-full shrink-0" aria-hidden={i !== index}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={cn("object-cover", photo.src === ASSETS.mary && "object-top")}
                  sizes="(max-width: 1024px) 76vw, 420px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            aria-label="Предыдущее фото"
            className={cn(photoArrowClass, "left-2")}
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % total)}
            aria-label="Следующее фото"
            className={cn(photoArrowClass, "right-2")}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
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
      className="cascade relative scroll-mt-20 overflow-hidden bg-[#0C090B] pb-12 pt-12 md:pb-14 md:-mt-8 md:pt-0"
    >
      <div className="pointer-events-none absolute -right-16 -top-24 z-0 h-[22rem] w-[34rem] bg-[radial-gradient(ellipse_at_100%_20%,rgba(196,20,98,0.24)_0%,rgba(122,18,62,0.1)_32%,transparent_70%)] lg:-left-16 lg:right-auto lg:h-[28rem] lg:w-[42rem] lg:bg-[radial-gradient(ellipse_at_0%_0%,rgba(242,27,131,0.2)_0%,rgba(196,20,98,0.08)_28%,transparent_68%)]" />

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
              <h2 className="cascade-item flex flex-col items-center gap-0 font-serif text-[clamp(1.7rem,8vw,2rem)] font-semibold leading-[1] tracking-tight text-[#F1ECE5] lg:items-start lg:text-[2.55rem] lg:leading-[0.92] xl:text-[2.9rem]" style={{ animationDelay: "0.24s" }}>
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

            <p className="cascade-item mx-auto mt-6 max-w-[19rem] text-[13.5px] font-normal leading-[1.5] text-white/75 lg:mt-6 lg:max-w-[26rem] lg:text-[15px] lg:leading-[1.55] lg:text-white/70" style={{ animationDelay: "0.36s" }}>
              {MARY_FOX.roles
                .map((role, i) => (i === 0 ? role : role.charAt(0).toLowerCase() + role.slice(1)))
                .join(", ")}
              .
            </p>

            <div className="cascade-item mt-9 flex flex-wrap items-center justify-center text-[#E8DCC4] lg:mt-6 lg:justify-start" style={{ animationDelay: "0.48s" }}>
              {MARY_FOX.stats.map((stat, i) => {
                const Icon = i === 0 ? Star : Users;
                return (
                  <div key={stat.label} className="flex items-center">
                    {i > 0 ? <span className="mx-4 h-9 w-px shrink-0 bg-[#E8DCC4]/25 sm:mx-5" /> : null}
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#E8DCC4] lg:h-[1.35rem] lg:w-[1.35rem]" strokeWidth={1.5} />
                      <div>
                        <p className="font-serif text-[1.875rem] font-semibold leading-none tracking-tight lg:text-[1.9rem]">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#E8DCC4]/70 lg:text-[11px]">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cascade-item mt-7 flex max-w-[26rem] flex-wrap justify-center gap-2 lg:mt-6 lg:justify-start" style={{ animationDelay: "0.6s" }}>
              {MARY_FOX.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#C41462] bg-[rgba(62,18,40,0.55)] px-2.5 py-[3px] text-[10px] uppercase tracking-[0.12em] text-[#F1ECE5]/82 transition-colors duration-200 hover:border-[#F21B83] hover:text-[#F1ECE5] lg:px-3 lg:py-1 lg:text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="cascade-item mt-[1.6rem] flex flex-row flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[11px] text-white/45 lg:mt-6 lg:justify-start lg:gap-x-6 lg:text-[15px] lg:text-white/70" style={{ animationDelay: "0.72s" }}>
              <a
                href={CONTACT.maryInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-colors duration-200 hover:text-white"
              >
                Instagram
                <span className="text-white/30 group-hover:text-white lg:text-white/70"> {CONTACT.maryInstagramHandle}</span>
              </a>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-colors duration-200 hover:text-white"
              >
                Telegram
                <span className="text-white/30 group-hover:text-white lg:text-white/70"> @maryfoxtattooo</span>
              </a>
            </div>
          </div>

          <div className="cascade-item relative z-10 order-1 lg:order-2" style={{ animationDelay: "0s" }}>
            <MobilePhotoCarousel />

            <div className="relative mx-auto hidden min-h-[34rem] w-full max-w-[32rem] lg:block xl:min-h-[42rem] xl:max-w-[40rem]">
              <div className="glow-wash pointer-events-none absolute left-1/2 top-1/2 z-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2" />
              <div className="pointer-events-none absolute right-[-14%] top-[12%] z-0 text-[10rem] xl:text-[10rem]">
                <div className="absolute -left-[2.8em] -top-[0.5em] h-[1.8em] w-[2.8em] rounded-[30%] bg-[radial-gradient(ellipse_at_center,rgba(242,27,131,0.2)_0%,rgba(196,20,98,0.08)_28%,transparent_68%)]" />
              </div>
              <div className="pointer-events-none absolute bottom-[9%] left-[-9%] z-0 text-[7.25rem] xl:text-[8.25rem]">
                <div className="absolute -right-[2.8em] -top-[2.1em] h-[2em] w-[2.8em] rounded-[30%] bg-[radial-gradient(ellipse_at_center,rgba(242,27,131,0.2)_0%,rgba(196,20,98,0.08)_28%,transparent_68%)]" />
              </div>
              <BrandWatermark className="right-[-14%] top-[12%] text-[10rem] xl:text-[10rem]" />
              <BrandWatermark className="bottom-[9%] left-[-9%] text-[7.25rem] xl:text-[8.25rem]" />

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

        <div className="mt-[4.8rem] grid border-t border-[#F1ECE5]/10 md:mt-20 lg:mt-16 lg:grid-cols-3">
          {MARY_FOX.highlights.map((item) => {
            const bustOnLeft = item.id === "education";
            return (
            <a
              key={item.id}
              href={item.href}
              className="master-highlight group relative flex min-h-[12.5rem] items-center overflow-visible border-b border-[#F1ECE5]/10 py-8 [-webkit-tap-highlight-color:transparent] md:min-h-[14rem] md:px-8 md:py-9 lg:min-h-[15.5rem] lg:overflow-hidden lg:border-b-0 lg:border-l lg:border-[#F1ECE5]/10 lg:px-8 lg:py-10 lg:transition-colors lg:duration-200 lg:hover:bg-white/[0.02] lg:first:border-l-0"
            >
              <div
                className={cn(
                  "master-highlight-bust pointer-events-none absolute inset-y-0 w-[58%] sm:w-[52%] lg:left-auto lg:-right-[10%] lg:w-[58%]",
                  bustOnLeft ? "from-left -left-[12%] sm:-left-[8%]" : "from-right -right-[12%] sm:-right-[8%]"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0",
                    bustOnLeft
                      ? "bg-[radial-gradient(ellipse_at_20%_70%,rgba(196,20,98,0.14),transparent_72%)] lg:bg-[radial-gradient(ellipse_at_80%_70%,rgba(196,20,98,0.14),transparent_72%)]"
                      : "bg-[radial-gradient(ellipse_at_80%_70%,rgba(196,20,98,0.14),transparent_72%)]"
                  )}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HIGHLIGHT_BUST[item.id].src}
                  alt=""
                  className={cn(
                    "master-bust absolute bottom-0 h-full w-auto max-w-none object-contain object-bottom lg:right-0",
                    bustOnLeft ? "master-bust-from-left left-0 lg:left-auto" : "right-0",
                    HIGHLIGHT_BUST[item.id].className
                  )}
                />
              </div>
              <div
                className={cn(
                  "master-highlight-copy relative z-10 max-w-[68%] lg:ml-0 lg:max-w-[66%] lg:pr-3 lg:text-left",
                  bustOnLeft ? "from-right ml-auto pl-3" : "from-left pr-3"
                )}
              >
                <h3 className="mb-2.5 text-[12px] font-semibold uppercase leading-snug tracking-[0.14em] text-accent-yellow lg:mb-3 lg:transition-colors lg:duration-200 lg:group-hover:text-[#F1ECE5]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-[#F1ECE5]/72 md:text-[15px] md:leading-[1.6]">{item.text}</p>
              </div>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
