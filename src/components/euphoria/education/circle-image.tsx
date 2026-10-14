"use client";

import { motion, type Transition } from "framer-motion";
import { Lock } from "lucide-react";

const lockEase = [0.22, 1, 0.36, 1] as const;

type CircleImageProps = {
  src: string;
  alt: string;
  glow: number;
  ring: number;
  opacity: number;
  filter: string;
  transition: Transition;
  lock?: boolean;
  lockOpacity?: number;
  lockTransition?: Transition;
};

export function CircleImage({
  src,
  alt,
  glow,
  ring,
  opacity,
  filter,
  transition,
  lock = false,
  lockOpacity = 0,
  lockTransition = { duration: 0.45, ease: lockEase },
}: CircleImageProps) {
  const instant =
    typeof transition === "object" &&
    transition !== null &&
    "duration" in transition &&
    transition.duration === 0;
  const filterTransition = instant ? { duration: 0 } : { duration: 0.45, ease: lockEase };

  return (
    <div className="relative h-full w-full">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[165%] w-[165%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,27,131,0.5)_0%,rgba(196,20,98,0.22)_38%,transparent_70%)]"
        animate={{ opacity: glow }}
        transition={transition}
      />
      <motion.div
        aria-hidden
        className="edu-circle-ring"
        animate={{ opacity: ring }}
        transition={transition}
      />
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-full"
        animate={{ opacity, filter }}
        transition={{ opacity: transition, filter: filterTransition }}
      >
        <img src={src} alt={alt} draggable={false} className="h-full w-full object-cover" />
      </motion.div>
      {lock ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] grid place-items-center"
          animate={{ opacity: lockOpacity }}
          transition={lockTransition}
        >
          <Lock className="h-7 w-7 text-accent-gold" strokeWidth={1.5} />
        </motion.div>
      ) : null}
    </div>
  );
}
