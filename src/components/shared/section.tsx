"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  size?: "default" | "narrow" | "wide";
}

export function Section({
  children,
  className,
  id,
  containerClassName,
  size = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 lg:py-32", className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
