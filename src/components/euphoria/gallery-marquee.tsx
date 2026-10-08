"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue } from "framer-motion";
import { X } from "lucide-react";
import { GALLERY } from "@/constants/content";
import { ASSETS } from "@/constants/site";
import { cn } from "@/lib/utils";

const IMAGE_MAP = {
  tattoo1: ASSETS.tattoo1,
  tattoo2: ASSETS.tattoo2,
  tattoo3: ASSETS.tattoo3,
  tattoo4: ASSETS.tattoo4,
  tattoo5: ASSETS.tattoo5,
  tattoo6: ASSETS.tattoo6,
  tattoo7: ASSETS.tattoo7,
  tattoo8: ASSETS.tattoo8,
  tattoo9: ASSETS.tattoo9,
  tattoo10: ASSETS.tattoo10,
} as const;

type GalleryImageKey = keyof typeof IMAGE_MAP;

const AUTO_SCROLL_PX_PER_SEC = 38;
const DRAG_CLICK_THRESHOLD = 8;
const DRAG_RESUME_MS = 350;

function wrapOffset(value: number, loopWidth: number) {
  if (loopWidth <= 0) return value;
  let next = value % loopWidth;
  if (next > 0) next -= loopWidth;
  return next;
}

function GalleryCard({
  src,
  alt,
  eager,
  onOpen,
  dragGuardRef,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  onOpen: () => void;
  dragGuardRef: MutableRefObject<boolean>;
}) {
  return (
    <button
      type="button"
      aria-label={`Открыть: ${alt}`}
      onClick={() => {
        if (dragGuardRef.current) return;
        onOpen();
      }}
      className="gallery-marquee-card hero-space-card-face group relative h-56 w-40 shrink-0 cursor-pointer overflow-hidden rounded-[0.9rem] transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 active:scale-[0.98] md:h-72 md:w-52"
      style={{ touchAction: "pan-x" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </button>
  );
}

function GalleryLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex animate-[fadeIn_0.2s_ease-out] items-center justify-center bg-black/78 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div
        className="hero-space-card-face relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[0.9rem]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function MarqueeRow({
  direction,
  paused,
  inView,
  onOpen,
}: {
  direction: 1 | -1;
  paused: boolean;
  inView: boolean;
  onOpen: (key: GalleryImageKey) => void;
}) {
  const x = useMotionValue(0);
  const loopWidthRef = useRef(0);
  const loopSetRef = useRef<HTMLDivElement>(null);
  const dragGuardRef = useRef(false);
  const dragStartXRef = useRef(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const measureLoop = useCallback(() => {
    if (loopSetRef.current) {
      loopWidthRef.current = loopSetRef.current.offsetWidth;
      x.set(wrapOffset(x.get(), loopWidthRef.current));
    }
  }, [x]);

  useEffect(() => {
    measureLoop();
    window.addEventListener("resize", measureLoop);
    return () => window.removeEventListener("resize", measureLoop);
  }, [measureLoop]);

  useEffect(() => {
    if (!inView || !autoPlay || isDragging || paused) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      const loop = loopWidthRef.current;
      if (loop > 0) {
        x.set(
          wrapOffset(
            x.get() + (direction * AUTO_SCROLL_PX_PER_SEC * delta) / 1000,
            loop
          )
        );
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoPlay, direction, inView, isDragging, paused, x]);

  const resumeAutoPlay = useCallback(() => {
    window.setTimeout(() => setAutoPlay(true), DRAG_RESUME_MS);
  }, []);

  const handleDragStart = () => {
    dragGuardRef.current = false;
    dragStartXRef.current = x.get();
    setAutoPlay(false);
    setIsDragging(true);
  };

  const handleDrag = () => {
    if (Math.abs(x.get() - dragStartXRef.current) > DRAG_CLICK_THRESHOLD) {
      dragGuardRef.current = true;
    }
    x.set(wrapOffset(x.get(), loopWidthRef.current));
  };

  const handleDragEnd = () => {
    x.set(wrapOffset(x.get(), loopWidthRef.current));
    setIsDragging(false);
    if (!paused) resumeAutoPlay();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragGuardRef.current = false;
  };

  const renderSet = (keyPrefix: string, eager: boolean) =>
    GALLERY.map((item, index) => (
      <GalleryCard
        key={`${keyPrefix}-${item.imageKey}`}
        src={IMAGE_MAP[item.imageKey]}
        alt={item.alt}
        eager={eager && index < 4}
        dragGuardRef={dragGuardRef}
        onOpen={() => onOpen(item.imageKey)}
      />
    ));

  return (
    <motion.div
      className="flex w-max cursor-grab gap-4 active:cursor-grabbing md:gap-6"
      style={{
        x,
        willChange: isDragging ? "transform" : "auto",
        touchAction: "pan-x",
      }}
      drag="x"
      dragElastic={0.12}
      dragMomentum
      dragTransition={{ power: 0.28, timeConstant: 220 }}
      onPointerDown={handlePointerDown}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div ref={loopSetRef} className="flex shrink-0 gap-4 md:gap-6">
        {renderSet("a", true)}
      </div>
      <div className="flex shrink-0 gap-4 md:gap-6" aria-hidden>
        {renderSet("b", false)}
      </div>
    </motion.div>
  );
}

export function GalleryMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);
  const [selectedKey, setSelectedKey] = useState<GalleryImageKey | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const visibility = new IntersectionObserver(
      (entries) => {
        setInView(entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0 }
    );
    visibility.observe(root);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => visibility.disconnect();
    }

    const entrance = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setEntered(true);
        entrance.disconnect();
      },
      { threshold: 0.15 }
    );
    entrance.observe(root);
    return () => {
      visibility.disconnect();
      entrance.disconnect();
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedKey === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedKey(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedKey]);

  const selectedItem = GALLERY.find((item) => item.imageKey === selectedKey);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={cn(
        "gallery-marquee relative scroll-mt-20 overflow-hidden pb-12 pt-6 md:pb-14 md:pt-0",
        entered && "is-shown"
      )}
    >
      <div className="relative z-10 mx-auto mb-8 max-w-7xl overflow-visible px-6 text-center md:px-8">
        <p className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]">
          <span className="h-px w-8 bg-accent-yellow/40" />
          By Mary Fox
          <span className="h-px w-8 bg-accent-yellow/40" />
        </p>
        <h2 className="overflow-visible whitespace-nowrap font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight sm:text-4xl lg:text-[2.6rem]">
          <span className="inline-block overflow-visible text-gradient-euphoria-50">
            Живое искусство
          </span>
        </h2>
      </div>

      <div className="relative z-10 select-none">
        <div className="pointer-events-none absolute -top-12 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-[#090709] to-transparent md:-top-16 md:w-20" />
        <div className="pointer-events-none absolute -top-12 bottom-0 right-0 z-10 w-16 bg-gradient-to-l from-[#090709] to-transparent md:-top-16 md:w-20" />

        <div className="gallery-row-in">
          <MarqueeRow
            direction={-1}
            paused={selectedKey !== null}
            inView={inView}
            onOpen={setSelectedKey}
          />
        </div>
        <div className="gallery-row-in gallery-row-in--from-left mt-6 md:mt-8">
          <MarqueeRow
            direction={1}
            paused={selectedKey !== null}
            inView={inView}
            onOpen={setSelectedKey}
          />
        </div>
      </div>

      {mounted &&
        selectedKey &&
        selectedItem &&
        createPortal(
          <GalleryLightbox
            src={IMAGE_MAP[selectedKey]}
            alt={selectedItem.alt}
            onClose={() => setSelectedKey(null)}
          />,
          document.body
        )}
    </section>
  );
}
