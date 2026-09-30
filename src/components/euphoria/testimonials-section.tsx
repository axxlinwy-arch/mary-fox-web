"use client";

import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_INTRO } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";
import { CtaButton } from "@/components/euphoria/cta-button";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

function circularOffset(index: number, active: number, total: number) {
  let diff = index - active;
  const half = total / 2;
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
}

const ReviewCard = memo(function ReviewCard({
  name,
  text,
  active,
  expanded,
  onExpand,
}: {
  name: string;
  text: string;
  active: boolean;
  expanded: boolean;
  onExpand: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [maxH, setMaxH] = useState<number | null>(null);
  const initial = name.trim().charAt(0).toUpperCase();
  const open = active && expanded;

  useLayoutEffect(() => {
    const box = boxRef.current;
    const paragraph = textRef.current;
    if (!box || !paragraph) return;

    if (!open) {
      setMaxH(null);
      const check = () => {
        if (box.clientHeight < 8) return;
        setOverflows(paragraph.scrollHeight > box.clientHeight + 1);
      };
      check();
      const observer = new ResizeObserver(check);
      observer.observe(box);
      return () => observer.disconnect();
    }

    const from = box.clientHeight;
    const to = paragraph.scrollHeight;
    setMaxH(from);
    const frame = requestAnimationFrame(() => setMaxH(to));
    return () => cancelAnimationFrame(frame);
  }, [open, text]);

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[1.15rem] border px-5 py-6 text-left sm:px-7 sm:py-7",
        open ? "min-h-[10.5rem] lg:min-h-64" : "min-h-[10.5rem] lg:h-64",
        active
          ? "border-[rgba(235,220,225,0.12)] bg-[#171217] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_24px_80px_rgba(0,0,0,0.36)]"
          : "border-[rgba(235,220,225,0.08)] bg-[#151115] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_18px_48px_rgba(0,0,0,0.28)]"
      )}
    >
      {active ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(125deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.012) 26%, transparent 54%, rgba(196,40,96,0.045) 100%)",
          }}
        />
      ) : null}
      <div className="relative flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[13px] font-medium",
            active
              ? "border-[rgba(235,220,225,0.12)] bg-[#120E12] text-[#F1ECE5]"
              : "border-[rgba(235,220,225,0.07)] bg-[#100D10] text-[#F1ECE5]/55"
          )}
        >
          {initial}
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-sm font-medium tracking-wide",
              active ? "text-[#F1ECE5]/80" : "text-[#F1ECE5]/48"
            )}
          >
            {name}
          </p>
          <div className="mt-1 flex gap-0.5" aria-label="5 из 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  active ? "fill-accent-gold/80 text-accent-gold/80" : "fill-accent-gold/35 text-accent-gold/35"
                )}
                strokeWidth={0}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        ref={boxRef}
        className={cn(
          "mt-4 min-h-0 overflow-hidden transition-[max-height] duration-300 motion-reduce:transition-none",
          !open && "max-h-[calc(6*1.65*15px)] lg:max-h-none lg:flex-1"
        )}
        style={{
          transitionTimingFunction: EASE,
          maxHeight: maxH != null ? `${maxH}px` : undefined,
        }}
      >
        <p
          ref={textRef}
          className={cn(
            "text-[15px] leading-[1.65]",
            active ? "text-[#F1ECE5]/88" : "text-[#F1ECE5]/52"
          )}
        >{text}</p>
      </div>
      {overflows && active ? (
        <button
          type="button"
          onClick={onExpand}
          className="mt-3 shrink-0 self-start text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent/80"
        >
          {open ? "Свернуть" : "Читать далее"}
        </button>
      ) : null}
    </article>
  );
});

