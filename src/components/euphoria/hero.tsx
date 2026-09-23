"use client";

import type { CSSProperties } from "react";
import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react";
import { HERO } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { CtaButton } from "@/components/euphoria/cta-button";
import { HeroNavCard } from "@/components/euphoria/hero-nav-card";

/** 3D space around the girl — independent drift, not an orbit. */
const HERO_SPACE = [
  { layer: "near", durationSec: 11, delaySec: 0 },
  { layer: "far", durationSec: 15, delaySec: -4.5 },
  { layer: "mid", durationSec: 13, delaySec: -7.2 },
] as const;

const CARD_IMAGES = {
  tattoo1: ASSETS.tattoo1,
  team: ASSETS.team,
  delaettattomary2: ASSETS.delaettattomary2,
} as const;

const STAT_ICONS = [Users, Star, ShieldCheck] as const;

export function EuphoriaHero() {
  return (
    <section className="relative flex h-dvh min-h-[640px] w-full flex-col overflow-hidden bg-[#090709] md:block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.finalPhoto}
        alt="EUPHORIA — Mary Fox"
        width={1254}
        height={1254}
        decoding="async"
        fetchPriority="high"
        className="pointer-events-none absolute top-0 right-[-8%] z-[1] h-[78%] w-[116%] max-w-none object-cover object-[30%_40%] md:inset-auto md:right-0 md:top-[48px] md:h-[118%] md:w-[70%] md:object-[68%_36%] lg:w-[64%] md:[mask-image:linear-gradient(90deg,transparent,black_16%,black)]"
      />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#090709]/80 via-[#090709]/55 to-[#090709] md:hidden" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.dimPhoto}
        alt=""
        className="pointer-events-none absolute -bottom-[12%] -left-[10%] z-[2] hidden h-[92%] w-[58%] object-cover object-left-bottom mix-blend-screen brightness-125 saturate-150 contrast-125 md:block"
      />

      <div className="relative z-10 flex w-full max-w-none flex-1 flex-col justify-end bg-transparent px-3 pb-3 pt-24 md:h-full md:max-w-[46%] md:flex-none md:justify-center md:bg-gradient-to-r md:from-[#090709] md:via-[#090709]/80 md:to-transparent md:px-10 md:pb-24 lg:max-w-[40%] lg:px-16 xl:px-20">
        <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/45 md:text-[11px] md:tracking-[0.32em]">
          <span className="hidden h-px w-8 shrink-0 bg-white/30 md:block" />
          {HERO.kicker}
          <span className="hidden h-px w-8 shrink-0 bg-white/30 md:block" />
        </p>
        <h1 className="font-serif relative z-[12] mt-5 flex w-full flex-col items-start text-left gap-0 text-[min(2.35rem,8.9vw)] font-semibold uppercase leading-none tracking-tight text-white md:text-4xl lg:text-[2.75rem] xl:text-[3.35rem]">
          <span>{HERO.titleLead}</span>
          <span className="overflow-visible whitespace-nowrap leading-[1.18] text-gradient-euphoria-50">
            {HERO.titleGold}
          </span>
          <span>{HERO.titleEnd}</span>
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
          {HERO.description}
        </p>

        <div className="mt-10 flex flex-nowrap items-center gap-3 md:mt-8 md:flex-wrap">
          <CtaButton href={CONTACT.maryInstagram} className="h-11 min-w-0 flex-1 gap-1.5 px-3 py-0 md:h-12 md:flex-none md:gap-2 md:px-7">
            <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.06em] md:text-xs md:tracking-[0.14em] lg:text-sm">
              {HERO.ctaBook}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          </CtaButton>
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-full border border-white/25 px-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:border-accent hover:bg-accent/10 md:h-12 md:flex-none md:px-7 md:text-xs md:tracking-[0.14em] lg:text-sm"
          >
            <span className="whitespace-nowrap">{HERO.ctaWorks}</span>
          </a>
        </div>

        <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 text-[#E8DCC4] md:mt-10 md:w-auto md:flex-nowrap md:justify-start md:gap-0">
          {HERO.stats.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div
                key={stat.label}
                className={`flex items-center${i === 2 ? " max-md:basis-full max-md:justify-center" : ""}`}
              >
                {i > 0 ? (
                  <span className="hidden h-9 w-px bg-[#E8DCC4]/25 md:mx-5 md:block" />
                ) : null}
                <div className="flex items-center gap-2.5">
                  <Icon
                    className="h-[1.35rem] w-[1.35rem] text-[#E8DCC4]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[15px] font-medium leading-none tracking-wide text-[#E8DCC4] md:text-base">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#E8DCC4]/70 md:text-[10px]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hero-space">
        {HERO.cards.map((card, index) => {
          const space = HERO_SPACE[index];
          return (
            <div
              key={card.href}
              className={`hero-space__card hero-space__card--${space.layer}`}
              style={
                {
                  "--float-duration": `${space.durationSec}s`,
                  "--float-delay": `${space.delaySec}s`,
                } as CSSProperties
              }
            >
              <div className="hero-space__pose">
                <HeroNavCard
                  href={card.href}
                  title={card.title}
                  src={CARD_IMAGES[card.imageKey]}
                  disableTilt
                  glossy
                  className="hero-space__face"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-28 bg-gradient-to-t from-[#090709] to-transparent" />
    </section>
  );
}
