"use client";

import { motion } from "framer-motion";
import { ASSETS, CONTACT, HERO } from "@/constants/site";
import { HeroStats } from "@/components/euphoria/hero-stats";
import { BookButton } from "@/components/euphoria/book-button";
import { HeroPhotoCarousel } from "@/components/euphoria/hero-photo-carousel";
import { HeroAmbientEffects } from "@/components/euphoria/hero-ambient-effects";

function HeroWidgets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-10 flex w-full flex-col items-center justify-center"
    >
      <HeroStats centered />

      <div className="mt-7">
        <BookButton />
      </div>
    </motion.div>
  );
}

export function EuphoriaHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative z-10">
        <div className="h-16 shrink-0 md:h-20" aria-hidden />

        <div
          className="relative z-10 mx-auto w-full px-3 sm:px-4 md:px-5 pb-6 sm:pb-8"
          style={{ maxWidth: HERO.maxWidth }}
        >
          <div className="relative overflow-hidden rounded-none">
            <HeroAmbientEffects />

            <div
              className="relative z-[1] grid grid-cols-1 md:grid-rows-2 md:gap-0 md:h-[580px] lg:h-[620px] md:[grid-template-columns:var(--hero-cols)]"
              style={{ ["--hero-cols" as string]: HERO.gridCols }}
            >
            {/* Левая колонка: на мобильном — та же 2-row сетка, что и на десктопе */}
            <div className="order-1 grid h-[500px] grid-rows-[1.55fr_1fr] gap-0 sm:h-[540px] md:contents md:h-auto">
              <div className="relative z-20 flex h-full items-center justify-center overflow-hidden px-2 py-3 md:col-start-1 md:row-start-1 md:overflow-visible md:p-0 md:py-0 md:pr-0">
                <img
                  src={ASSETS.logoEuphoria}
                  alt="EUPHORIA — Minsk"
                  width={220}
                  height={88}
                  decoding="async"
                  fetchPriority="high"
                  className="relative z-10 block h-auto w-full max-w-[72%] scale-[1.15] object-contain sm:scale-[1.2] md:scale-[1.25]"
                />
              </div>

              <div className="relative z-20 flex h-full items-center justify-center p-5 pt-2 md:col-start-1 md:row-start-2">
                <HeroWidgets />
              </div>
            </div>

            <div className="order-2 relative z-[1] mt-6 shrink-0 md:order-none md:col-start-2 md:row-start-1 md:row-span-2 md:mt-0 md:h-full">
              <HeroPhotoCarousel />
            </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 mt-4 flex flex-wrap gap-4 sm:gap-6"
          >
            <a
              href="#offer"
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 hover:text-accent transition-colors"
            >
              Публичная оферта
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent-gold hover:opacity-80"
            >
              {CONTACT.instagramHandle}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
