"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  studia6: ASSETS.studia6,
  studia7: ASSETS.studia7,
  studia8: ASSETS.studia8,
} as const;

type StudioPhotoKey = keyof typeof STUDIO_IMAGES;

const ORBIT_SLOTS: ReadonlyArray<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: string;
  delay: string;
}> = [
  { top: "0%", left: "0%", rotate: "-8deg", delay: "0s" },
  { top: "0%", right: "0%", rotate: "7deg", delay: "1s" },
  { top: "32%", right: "0%", rotate: "-4deg", delay: "1.8s" },
  { bottom: "14%", right: "0%", rotate: "5deg", delay: "0.5s" },
  { bottom: "0%", right: "8%", rotate: "-6deg", delay: "2.2s" },
  { bottom: "0%", left: "0%", rotate: "7deg", delay: "1.3s" },
  { top: "42%", left: "0%", rotate: "3deg", delay: "2.6s" },
  { top: "22%", left: "0%", rotate: "-5deg", delay: "1.6s" },
];

export function StudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photos = STUDIO.photos;
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitAnimating, setOrbitAnimating] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const selectPhoto = useCallback((index: number) => {
    setActiveIndex((current) => (index === current ? current : index));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      e.preventDefault();
      setActiveIndex((i) =>
        e.key === "ArrowLeft"
          ? (i - 1 + photos.length) % photos.length
          : (i + 1) % photos.length
      );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [photos.length]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOrbitAnimating(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const activePhoto = photos[activeIndex];
  const orbitItems = photos
    .map((photo, index) => ({ photo, index }))
    .filter(({ index }) => index !== activeIndex);

  return (
    <section
      id={STUDIO.id}
      ref={sectionRef}
      className="relative scroll-mt-20 py-20 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-pink opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative order-1 mx-auto w-full max-w-[38rem] overflow-visible lg:mx-0"
          >
            <div
              className="relative overflow-visible px-[2.65rem] py-3 sm:px-[2.85rem] sm:py-4"
              aria-label="Галерея студии"
            >
              <div className="relative z-10 mx-auto w-full max-w-lg">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl neon-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={activePhoto.key}
                    src={STUDIO_IMAGES[activePhoto.key]}
                    alt={activePhoto.alt}
                    decoding="async"
                    draggable={false}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover",
                      !prefersReducedMotion && "studio-main-enter"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded-full border border-accent-gold/30 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-gold backdrop-blur-sm">
                      {STUDIO.label}
                    </span>
                  </div>
                </div>
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-2xl" />
              </div>

              {!prefersReducedMotion &&
                orbitItems.map(({ photo, index }, slotIdx) => {
                  const slot = ORBIT_SLOTS[slotIdx % ORBIT_SLOTS.length];
                  return (
                    <div
                      key={photo.key}
                      className={cn(
                        "absolute z-30 studio-orbit-float",
                        !orbitAnimating && "studio-orbit-float-paused"
                      )}
                      style={{
                        top: slot.top,
                        bottom: slot.bottom,
                        left: slot.left,
                        right: slot.right,
                        animationDelay: slot.delay,
                      }}
                    >
                      <button
                        type="button"
                        aria-label={`Показать фото ${index + 1}`}
                        onClick={() => selectPhoto(index)}
                        style={{ rotate: slot.rotate }}
                        className="relative h-[4.25rem] w-[4.25rem] cursor-pointer overflow-hidden rounded-lg neon-border bg-black/50 opacity-85 shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-[transform,opacity] duration-200 hover:scale-[1.04] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:h-[4.75rem] sm:w-[4.75rem]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={STUDIO_IMAGES[photo.key as StudioPhotoKey]}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </button>
                    </div>
                  );
                })}

              {prefersReducedMotion && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {photos.map((photo, index) => (
                    <button
                      key={photo.key}
                      type="button"
                      aria-label={`Фото ${index + 1}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      onClick={() => selectPhoto(index)}
                      className={cn(
                        "h-12 w-12 overflow-hidden rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                        index === activeIndex
                          ? "neon-border ring-1 ring-accent/40"
                          : "neon-border opacity-70 hover:opacity-100"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={STUDIO_IMAGES[photo.key]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!prefersReducedMotion && (
              <div className="mt-5 flex justify-center gap-1.5">
                {photos.map((photo, index) => (
                  <button
                    key={photo.key}
                    type="button"
                    aria-label={`Фото ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => selectPhoto(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                      index === activeIndex
                        ? "w-6 bg-accent-gold"
                        : "w-2 bg-white/25 hover:bg-white/45"
                    )}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.header
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="order-2 text-center lg:text-left"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
              {STUDIO.label}
            </p>
            <h2 className="font-display text-4xl leading-none text-gradient-euphoria md:text-6xl lg:text-7xl">
              {STUDIO.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-secondary-foreground lg:mx-0">
              {STUDIO.text}
            </p>
          </motion.header>
        </div>
      </div>
    </section>
  );
}
