"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { STUDENT_REVIEWS } from "@/constants/content";
import { Reveal } from "@/components/euphoria/education/reveal";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export function StudentReviews() {
  const reduced = useReducedMotion() === true;
  const reviews = STUDENT_REVIEWS.reviews;
  const total = reviews.length;
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  return (
    <div id={STUDENT_REVIEWS.id} className="scroll-mt-20 mx-auto mt-24 max-w-5xl text-center lg:mt-36">
      <header>
        <Reveal>
          <p className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]">
            <span className="h-px w-8 bg-accent-yellow/40" />
            Выпускники
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h2 className="font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight sm:text-4xl lg:text-[2.6rem]">
            <span className="text-gradient-euphoria">{STUDENT_REVIEWS.title}</span>
          </h2>
        </Reveal>
      </header>

      <Reveal className="relative mx-auto mt-14 max-w-[760px] lg:mt-16" delay={0.08}>
        <span
          aria-hidden
          className="pointer-events-none absolute -left-1 -top-12 select-none font-serif text-[7.5rem] leading-none text-accent-gold opacity-[0.15] sm:-top-16 sm:text-[9rem]"
        >
          «
        </span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={review.name}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reduced ? 0 : 0.45, ease }}
          >
            <blockquote className="relative font-serif text-2xl italic leading-snug text-foreground/90 sm:text-[2rem] sm:leading-snug">
              {review.text}
            </blockquote>
            <p className="mt-8 font-serif text-base text-foreground">{review.name}</p>
            <div className="mt-2 flex justify-center gap-0.5" aria-label="5 из 5">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star
                  key={star}
                  className="h-3.5 w-3.5 fill-accent-gold text-accent-gold"
                  strokeWidth={0}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Reveal>

      <Reveal className="mt-8" delay={0.12}>
      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Предыдущий отзыв"
          className="review-arrow"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <span
          className="font-serif text-[13px] tracking-[0.2em] text-secondary-foreground"
          aria-live="polite"
        >
          {pad(index + 1)} / {pad(total)}
        </span>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Следующий отзыв"
          className="review-arrow"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="mx-auto mt-5 h-px w-36 bg-foreground/10" aria-hidden>
        <div
          className="h-px bg-gradient-euphoria transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
      </Reveal>
    </div>
  );
}
