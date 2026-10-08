"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STUDIO } from "@/constants/content";
import { ASSETS } from "@/constants/site";
import { cn } from "@/lib/utils";

const STUDIO_IMAGES = {
  studio: ASSETS.studio,
  studia1: ASSETS.studia1,
  studia2: ASSETS.studia2,
  studia3: ASSETS.studia3,
  studia4: ASSETS.studia4,
  studia5: ASSETS.studia5,
  studia7: ASSETS.studia7,
  studia8: ASSETS.studia8,
} as const;

type StudioPhotoKey = keyof typeof STUDIO_IMAGES;
type StudioPhoto = (typeof STUDIO.photos)[number];

const COLLAGE_SLOTS: ReadonlyArray<{
  className: string;
  rotate: number;
  fromRotate: number;
  rx: number;
  ry: number;
  origin: string;
  fromX: number;
  fromY: number;
  delay: string;
  sizes: string;
  glint: number;
}> = [
  {
    className: "left-[calc(50%-25rem)] top-[calc(50%-25.2rem)] z-10 h-[15.2rem] w-[11rem]",
    rotate: -15,
    fromRotate: -6,
    rx: -15,
    ry: 25,
    origin: "center",
    fromX: 72,
    fromY: 46,
    delay: "0ms",
    sizes: "450px",
    glint: 128,
  },
  {
    className: "left-[calc(50%-22.6rem)] top-[calc(50%+13.2rem)] z-10 h-[11.5rem] w-[13.4rem]",
    rotate: 35,
    fromRotate: 4,
    rx: 35,
    ry: 0,
    origin: "center",
    fromX: 36,
    fromY: 58,
    delay: "70ms",
    sizes: "450px",
    glint: 210,
  },
  {
    className: "left-[calc(50%-37.6rem)] top-[calc(50%-3.6rem)] z-10 h-[19.2rem] w-[14.2rem]",
    rotate: -6,
    fromRotate: -2,
    rx: 1,
    ry: 25,
    origin: "center",
    fromX: 64,
    fromY: 0,
    delay: "140ms",
    sizes: "450px",
    glint: 305,
  },
  {
    className: "left-[calc(50%-22.8rem)] top-[calc(50%-7rem)] z-10 h-[9.4rem] w-[8.8rem]",
    rotate: 0,
    fromRotate: -5,
    rx: 0,
    ry: 40,
    origin: "center",
    fromX: 58,
    fromY: -46,
    delay: "210ms",
    sizes: "200px",
    glint: 48,
  },
  {
    className: "left-[calc(50%+17.4rem)] top-[calc(50%-3.4rem)] z-10 h-[19.2rem] w-[13.4rem]",
    rotate: 17,
    fromRotate: 5,
    rx: 5,
    ry: -20,
    origin: "center",
    fromX: -62,
    fromY: 48,
    delay: "280ms",
    sizes: "190px",
    glint: 168,
  },
  {
    className: "left-[calc(50%+14.5rem)] top-[calc(50%-23.6rem)] z-10 h-[14.6rem] w-[10.2rem]",
    rotate: -8,
    fromRotate: 2,
    rx: 1,
    ry: -15,
    origin: "center",
    fromX: -56,
    fromY: 4,
    delay: "350ms",
    sizes: "190px",
    glint: 242,
  },
  {
    className: "left-[calc(50%+1.8rem)] top-[calc(50%+16.6rem)] z-10 h-[8.2rem] w-[13rem]",
    rotate: -9,
    fromRotate: -3,
    rx: 20,
    ry: -6,
    origin: "center",
    fromX: -54,
    fromY: -44,
    delay: "420ms",
    sizes: "200px",
    glint: 78,
  },
];

