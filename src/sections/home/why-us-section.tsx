"use client";

import { motion } from "framer-motion";
import { Section, FadeIn } from "@/components/shared/section";
import { AnimatedTitle } from "@/components/shared/animated-title";
import { whyChooseUs } from "@/mock/data";

export function WhyUsSection() {
  return (
    <Section id="why-us">
      <FadeIn>
        <AnimatedTitle
          title="Почему выбирают нас"
          subtitle="Стандарты, которые определяют премиальный сервис"
          align="center"
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {whyChooseUs.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center p-8 rounded-2xl bg-card hover:shadow-glow-sm transition-shadow duration-500"
          >
            <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="font-display text-xl text-accent">{index + 1}</span>
            </div>
            <h3 className="font-display text-xl mb-3">{item.title}</h3>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
