"use client";

import {
  Pen,
  Layers,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Section, FadeIn } from "@/components/shared/section";
import { AnimatedTitle } from "@/components/shared/animated-title";
import { services } from "@/mock/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Pen,
  Layers,
  MessageCircle,
  Sparkles,
};

export function ServicesSection() {
  return (
    <Section id="services" className="bg-card/50">
      <FadeIn>
        <AnimatedTitle
          title="Наши услуги"
          subtitle="Полный спектр услуг премиального уровня"
          align="center"
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon] || Pen;
          return (
            <FadeIn key={service.id} delay={index * 0.1}>
              <div className="p-8 rounded-2xl bg-background border border-border hover:shadow-glow-sm transition-all duration-500 h-full">
                <div className="mb-6 h-12 w-12 rounded-xl bg-card flex items-center justify-center">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-3">{service.title}</h3>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
