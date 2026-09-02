"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ASSETS } from "@/constants/site";
import type { PHOTO_SECTIONS } from "@/constants/content";
import { cn } from "@/lib/utils";

type ImageKey = (typeof PHOTO_SECTIONS)[number]["imageKey"];

const IMAGE_MAP: Record<ImageKey, string> = {
  maryMachine: ASSETS.maryMachine,
  course: ASSETS.course,
};

interface PhotoSectionProps {
  id: string;
  label: string;
  title: string;
  text: string;
  imageKey: ImageKey;
  align: "left" | "right";
  index: number;
}

export function PhotoSection({
  id,
  label,
  title,
  text,
  imageKey,
  align,
  index,
}: PhotoSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    align === "left" ? [40, 0, -20] : [-40, 0, 20]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  const imageFirst = align === "left";

  return (
    <section
      id={id}
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-32"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-30",
          index % 2 === 0 ? "bg-gradient-radial-pink" : "bg-gradient-radial-gold"
        )}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
            !imageFirst && "lg:[&>*:first-child]:order-2"
          )}
        >
          <motion.div style={{ y: imageY, opacity }} className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-2xl neon-border lg:mx-0">
              <Image
                src={IMAGE_MAP[imageKey]}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 512px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block rounded-full border border-accent-gold/30 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-gold backdrop-blur-sm">
                  {label}
                </span>
              </div>
            </div>
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-2xl" />
          </motion.div>

          <motion.div style={{ x: textX, opacity }} className="text-center lg:text-left">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">{label}</p>
            <h2 className="font-display mb-6 text-4xl leading-none text-gradient-euphoria md:text-6xl lg:text-7xl">
              {title}
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-secondary-foreground lg:mx-0">
              {text}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
