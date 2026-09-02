"use client";

import { Section, FadeIn } from "@/components/shared/section";
import { AnimatedTitle } from "@/components/shared/animated-title";
import { Gallery } from "@/components/shared/gallery";
import { gallery } from "@/mock/data";

export function WorksSection() {
  return (
    <Section id="works">
      <FadeIn>
        <AnimatedTitle
          title="Наши работы"
          subtitle="Каждая татуировка — уникальное произведение искусства"
        />
      </FadeIn>
      <Gallery items={gallery} columns={3} />
    </Section>
  );
}
