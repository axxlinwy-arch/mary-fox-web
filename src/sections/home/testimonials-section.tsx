"use client";

import { Section, FadeIn } from "@/components/shared/section";
import { AnimatedTitle } from "@/components/shared/animated-title";
import { Testimonials } from "@/components/shared/testimonials";
import { testimonials } from "@/mock/data";

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="bg-card/50">
      <FadeIn>
        <AnimatedTitle
          title="Отзывы"
          subtitle="Что говорят наши клиенты и ученики"
          align="center"
        />
      </FadeIn>
      <Testimonials items={testimonials} />
    </Section>
  );
}
