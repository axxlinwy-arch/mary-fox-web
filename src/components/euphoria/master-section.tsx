"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    className: "left-[-6%] top-[8%] w-[13rem] -rotate-[8deg] xl:left-[-8%] xl:w-[14.5rem]",
  },
  {
    src: ASSETS.delaettattomary2,
    alt: "Работа Mary Fox",
    className: "right-[-6%] bottom-[10%] w-[13rem] rotate-[7deg] xl:right-[-8%] xl:w-[14.5rem]",
  },
] as const;

const HIGHLIGHT_BUST: Record<
  (typeof MARY_FOX.highlights)[number]["id"],
  { src: string; className?: string }
> = {
  styles: { src: ASSETS.golova1, className: "translate-y-2" },
  education: { src: ASSETS.golova3 },
  coworking: { src: ASSETS.golova4 },
};

function BrandWatermark({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute z-[1] select-none", className)}>
      <p className="font-display leading-[0.76] tracking-tight text-[#F1ECE5]/[0.16] lg:text-[#F1ECE5]/[0.11]">
        MARY
      </p>
      <p className="pl-[0.34em] font-display text-[0.82em] leading-[0.76] tracking-tight text-[#F1ECE5]/[0.1] lg:text-[#F1ECE5]/[0.07]">
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
    <div className={cn("hero-space-card-face relative overflow-hidden rounded-[0.9rem]", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", src === ASSETS.mary && "object-top")}
        sizes={sizes}
        priority={priority}
      />
      <span className="hero-space-card-sheen" aria-hidden />
    </div>
  );
}

export function MasterSection() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobilePhoto = GALLERY[mobileIndex];

  const goPrev = useCallback(() => {
    setMobileIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  }, []);

  const goNext = useCallback(() => {
    setMobileIndex((i) => (i + 1) % GALLERY.length);
  }, []);

  return (
    <section
      id={MARY_FOX.id}
      className="relative scroll-mt-20 overflow-hidden bg-[#090709] pb-12 pt-8 md:pb-14 md:-mt-6 md:pt-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#090709] via-[#090709]/80 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-0 hidden h-[32rem] w-[62%] bg-[radial-gradient(ellipse_at_0%_0%,rgba(196,20,98,0.2)_0%,rgba(122,18,62,0.28)_28%,transparent_58%)] lg:block" />
      <div className="glow-wash pointer-events-none absolute right-[-22%] top-[40%] h-[40rem] w-[34rem] md:top-[42%]" />
      <div className="glow-wash pointer-events-none absolute bottom-[-20%] left-[-22%] h-[40rem] w-[40rem]" />

      <BrandWatermark className="left-[-3%] top-[5%] hidden text-[28vw] md:left-0 md:text-[11rem] lg:block lg:text-[14rem]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 xl:gap-4">
          <div className="order-2 flex flex-col justify-center gap-6 text-center lg:order-1 lg:text-left">
            <div>
              <p className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow lg:justify-start sm:text-[11px]">
                <span className="hidden h-px w-8 bg-accent-yellow/40 lg:block" />
                {MARY_FOX.label}
                <span className="hidden h-px w-8 bg-accent-yellow/40 lg:block" />
              </p>
              <h2 className="font-serif text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#F1ECE5] sm:text-4xl lg:text-[2.6rem]">
                {MARY_FOX.titleLead}{" "}
                <span className="text-gradient-euphoria">{MARY_FOX.titleGold}</span>{" "}
                {MARY_FOX.titleEnd}
              </h2>
            </div>

            <ul className="mx-auto grid max-w-xl gap-2 lg:mx-0">
              {MARY_FOX.roles.map((role) => (
                <li
                  key={role}
                  className="flex items-start gap-3 text-left text-[15px] leading-relaxed text-[#F1ECE5]/68"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{role}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-center text-champagne lg:justify-start">
              {MARY_FOX.stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  {i > 0 ? <span className="mx-4 h-8 w-px bg-champagne/25" /> : null}
                  <div>
                    <p className="text-[15px] font-medium leading-none">{stat.value}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-champagne/70">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {MARY_FOX.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 lg:items-start">
              <a
                href={CONTACT.maryInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-champagne transition-opacity hover:opacity-80"
              >
                <span className="text-[#F1ECE5]/38">Instagram </span>
                {CONTACT.maryInstagramHandle}
              </a>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-champagne transition-opacity hover:opacity-80"
              >
                <span className="text-[#F1ECE5]/38">Telegram </span>
                @maryfoxtattooo
              </a>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm pt-16 pb-3 lg:hidden">
              <div className="glow-wash-soft pointer-events-none absolute left-[-48%] top-[-22%] z-0 h-[26rem] w-[30rem]" />
              <BrandWatermark className="left-[-2%] top-0 text-[17vw] opacity-75" />
              <div className="glow-wash-hot pointer-events-none absolute bottom-[-28%] right-[-46%] z-0 h-[26rem] w-[30rem]" />
              <BrandWatermark className="bottom-[-4.25rem] right-[-2%] text-[22vw]" />
              <div className="relative z-[1]">
                <PhotoFrame
                  src={mobilePhoto.src}
                  alt={mobilePhoto.alt}
                  sizes="(max-width: 1024px) 90vw, 420px"
                  priority={mobileIndex === 0}
                  className="aspect-[4/5] w-full"
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

            <div className="relative mx-auto hidden min-h-[38rem] w-full max-w-[36rem] lg:block xl:min-h-[42rem] xl:max-w-[40rem]">
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

        <div className="mt-8 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4 lg:mt-6 lg:gap-5">
          {MARY_FOX.highlights.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group relative min-h-[10.5rem] overflow-hidden rounded-[1.7rem] border border-[rgba(180,35,100,0.38)] bg-[#110C11] p-4 shadow-[0_0_28px_rgba(220,20,100,0.12)] transition-colors hover:border-[rgba(180,35,100,0.55)] md:min-h-[14.5rem] md:p-7 md:pr-16"
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] bg-[radial-gradient(ellipse_at_90%_50%,rgba(122,18,62,0.12),transparent_74%)]" />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-[48%] overflow-hidden md:w-[46%]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0.82) 72%, black 100%)",
                  maskImage:
                    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0.82) 72%, black 100%)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HIGHLIGHT_BUST[item.id].src}
                  alt=""
                  className={cn(
                    "master-bust absolute -right-[10%] bottom-[-4%] h-[112%] w-auto max-w-none object-cover object-[70%_12%] md:-right-[18%]",
                    HIGHLIGHT_BUST[item.id].className
                  )}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{
                  background:
                    "linear-gradient(90deg, #110C11 0%, #110C11 30%, rgba(17,12,17,0.62) 46%, rgba(17,12,17,0.28) 60%, rgba(17,12,17,0.08) 74%, transparent 90%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 md:hidden"
                style={{
                  background:
                    "linear-gradient(90deg, #110C11 0%, #110C11 42%, rgba(17,12,17,0.72) 62%, rgba(17,12,17,0.2) 82%, transparent 100%)",
                }}
              />

              <div className="relative z-10 flex h-full max-w-[68%] flex-col md:max-w-[72%]">
                <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-yellow md:mb-3 md:text-[12px] md:tracking-[0.18em]">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-snug text-[#F1ECE5]/68 md:text-[15px] md:leading-relaxed">
                  {item.text}
                </p>
              </div>
              <span className="absolute right-3.5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-champagne text-[#090709] shadow-[0_0_18px_rgba(221,208,186,0.2)] transition-transform group-hover:translate-x-0.5 md:right-6 md:h-11 md:w-11">
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={1.75} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
