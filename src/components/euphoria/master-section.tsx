"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, Layers, Users, type LucideIcon } from "lucide-react";
import { MARY_FOX } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { cn } from "@/lib/utils";

type GalleryKey = (typeof MARY_FOX.gallery)[number]["key"];

const HIGHLIGHT_ICONS: Record<(typeof MARY_FOX.highlights)[number]["id"], LucideIcon> = {
  styles: Layers,
  education: GraduationCap,
  coworking: Users,
};

const IMAGE_MAP: Record<GalleryKey, string> = {
  mary: ASSETS.mary,
  delaettattomary: ASSETS.delaettattomary,
  delaettattomary2: ASSETS.delaettattomary2,
};

export function MasterSection() {
  const prefersReducedMotion = useReducedMotion();
  const [mobileIndex, setMobileIndex] = useState(0);
  const gallery = MARY_FOX.gallery;
  const [secondaryLeft, secondaryRight] = MARY_FOX.secondaryImages;

  const goPrev = useCallback(() => {
    setMobileIndex((i) => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const goNext = useCallback(() => {
    setMobileIndex((i) => (i + 1) % gallery.length);
  }, [gallery.length]);

  const mobilePhoto = gallery[mobileIndex];

  return (
    <section
      id={MARY_FOX.id}
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-pink opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Верх: текст слева, фото справа — выровнены по центру */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 flex flex-col justify-center gap-6 text-center lg:order-1 lg:text-left lg:gap-7"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
                {MARY_FOX.label}
              </p>
              <h2 className="font-display text-4xl leading-none text-gradient-euphoria md:text-6xl lg:text-7xl">
                {MARY_FOX.title}
              </h2>
            </div>

            <ul className="mx-auto grid max-w-xl gap-2 lg:mx-0">
              {MARY_FOX.roles.map((role) => (
                <li
                  key={role}
                  className="flex items-start gap-3 text-left text-lg leading-snug text-secondary-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{role}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-3 lg:items-start">
              <div className="grid w-full max-w-xs grid-cols-2 gap-3 lg:max-w-sm">
                {MARY_FOX.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="neon-border rounded-xl bg-black/40 px-4 py-4 text-center backdrop-blur-sm"
                  >
                    <p className="font-display text-3xl text-gradient-euphoria sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-secondary-foreground sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {MARY_FOX.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/30 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2 lg:items-start">
              <a
                href={CONTACT.maryInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent-gold transition-opacity hover:opacity-80"
              >
                <span className="text-secondary-foreground">Личный Instagram</span>
                <span className="font-medium tracking-wide">{CONTACT.maryInstagramHandle}</span>
              </a>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent-gold transition-opacity hover:opacity-80"
              >
                <span className="text-secondary-foreground">Telegram</span>
                <span className="font-medium tracking-wide">@maryfoxtattooo</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="relative order-1 mx-auto w-full max-w-lg lg:order-2 lg:ml-auto lg:mr-0"
          >
            {/* Mobile: карусель со стрелками */}
            <div className="relative lg:hidden">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl neon-border">
                <Image
                  key={mobilePhoto.key}
                  src={IMAGE_MAP[mobilePhoto.key]}
                  alt={mobilePhoto.alt}
                  fill
                  className={cn("object-cover", !prefersReducedMotion && "studio-main-enter")}
                  sizes="(max-width: 1024px) 100vw, 512px"
                  priority={mobileIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <span className="inline-block rounded-full border border-accent-gold/30 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-gold backdrop-blur-sm">
                    {MARY_FOX.label}
                  </span>
                  <span className="text-[10px] tabular-nums text-white/50">
                    {mobileIndex + 1}/{gallery.length}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={goPrev}
                aria-label="Предыдущее фото"
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/30 bg-black/70 text-accent backdrop-blur-sm transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Следующее фото"
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/30 bg-black/70 text-accent backdrop-blur-sm transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-2xl" />
            </div>

            {/* Desktop: главное + два превью снизу */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl neon-border">
                <Image
                  src={IMAGE_MAP[MARY_FOX.imageKey]}
                  alt={`${MARY_FOX.label} — ${MARY_FOX.title}`}
                  fill
                  className="object-cover"
                  sizes="512px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-full border border-accent-gold/30 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-gold backdrop-blur-sm">
                    {MARY_FOX.label}
                  </span>
                </div>
              </div>

              {secondaryLeft && (
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="absolute -bottom-6 -left-8 z-10 h-48 w-36 overflow-hidden rounded-xl neon-border-gold shadow-glow-gold"
                >
                  <Image
                    src={IMAGE_MAP[secondaryLeft.key]}
                    alt={secondaryLeft.alt}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </motion.div>
              )}

              {secondaryRight && (
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                  }
                  className="absolute -bottom-5 -right-6 z-10 h-44 w-36 overflow-hidden rounded-xl neon-border shadow-glow-sm"
                >
                  <Image
                    src={IMAGE_MAP[secondaryRight.key]}
                    alt={secondaryRight.alt}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </motion.div>
              )}

              <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Низ: три карточки горизонтально */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-6"
        >
          {MARY_FOX.highlights.map((item) => {
            const Icon = HIGHLIGHT_ICONS[item.id];
            return (
              <div
                key={item.id}
                className="neon-border flex flex-col rounded-xl bg-black/40 p-5 backdrop-blur-sm md:p-6"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-accent-gold/40 bg-black/50">
                  <Icon className="h-4 w-4 text-accent-gold" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-gold">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary-foreground md:text-base">
                  {item.text}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
