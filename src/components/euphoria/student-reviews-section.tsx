"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { EDUCATION, STUDENT_REVIEWS } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { cn } from "@/lib/utils";

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (lg.matches) setCount(3);
      else if (md.matches) setCount(2);
      else setCount(1);
    };

    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);

  return count;
}

function ReviewCard({ name, text }: { name: string; text: string }) {
  const [expanded, setExpanded] = useState(false);
  const long = text.length > 140;

  return (
    <article className="flex h-full flex-col rounded-xl border border-accent/20 bg-black/50 p-4 neon-border sm:p-5">
      <p className="text-left text-sm font-medium tracking-wide text-foreground">
        {name}
      </p>
      <div className="mt-1.5 flex gap-0.5" aria-label="5 из 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-accent-gold text-accent-gold"
            strokeWidth={0}
          />
        ))}
      </div>
      <p
        className={cn(
          "mt-3 text-left text-sm leading-relaxed text-white/75",
          !expanded && long && "line-clamp-4"
        )}
      >
        {text}
      </p>
      {long ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-gold"
        >
          {expanded ? "Свернуть" : "Читать далее"}
        </button>
      ) : null}
    </article>
  );
}

export function StudentReviewsSection() {
  const prefersReducedMotion = useReducedMotion();
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const reviews = STUDENT_REVIEWS.reviews;
  const total = reviews.length;
  const maxIndex = Math.max(0, total - visible);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  return (
    <section
      id={STUDENT_REVIEWS.id}
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-gold opacity-20" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-8 text-center md:mb-10"
        >
          <h2 className="font-display text-4xl leading-none text-gradient-euphoria md:text-5xl">
            {STUDENT_REVIEWS.title}
          </h2>
        </motion.header>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${index * (100 / visible)}%)`,
              }}
            >
              {reviews.map((item) => (
                <div
                  key={item.name}
                  className="shrink-0 px-1.5 sm:px-2"
                  style={{ width: `${100 / visible}%` }}
                >
                  <ReviewCard name={item.name} text={item.text} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Предыдущие отзывы"
            className="absolute -left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/30 bg-black/75 text-accent backdrop-blur-sm transition-colors hover:border-accent/60 sm:-left-3 md:-left-5"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Следующие отзывы"
            className="absolute -right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/30 bg-black/75 text-accent backdrop-blur-sm transition-colors hover:border-accent/60 sm:-right-3 md:-right-5"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Отзывы ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-5 bg-accent-gold" : "w-1.5 bg-white/25 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <motion.figure
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mt-10 aspect-[15/11] w-full overflow-hidden rounded-xl neon-border sm:mt-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.team}
            alt="Команда и ученики EUPHORIA"
            className="absolute left-0 w-full max-w-none"
            style={{ height: "181.818%", top: "-63.636%" }}
          />
        </motion.figure>

        <div className="mt-10 flex flex-col items-center text-center md:mt-12">
          <p className="text-sm uppercase tracking-[0.18em] text-white/80 sm:text-[15px] sm:tracking-[0.22em]">
            <span className="text-gradient-euphoria">{EDUCATION.ctaNote}</span>
          </p>
          <a
            href={CONTACT.maryInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-lg border-2 border-accent-gold/80 bg-black/65 px-8 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-black/80"
            style={{
              boxShadow:
                "0 0 20px rgba(253,184,19,0.45), 0 0 40px rgba(253,184,19,0.2), inset 0 0 10px rgba(253,184,19,0.06)",
            }}
          >
            <span className="text-sm font-black uppercase leading-none tracking-[0.12em] text-accent-gold sm:text-base">
              {EDUCATION.cta}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}