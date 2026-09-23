"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { EDUCATION, STUDENT_REVIEWS } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { CtaButton } from "@/components/euphoria/cta-button";
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
    <article className="review-glow-card flex h-full flex-col rounded-2xl px-5 py-5 sm:px-6 sm:py-6">
      <p className="text-left text-sm font-medium tracking-wide text-[#F1ECE5]">
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
          "mt-3 text-left text-sm leading-relaxed text-[#F1ECE5]/68",
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
      className="relative scroll-mt-20 overflow-hidden bg-[#090709] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute right-[-12%] top-[18%] h-96 w-80 rounded-full bg-[radial-gradient(circle,rgba(196,20,98,0.18)_0%,rgba(122,18,62,0.24)_40%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-[-8%] left-[-12%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(196,20,98,0.18)_0%,rgba(122,18,62,0.24)_40%,transparent_70%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-8 text-center md:mb-10"
        >
          <p className="mb-5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]">
            <span className="h-px w-8 bg-accent-yellow/40" />
            {STUDENT_REVIEWS.label}
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
          <h2 className="font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight sm:text-4xl lg:text-[2.6rem]">
            <span className="text-gradient-euphoria">{STUDENT_REVIEWS.title}</span>
          </h2>
        </motion.header>

        <div className="relative">
          <div className="overflow-hidden py-5">
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
            className="absolute -left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(180,35,100,0.38)] text-champagne/80 transition-colors hover:border-[rgba(180,35,100,0.55)] hover:text-champagne sm:-left-3 md:-left-5"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Следующие отзывы"
            className="absolute -right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(180,35,100,0.38)] text-champagne/80 transition-colors hover:border-[rgba(180,35,100,0.55)] hover:text-champagne sm:-right-3 md:-right-5"
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
                i === index ? "w-5 bg-accent" : "w-1.5 bg-[#F1ECE5]/25 hover:bg-[#F1ECE5]/40"
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
          <p className="inline-flex max-w-md items-center justify-center text-sm uppercase tracking-[0.18em] text-champagne sm:text-[15px] sm:tracking-[0.22em]">
            {EDUCATION.ctaNote}
          </p>
          <CtaButton href={CONTACT.maryInstagram} className="mt-5">
            <span className="text-sm font-semibold uppercase tracking-[0.08em]">
              {EDUCATION.cta}
            </span>
          </CtaButton>
        </div>
      </div>
    </section>
  );
}