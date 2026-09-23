"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_INTRO } from "@/constants/content";
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

function ReviewCard({
  name,
  text,
}: {
  name: string;
  text: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const long = text.length > 140;
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <article className="review-glow-card flex h-full flex-col overflow-hidden rounded-2xl px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-gold/35 bg-[#181116] text-[13px] font-medium text-champagne"
        >
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-left text-sm font-medium tracking-wide text-[#F1ECE5]">
            {name}
          </p>
          <div className="mt-1 flex gap-0.5" aria-label="5 из 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 fill-accent-gold text-accent-gold"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>
      </div>
      <p
        className={cn(
          "mt-4 text-left text-sm leading-relaxed text-[#F1ECE5]/68",
          !expanded && long && "line-clamp-4"
        )}
      >
        {text}
      </p>
      {long ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 self-start text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent/80"
        >
          {expanded ? "Свернуть" : "Читать далее"}
        </button>
      ) : null}
    </article>
  );
}

export function TestimonialsSection() {
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
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
    <section className="relative scroll-mt-20 overflow-hidden bg-[radial-gradient(ellipse_at_12%_8%,rgba(122,18,62,0.14),transparent_50%),radial-gradient(ellipse_at_92%_88%,rgba(122,18,62,0.13),transparent_48%),#090709] pb-16 pt-10 md:pb-24 md:pt-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.snake1}
        alt=""
        className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-[min(56vw,30rem)] object-contain object-left-top mix-blend-screen opacity-80 md:w-[32rem] [mask-image:radial-gradient(ellipse_120%_120%_at_0%_0%,black_32%,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_120%_120%_at_0%_0%,black_32%,transparent_72%)]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.snake2}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-[min(56vw,30rem)] object-contain object-right-bottom mix-blend-screen opacity-80 md:w-[32rem] [mask-image:radial-gradient(ellipse_120%_120%_at_100%_100%,black_32%,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_120%_120%_at_100%_100%,black_32%,transparent_72%)]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]">
            <span className="h-px w-8 bg-accent-yellow/40" />
            {TESTIMONIALS_INTRO.label}
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
          <h2 className="font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {TESTIMONIALS_INTRO.titleLine1}
            <br />
            <span className="text-gradient-euphoria">{TESTIMONIALS_INTRO.titleLine2}</span>
            <br />
            {TESTIMONIALS_INTRO.titleLine3}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#F1ECE5]/48 sm:text-[15px]">
            {TESTIMONIALS_INTRO.text}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden py-5">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${index * (100 / visible)}%)`,
              }}
            >
              {TESTIMONIALS.map((item) => (
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

        <div className="mt-2 flex justify-center gap-1.5">
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

        <div className="mt-8 flex flex-col items-center text-center">
          <p className="inline-flex max-w-md items-center justify-center gap-2 text-sm uppercase tracking-[0.18em] text-champagne sm:text-[15px] sm:tracking-[0.22em]">
            <Sparkles className="h-4 w-4 shrink-0 text-accent-gold" strokeWidth={1.5} />
            <span>Подарочный заживляющий набор в конце сеанса</span>
          </p>

          <CtaButton href={CONTACT.maryInstagram} className="mt-6 h-12 px-7">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
              Записаться к Mary
            </span>
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
