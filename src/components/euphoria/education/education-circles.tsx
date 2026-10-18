"use client";

import { motion, type MotionValue } from "framer-motion";
import { CircleImage } from "@/components/euphoria/education/circle-image";
import { circles } from "@/components/euphoria/education/stages";

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;
const tops = ["22%", "50%", "78%"] as const;

type EducationCirclesProps = {
  activeIndex: number;
  petrified: boolean;
  reduced: boolean;
  offsets: readonly [MotionValue<number>, MotionValue<number>, MotionValue<number>];
};

export function EducationCircles({
  activeIndex,
  petrified,
  reduced,
  offsets,
}: EducationCirclesProps) {
  const transition = reduced ? { duration: 0 } : spring;

  return (
    <div className="relative h-full w-full">
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="edu-circle-curve" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5B51B" stopOpacity="0.2" />
            <stop offset="18%" stopColor="#F5B51B" stopOpacity="0.9" />
            <stop offset="52%" stopColor="#FF7A45" stopOpacity="0.75" />
            <stop offset="84%" stopColor="#F21B83" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F21B83" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M 38 22 C 40 36 54 40 54 50 S 36 64 38 78"
          fill="none"
          stroke="url(#edu-circle-curve)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {circles.map((circle, index) => {
        const active = !petrified && index === activeIndex;
        return (
          <div
            key={circle.src}
            className="absolute z-[1] aspect-square w-[clamp(15rem,22vw,23.75rem)] -translate-x-1/2 -translate-y-1/2"
            style={{ top: tops[index], left: "38%" }}
          >
            <motion.div
              className="relative h-full w-full"
              style={
                reduced
                  ? { x: index === 1 ? "20%" : 0 }
                  : { y: offsets[index], x: index === 1 ? "20%" : 0 }
              }
              animate={{ scale: petrified ? 1 : active ? 1.06 : 0.92 }}
              transition={transition}
            >
              <CircleImage
                src={circle.src}
                alt={circle.alt}
                width={circle.width}
                height={circle.height}
                glow={petrified ? 0 : active ? 1 : 0.34}
                ring={petrified ? 0.2 : active ? 1 : 0.45}
                opacity={petrified ? 0.35 : active ? 1 : 0.5}
                filter={
                  petrified
                    ? "grayscale(1) blur(2px)"
                    : active
                      ? "grayscale(0) blur(0px)"
                      : "grayscale(0.5) blur(0px)"
                }
                transition={transition}
                lock={index === 1}
                lockOpacity={petrified ? 1 : 0}
                lockTransition={reduced ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
