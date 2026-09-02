"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
}

const sizes = {
  sm: 32,
  md: 48,
  lg: 72,
  xl: 120,
};

export function Logo({ size = "md", className, animated = false }: LogoProps) {
  const dimension = sizes[size];

  const image = (
    <Image
      src="/assets/logo.png"
      alt="Mary Fox Tattoo Studio"
      width={dimension}
      height={dimension}
      className={cn("object-contain", className)}
      priority
    />
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {image}
      </motion.div>
    );
  }

  return image;
}
