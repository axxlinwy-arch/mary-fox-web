"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const pad = (value: number) => String(value).padStart(2, "0");

export function SlideCounter({ index, total }: { index: number; total: number }) {
  return (
    <span className="font-serif text-[0.8125rem] tracking-[0.2em] text-[hsl(var(--muted-foreground))]" aria-live="polite">
      {pad(index + 1)} / {pad(total)}
    </span>
  );
}

export function CarouselArrows({
  onPrev,
  onNext,
  prevLabel = "Предыдущий слайд",
  nextLabel = "Следующий слайд",
  children,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className="review-arrow"
        style={{ width: "2.75rem", height: "2.75rem" }}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      {children}
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="review-arrow"
        style={{ width: "2.75rem", height: "2.75rem" }}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
