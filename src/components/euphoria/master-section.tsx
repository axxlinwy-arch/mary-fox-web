"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react";
import { MARY_FOX } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { cn } from "@/lib/utils";

const GALLERY = [
  { src: ASSETS.mary, alt: "Mary Fox — EUPHORIA" },
  { src: ASSETS.delaettattomary, alt: "Работа Mary Fox — cover up" },
  { src: ASSETS.delaettattomary2, alt: "Работа Mary Fox" },
] as const;

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

const HIGHLIGHT_BUST: Record<
  (typeof MARY_FOX.highlights)[number]["id"],
  { src: string; className?: string }
> = {
  styles: { src: ASSETS.golova1, className: "origin-bottom-right translate-y-4 scale-[1.06]" },
  education: { src: ASSETS.golova3 },
  coworking: { src: ASSETS.golova4 },
};

function BrandWatermark({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute z-[1] select-none", className)}>
      <p className="font-display leading-[0.76] tracking-tight text-[#F1ECE5]/[0.12] lg:text-[#F1ECE5]/[0.09]">
        MARY
      </p>
      <p className="pl-[0.34em] font-display text-[0.82em] leading-[0.76] tracking-tight text-[#F1ECE5]/[0.08] lg:text-[#F1ECE5]/[0.06]">
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
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("hero-space-card-face gallery-marquee-card relative overflow-hidden rounded-[0.9rem]", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", src === ASSETS.mary && "object-top")}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

export function MasterSection() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const mobilePhoto = GALLERY[mobileIndex];

  const goPrev = useCallback(() => {
    setMobileIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  }, []);

  const goNext = useCallback(() => {
    setMobileIndex((i) => (i + 1) % GALLERY.length);
  }, []);

  useEffect(() => {
    const root = highlightsRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = root.querySelectorAll(".master-reveal, .master-highlight");
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
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={MARY_FOX.id}
      ref={highlightsRef}
      className="relative scroll-mt-20 overflow-hidden bg-[#090709] pb-12 pt-8 md:pb-14 md:-mt-6 md:pt-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-[#090709] via-[#090709]/80 to-transparent" />
      <div className="pointer-events-none absolute -left-24 -top-16 z-0 h-[28rem] w-[46rem] bg-[radial-gradient(ellipse_at_0%_0%,rgba(242,27,131,0.28)_0%,rgba(196,20,98,0.12)_28%,transparent_68%)]" />

      <BrandWatermark className="left-[-3%] top-[6%] z-0 hidden text-[28vw] md:left-0 md:text-[11rem] lg:block lg:text-[13rem]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
          <div className="master-reveal relative z-20 order-1 mx-auto flex w-full max-w-[28rem] flex-col items-center justify-center text-center md:max-w-[34rem] lg:mx-0 lg:max-w-[28rem] lg:items-start lg:text-left">
            <div>
              <p className="mb-3 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent-yellow md:text-xs lg:justify-start">
                <span className="h-px w-8 bg-accent-yellow/40" />
                {MARY_FOX.label}
                <span className="h-px w-8 bg-accent-yellow/40" />
              </p>
              <h2 className="flex flex-col items-center gap-0 font-serif text-[1.85rem] font-semibold leading-[0.92] tracking-tight text-[#F1ECE5] md:text-[2.15rem] lg:items-start lg:text-[2.55rem] xl:text-[2.9rem]">
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

            <p className="mt-5 max-w-[26rem] text-[14px] leading-relaxed text-white/70 md:mt-6 md:text-[15px]">
              {MARY_FOX.roles
                .map((role, i) => (i === 0 ? role : role.charAt(0).toLowerCase() + role.slice(1)))
                .join(", ")}
              .
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center text-[#E8DCC4] lg:justify-start">
              {MARY_FOX.stats.map((stat, i) => {
                const Icon = i === 0 ? Star : Users;
                return (
                  <div key={stat.label} className="flex items-center">
                    {i > 0 ? <span className="mx-4 h-9 w-px shrink-0 bg-[#E8DCC4]/25 sm:mx-5" /> : null}
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 shrink-0 text-[#E8DCC4] md:h-6 md:w-6 lg:h-[1.35rem] lg:w-[1.35rem]" strokeWidth={1.5} />
                      <div>
                        <p className="font-serif text-[1.35rem] font-semibold leading-none tracking-tight md:text-[1.6rem] lg:text-[1.9rem]">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#E8DCC4]/70 sm:text-[11px]">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex max-w-[26rem] flex-wrap justify-center gap-2 md:max-w-none lg:max-w-[26rem] lg:justify-start">
              {MARY_FOX.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#C41462] bg-[rgba(62,18,40,0.55)] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#F1ECE5]/82 transition-colors duration-200 hover:border-[#F21B83] hover:text-[#F1ECE5] sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] text-white/70 md:gap-x-6 md:text-[15px] lg:justify-start">
              <a
                href={CONTACT.maryInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-white"
              >
                Instagram {CONTACT.maryInstagramHandle}
              </a>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-white"
              >
                Telegram @maryfoxtattooo
              </a>
            </div>
          </div>

          <div className="master-reveal master-reveal-late relative z-10 order-2">
            <div className="relative mx-auto max-w-sm pt-6 pb-3 md:max-w-[34rem] lg:hidden">
              <div className="glow-wash-soft pointer-events-none absolute left-[-72%] top-[-46%] z-0 h-[36rem] w-[42rem] md:left-[-48%] md:h-[32rem] md:w-[36rem]" />
              <div className="glow-wash-hot pointer-events-none absolute bottom-[-28%] right-[-46%] z-0 h-[26rem] w-[30rem]" />
              <BrandWatermark className="bottom-[-4.25rem] right-[-2%] text-[22vw] md:text-[5.5rem]" />
              <div className="relative z-[1]">
                <BrandWatermark className="left-[-2%] top-0 z-0 -translate-y-[1.07em] text-[24vw] md:text-[6.25rem]" />
                <PhotoFrame
                  src={mobilePhoto.src}
                  alt={mobilePhoto.alt}
                  sizes="(max-width: 1024px) 90vw, 420px"
                  priority={mobileIndex === 0}
                  className="relative z-[1] aspect-[4/5] w-full"
                />
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Предыдущее фото"
                  className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(180,35,100,0.38)] bg-black/40 text-champagne backdrop-blur-sm"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Следующее фото"
                  className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(180,35,100,0.38)] bg-black/40 text-champagne backdrop-blur-sm"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="relative mx-auto hidden min-h-[34rem] w-full max-w-[32rem] lg:block xl:min-h-[42rem] xl:max-w-[40rem]">
              <div className="glow-wash pointer-events-none absolute left-1/2 top-1/2 z-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2" />
              <div className="pointer-events-none absolute right-[-14%] top-[12%] z-0 text-[10rem] xl:text-[10rem]">
                <div className="absolute -left-[2.8em] -top-[0.5em] h-[1.8em] w-[2.8em] rounded-[30%] bg-[radial-gradient(ellipse_at_center,rgba(196,20,98,0.16)_0%,rgba(122,18,62,0.24)_40%,transparent_70%)]" />
              </div>
              <div className="pointer-events-none absolute bottom-[9%] left-[-9%] z-0 text-[7.25rem] xl:text-[8.25rem]">
                <div className="absolute -right-[2.8em] -top-[2.1em] h-[2em] w-[2.8em] rounded-[30%] bg-[radial-gradient(ellipse_at_center,rgba(196,20,98,0.16)_0%,rgba(122,18,62,0.24)_40%,transparent_70%)]" />
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

        <div ref={highlightsRef} className="mt-12 grid border-t border-[#F1ECE5]/10 md:mt-14 lg:mt-8 lg:grid-cols-3">
          {MARY_FOX.highlights.map((item) => {
            const bustOnLeft = item.id === "education";
            return (
            <a
              key={item.id}
              href={item.href}
              className="master-highlight group relative block min-h-[12.5rem] overflow-visible border-b border-[#F1ECE5]/10 py-7 transition-colors duration-200 hover:bg-white/[0.025] md:min-h-[14rem] md:px-8 md:py-8 lg:min-h-[15rem] lg:overflow-hidden lg:border-b-0 lg:border-l lg:border-[#F1ECE5]/10 lg:px-7 lg:first:border-l-0"
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
                <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-yellow transition-colors duration-200 group-hover:text-[#F1ECE5]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#F1ECE5]/68 md:text-[15px]">{item.text}</p>
              </div>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