export function TestimonialsSection() {
  const total = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [stageH, setStageH] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const goTo = useCallback((next: number) => {
    setIndex((next + total) % total);
    setExpanded(false);
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
    const card = activeCardRef.current;
    if (!card) return;
    const update = () => {
      const next = card.offsetHeight;
      setStageH((prev) => (prev === next ? prev : next));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(card);
    return () => observer.disconnect();
  }, [index, expanded]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    swipe.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    swiped.current = true;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <section ref={sectionRef} className="cascade relative scroll-mt-20 overflow-hidden bg-[#0C090B] pb-16 pt-16 md:pb-24 md:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-x-0 bottom-0 top-[26%] lg:hidden"
          style={{
            backgroundImage: `url(${ASSETS.otzfon6})`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: "center top",
            backgroundSize: "128% auto",
            opacity: 0.28,
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 14vw, #000 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 14vw, #000 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[#0C090B]/58 lg:hidden" />
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "radial-gradient(ellipse 88% 40% at 50% 14%, rgba(122,18,62,0.075), transparent 70%), radial-gradient(ellipse 72% 34% at 62% 76%, rgba(90,16,48,0.05), transparent 72%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[78vw] max-h-[22rem] lg:hidden"
          style={{
            backgroundImage: `url(${ASSETS.otzfon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            backgroundSize: "132vw auto",
            maskImage: "linear-gradient(to bottom, #000 0%, #000 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 40%, transparent 100%)",
          }}
        />
        <Image
          src={ASSETS.otzfon}
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover object-center opacity-60 saturate-[1.35] lg:block"
        />
        <div className="absolute inset-0 hidden bg-[#0C090B]/32 lg:block" />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(12,9,11,0.5) 0%, transparent 16%), linear-gradient(to left, rgba(12,9,11,0.5) 0%, transparent 16%), linear-gradient(to top, rgba(12,9,11,0.55) 0%, transparent 26%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0C090B] to-transparent lg:h-36" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#090709] lg:h-36" />
      </div>

      <div className="relative z-10">
        <div className="relative z-10 mx-auto mb-14 max-w-3xl px-6 text-center md:mb-14 lg:mb-10 md:px-8">
          <p className="cascade-item mb-5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]" style={{ animationDelay: "0.12s" }}>
            <span className="h-px w-8 bg-accent-yellow/40" />
            {TESTIMONIALS_INTRO.label}
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
          <h2 className="cascade-item font-serif text-[1.85rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[0.92]" style={{ animationDelay: "0.24s" }}>
            {TESTIMONIALS_INTRO.titleLine1}
            <br />
            <span className="text-gradient-euphoria" style={{ lineHeight: 0.98, padding: "0.02em 0" }}>{TESTIMONIALS_INTRO.titleLine2}</span>
            <br />
            {TESTIMONIALS_INTRO.titleLine3}
          </h2>
          <p className="cascade-item mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-[15px]" style={{ animationDelay: "0.36s" }}>
            {TESTIMONIALS_INTRO.text}
          </p>
        </div>

        <div className="cascade-item relative" style={{ animationDelay: "0.48s" }}>
          <div
            className="reviews-stage relative z-[2] mx-auto w-full min-h-[9rem] touch-pan-y [--reviews-shift:96%] md:[--reviews-shift:96%] lg:min-h-[14.5rem] lg:[--reviews-shift:64%] xl:[--reviews-shift:60%]"
            style={{ height: stageH ? stageH + 36 : undefined }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onClickCapture={(event) => {
              if (!swiped.current) return;
              event.preventDefault();
              event.stopPropagation();
              swiped.current = false;
            }}
          >
            {TESTIMONIALS.map((item, i) => {
              const offset = circularOffset(i, index, total);
              const active = offset === 0;
              const near = Math.abs(offset) <= 1;
              const slide = Math.abs(offset) <= 2;
              return (
                <div
                  key={item.name}
                  ref={active ? activeCardRef : undefined}
                  className={cn(
                    "absolute left-1/2 top-3 w-[86vw] motion-reduce:transition-none md:w-[calc(100%-3rem)] lg:w-[min(31rem,44vw)] xl:w-[min(40rem,38vw)]",
                    slide && "transition-[transform,opacity] duration-500 will-change-transform",
                    !near && "pointer-events-none",
                    !active && offset > 0 && "max-lg:[mask-image:linear-gradient(90deg,transparent,#000_18%)] lg:[mask-image:linear-gradient(90deg,transparent,#000_14%)]",
                    !active && offset < 0 && "max-lg:[mask-image:linear-gradient(270deg,transparent,#000_18%)] lg:[mask-image:linear-gradient(270deg,transparent,#000_14%)]"
                  )}
                  style={{
                    transitionTimingFunction: EASE,
                    transform: `translate3d(calc(-50% + var(--reviews-shift) * ${offset}), ${active ? 0 : 16}px, 0) scale(${active ? 1 : 0.88})`,
                    opacity: active ? 1 : near ? 0.92 : 0,
                    zIndex: active ? 5 : near ? 2 : 0,
                  }}
                  onClick={() => {
                    if (!active) goTo(i);
                  }}
                >
                  {active ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-36 w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(220,20,105,0.08)_0%,transparent_70%)]"
                    />
                  ) : null}
                  <ReviewCard
                    name={item.name}
                    text={item.text}
                    active={active}
                    expanded={expanded}
                    onExpand={() => setExpanded((value) => !value)}
                  />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Предыдущие отзывы"
            className="absolute left-[calc(50%-42vw)] top-1/2 z-30 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F1ECE5]/14 bg-[#0C090B]/55 text-[#F1ECE5]/70 transition-colors hover:border-[#F1ECE5]/28 hover:text-[#F1ECE5] md:left-[calc(50%-30vw)] md:h-10 md:w-10 lg:left-[calc(50%-22vw)] xl:left-[calc(50%-19vw)]"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Следующие отзывы"
            className="absolute right-[calc(50%-42vw)] top-1/2 z-30 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F1ECE5]/14 bg-[#0C090B]/55 text-[#F1ECE5]/70 transition-colors hover:border-[#F1ECE5]/28 hover:text-[#F1ECE5] md:right-[calc(50%-30vw)] md:h-10 md:w-10 lg:right-[calc(50%-22vw)] xl:right-[calc(50%-19vw)]"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="cascade-item relative z-30 mt-4 flex justify-center gap-1.5" style={{ animationDelay: "0.6s" }}>
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Отзыв ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-accent" : "w-1.5 bg-[#F1ECE5]/35 hover:bg-[#F1ECE5]/55"
              )}
            />
          ))}
        </div>

        <div className="relative z-30 mt-10 flex flex-col items-center px-6 text-center">
          <p className="cascade-item flex max-w-sm items-center justify-center gap-3 text-center text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white" style={{ animationDelay: "0.72s" }}>
            <span className="h-px w-5 shrink-0 bg-[#F1ECE5]/25" />
            <span>Подарочный заживляющий набор в конце сеанса</span>
            <span className="h-px w-5 shrink-0 bg-[#F1ECE5]/25" />
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

    </section>
  );
}
