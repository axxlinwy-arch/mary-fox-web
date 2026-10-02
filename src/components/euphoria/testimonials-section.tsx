"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_INTRO } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { CtaButton } from "@/components/euphoria/cta-button";

const pad = (n: number) => String(n).padStart(2, "0");

export function TestimonialsSection() {
  const total = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const [overflows, setOverflows] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const readMoreRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + total) % total);
  }, [total]);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-shown");
          observer.disconnect();
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target as HTMLElement | null;
      if (dialogOpen) return;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      const root = sectionRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") goPrev();
      else goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, dialogOpen]);

  useLayoutEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;

    const measure = () => {
      setOverflows(quote.scrollHeight > quote.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(quote);
    document.fonts?.ready.then(() => {
      if (quote.isConnected) measure();
    });
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    if (!dialogOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialogOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      readMoreRef.current?.focus();
    };
  }, [dialogOpen]);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const review = TESTIMONIALS[index];

  return (
    <section
      ref={sectionRef}
      className="cascade relative isolate flex scroll-mt-20 flex-col justify-center overflow-hidden bg-[#090709] px-5 pb-[9rem] pt-[7.5rem] md:min-h-[clamp(720px,48vw,900px)] md:px-0 md:py-16"
    >
      <picture className="reviews-picture pointer-events-none absolute inset-0 -z-20">
        <source media="(max-width: 767px)" srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
        <source media="(min-width: 768px)" srcSet={ASSETS.fonzmei} />
        <img src={ASSETS.fonzmei} alt="" className="reviews-fon" />
      </picture>
      <div
        aria-hidden
        className="reviews-fon-mob reviews-fon-mob--top"
        style={{ backgroundImage: `url(${ASSETS.fonzmeimob})` }}
      />
      <div
        aria-hidden
        className="reviews-fon-mob reviews-fon-mob--bottom"
        style={{ backgroundImage: `url(${ASSETS.fonzmeimob})` }}
      />

      <div className="relative z-10 flex w-full flex-col items-center">
        <header className="relative mx-auto mb-9 max-w-xl text-center md:mb-10">
          <p
            className="cascade-item mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]"
            style={{ animationDelay: "0.12s" }}
          >
            <span className="h-px w-8 bg-accent-yellow/40" />
            {TESTIMONIALS_INTRO.label}
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
          <h2
            className="cascade-item font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]"
            style={{ animationDelay: "0.24s" }}
          >
            {TESTIMONIALS_INTRO.titleLine1}
            <br />
            <span className="text-gradient-euphoria">{TESTIMONIALS_INTRO.titleLine2}</span>
            <br />
            {TESTIMONIALS_INTRO.titleLine3}
          </h2>
          <p
            className="reviews-lead cascade-item mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-[15px]"
            style={{ animationDelay: "0.36s" }}
          >
            {TESTIMONIALS_INTRO.text}
          </p>
        </header>

        <div className="reviews-orbit">
          <div aria-hidden className="reviews-haze" />
          <div aria-hidden className="reviews-ring reviews-ring--outer" />
          <div aria-hidden className="reviews-ring reviews-ring--main" />
          <div
            className="reviews-copy text-center"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div key={index} className="review-enter">
              <p className="reviews-name font-serif text-[15px] text-foreground">{review.name}</p>
              <p className="mt-[0.4rem] text-[12px] tracking-[0.2em] text-[#f5b51b] md:mt-1" aria-label="Оценка 5 из 5">
                ★★★★★
              </p>
              <blockquote
                ref={quoteRef}
                className="review-lines is-clamped mt-5 font-serif text-[15px] text-foreground md:mt-3 md:text-[clamp(0.9375rem,1vw,1rem)]"
              >
                {review.text}
              </blockquote>
              <div className="mt-4 min-h-[13px] md:mt-2">
                {overflows ? (
                  <button
                    ref={readMoreRef}
                    type="button"
                    onClick={() => setDialogOpen(true)}
                    className="review-read-more font-sans"
                  >
                    Читать полностью
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div
          className="cascade-item relative z-30 mt-6 flex items-center justify-center gap-6"
          style={{ animationDelay: "0.6s" }}
        >
          <button type="button" onClick={goPrev} aria-label="Предыдущий отзыв" className="review-arrow">
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <span className="font-serif text-[13px] tracking-[0.2em] text-[hsl(var(--muted-foreground))]" aria-live="polite">
            {pad(index + 1)} / {pad(total)}
          </span>
          <button type="button" onClick={goNext} aria-label="Следующий отзыв" className="review-arrow">
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="relative z-30 mt-8 flex flex-col items-center text-center md:mt-6">
          <p
            className="cascade-item max-w-md text-[14px] leading-relaxed text-foreground/75"
            style={{ animationDelay: "0.72s" }}
          >
            Подарочный заживляющий набор в конце сеанса
          </p>
          <div className="cascade-item mt-6" style={{ animationDelay: "0.84s" }}>
            <CtaButton href={CONTACT.maryInstagram} className="h-12 px-7">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
                Записаться к Mary
              </span>
            </CtaButton>
          </div>
        </div>
      </div>
      {dialogOpen && typeof document !== "undefined"
        ? createPortal(
            <div className="review-read" onClick={() => setDialogOpen(false)}>
              <button
                ref={closeRef}
                type="button"
                className="review-arrow review-read-close"
                aria-label="Закрыть"
                onClick={() => setDialogOpen(false)}
              >
                ×
              </button>
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`Отзыв ${review.name}`}
                className="review-read-column scrollbar-hide"
                onClick={(event) => event.stopPropagation()}
              >
                <p className="text-center font-serif text-[18px] text-foreground">{review.name}</p>
                <p className="mt-1 text-center text-[12px] tracking-[0.2em] text-[#f5b51b]" aria-label="Оценка 5 из 5">
                  ★★★★★
                </p>
                <div aria-hidden className="review-dialog-rule" />
                <p className="review-read-text">{review.text}</p>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