function getSlotPhotoIndex(slotIdx: number, activeIndex: number) {
  const homeIndex = slotIdx + 1;
  if (activeIndex === homeIndex) return 0;
  return homeIndex;
}

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function StudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photos = STUDIO.photos;
  const [activeIndex, setActiveIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [viewport, setViewport] = useState<"pending" | "mobile" | "desktop">("pending");

  const selectPhoto = useCallback((index: number) => {
    setActiveIndex((current) => (index === current ? current : index));
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setViewport(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || viewport === "pending") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    let frame = 0;
    const reveal = () => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setShown(true));
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        reveal();
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [viewport]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (
        !sectionRef.current?.contains(document.activeElement) &&
        !sectionRef.current?.matches(":hover")
      ) {
        return;
      }
      event.preventDefault();
      if (event.key === "ArrowLeft") goPrev();
      else goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  return (
    <section
      id={STUDIO.id}
      ref={sectionRef}
      className={cn(
        "studio-collage relative scroll-mt-20 overflow-x-clip bg-[#090709] py-20 md:py-28",
        shown && "is-shown"
      )}
    >
      <div className="relative mx-auto w-full px-6 md:px-8">
        <header className="mx-auto max-w-xl text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]">
            <span className="h-px w-8 bg-accent-yellow/40" />
            {STUDIO.label}
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
          <h2 className="font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
            {STUDIO.titleLine1}
            <br />
            <span className="text-gradient-euphoria">{STUDIO.titleLine2}</span>
            <br />
            {STUDIO.titleLine3}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-[15px]">
            {STUDIO.text}
          </p>
        </header>

        <div className="relative mt-0 min-h-[24rem] lg:min-h-0">
          {viewport === "mobile" ? (
            <MobileCollage
              photos={photos}
              activeIndex={activeIndex}
              onNext={goNext}
              onPrev={goPrev}
            />
          ) : null}
          {viewport === "desktop" ? (
            <DesktopCollage
              photos={photos}
              activeIndex={activeIndex}
              onSelect={selectPhoto}
              onNext={goNext}
              onPrev={goPrev}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function StudioImage({
  photo,
  alt,
  sizes,
}: {
  photo: StudioPhoto;
  alt: string;
  sizes: string;
}) {
  return (
    <Image
      src={STUDIO_IMAGES[photo.key as StudioPhotoKey]}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover"
    />
  );
}

function StudioBurst({ mobile = false }: { mobile?: boolean }) {
  return <div aria-hidden className={mobile ? "studio-burst studio-burst--mobile" : "studio-burst"} />;
}

function StudioNav({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className: string;
}) {
  const prev = direction === "prev";
  const Icon = prev ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={prev ? "Предыдущее фото" : "Следующее фото"}
      className={cn(
        "absolute top-1/2 z-30 flex -translate-y-1/2 items-center justify-center rounded-full border border-[#F1ECE5]/16 bg-[#090709]/72 text-[#F1ECE5]/80 transition-colors hover:border-[#F1ECE5]/32 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
        className
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}

function DesktopCollage({
  photos,
  activeIndex,
  onSelect,
  onNext,
  onPrev,
}: {
  photos: readonly StudioPhoto[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const activePhoto = photos[activeIndex];

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    swipe.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  return (
    <div aria-label="Галерея студии">
      <div
        className="relative mx-auto -mt-10 h-[50rem] w-full max-w-[72rem] touch-pan-y lg:-mt-12"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <StudioBurst />
        {COLLAGE_SLOTS.map((slot, slotIdx) => {
          const photoIndex = getSlotPhotoIndex(slotIdx, activeIndex);
          const photo = photos[photoIndex];
          if (!photo) return null;
          const style = {
            "--ox": `${slot.fromX}px`,
            "--oy": `${slot.fromY}px`,
            "--rot": `${slot.rotate}deg`,
            "--rot-from": `${slot.fromRotate}deg`,
            "--rx": `${slot.rx}deg`,
            "--ry": `${slot.ry}deg`,
            "--origin": slot.origin,
            "--tilt": `${slot.rotate > 0 ? -1.5 : 1.5}deg`,
            "--d": slot.delay,
            "--glint": `${slot.glint}deg`,
          } as CSSProperties;

          return (
            <div key={slotIdx} className={cn("studio-sat absolute", slot.className)} style={style}>
              <button
                type="button"
                aria-label={`Показать фото ${photoIndex + 1}`}
                onClick={() => onSelect(photoIndex)}
                className="studio-card relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-[#110C11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                <span key={photo.key} className="studio-photo-in absolute inset-0">
                  <StudioImage photo={photo} alt="" sizes={slot.sizes} />
                </span>
              </button>
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="pointer-events-auto relative w-[min(42%,22rem)]">
            <StudioNav direction="prev" onClick={onPrev} className="right-[calc(100%+0.85rem)] h-9 w-9" />
            <StudioNav direction="next" onClick={onNext} className="left-[calc(100%+0.85rem)] h-9 w-9" />
            <div aria-hidden className="studio-main-glow" />
            <div
              key={activePhoto.key}
              className="studio-card studio-card--main studio-photo-in relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#110C11]"
              style={{ "--glint": "162deg" } as CSSProperties}
            >
              <StudioImage
                photo={activePhoto}
                alt={activePhoto.alt}
                sizes="(min-width: 1024px) 22rem, 22rem"
              />
            </div>
            <p className="pointer-events-none absolute left-1/2 top-[calc(100%+0.7rem)] z-30 -translate-x-1/2 whitespace-nowrap font-serif text-sm tracking-[0.18em] text-white/70">
              {padIndex(activeIndex)}
              <span className="text-white/35"> / {padIndex(photos.length - 1)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileCollage({
  photos,
  activeIndex,
  onNext,
  onPrev,
}: {
  photos: readonly StudioPhoto[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
}) {
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const main = photos[activeIndex];

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    swipe.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-md pb-10" aria-label="Галерея студии">
      <div
        className="relative aspect-[4/5] w-full touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <StudioBurst mobile />
        <StudioNav direction="prev" onClick={onPrev} className="left-0 h-8 w-8" />
        <StudioNav direction="next" onClick={onNext} className="right-0 h-8 w-8" />
        <div aria-hidden className="studio-main-glow studio-main-glow--mobile" />
        <div
          key={main.key}
          className="studio-card studio-card--main studio-photo-in absolute inset-x-10 inset-y-2 z-20 overflow-hidden rounded-2xl bg-[#110C11]"
          style={{ "--glint": "158deg" } as CSSProperties}
        >
          <StudioImage photo={main} alt={main.alt} sizes="(max-width: 1023px) 78vw, 22rem" />
        </div>
        <p className="pointer-events-none absolute inset-x-10 top-[calc(100%+0.7rem)] z-30 text-center font-serif text-sm tracking-[0.18em] text-white/70">
          {padIndex(activeIndex)}
          <span className="text-white/35"> / {padIndex(photos.length - 1)}</span>
        </p>
      </div>
    </div>
  );
}
