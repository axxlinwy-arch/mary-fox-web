"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { COWORKING } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { cn } from "@/lib/utils";

const PHOTO_SRC = {
  studia3: ASSETS.studia3,
  studia6: ASSETS.studia6,
  studia7: ASSETS.studia7,
} as const;

type TariffId = (typeof COWORKING.tariffs)[number]["id"];

export function CoworkingSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<TariffId>("standard");
  const active = COWORKING.tariffs.find((t) => t.id === activeId) ?? COWORKING.tariffs[1];
  const showExtras = active.id === "comfort";

  return (
    <section
      id={COWORKING.id}
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-gold opacity-20" />

      <div className="relative mx-auto w-full max-w-[58rem] px-6 md:px-8">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
            {COWORKING.label}
          </p>
          <h2 className="font-display text-4xl leading-none text-gradient-euphoria md:text-6xl">
            {COWORKING.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
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
              transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
              className={cn(
                "relative overflow-hidden rounded-xl neon-border bg-black/40",
                index === 1 ? "aspect-[3/4] sm:aspect-[4/5]" : "aspect-[3/4] translate-y-3 sm:translate-y-4"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTO_SRC[photo.key]}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <div
            role="tablist"
            aria-label="Тарифы коворкинга"
            className="mx-auto grid max-w-lg grid-cols-3 gap-1 rounded-full border border-accent/25 bg-black/50 p-1"
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

          <motion.div
            key={active.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mt-6 rounded-2xl neon-border bg-black/45 p-5 sm:p-7"
          >
            <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-3xl text-gradient-euphoria sm:text-4xl">
                  {active.name}
                </p>
                <p className="mt-1 text-sm text-secondary-foreground">{active.tagline}</p>
              </div>
              {active.note ? (
                <p className="max-w-xs text-left text-[11px] uppercase leading-relaxed tracking-[0.14em] text-accent-gold sm:text-right">
                  {active.note}
                </p>
              ) : null}
            </div>

            <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-accent">
              Что входит
            </p>

            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {COWORKING.baseIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-snug text-white/80"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                    strokeWidth={2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {showExtras ? (
              <div className="mt-6 border-t border-accent-gold/20 pt-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent-gold">
                  Дополнительно в «Комфорт»
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {COWORKING.comfortExtras.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-snug text-white/80"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-gold"
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent-gold">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
              {COWORKING.sharedNote}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-6 rounded-2xl neon-border-gold bg-black/40 p-5 sm:p-7"
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-accent-gold">
            {COWORKING.subscription.title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
            {COWORKING.subscription.text}
          </p>
          <a
            href={CONTACT.instagramCoworkingHighlight}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-accent-gold transition-opacity hover:opacity-80"
          >
            {COWORKING.subscription.more}
          </a>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border-2 border-accent-gold/80 bg-black/65 px-8 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-black/80"
            style={{
              boxShadow:
                "0 0 20px rgba(253,184,19,0.45), 0 0 40px rgba(253,184,19,0.2), inset 0 0 10px rgba(253,184,19,0.06)",
            }}
          >
            <span className="text-sm font-black uppercase leading-none tracking-[0.12em] text-accent-gold sm:text-base">
              {COWORKING.cta}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
