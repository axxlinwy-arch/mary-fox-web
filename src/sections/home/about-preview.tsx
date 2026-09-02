"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, FadeIn } from "@/components/shared/section";
import { AnimatedTitle } from "@/components/shared/animated-title";
import { Button } from "@/components/ui/button";

export function AboutPreviewSection() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeIn>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1562962230-16e4623d36e?w=800&q=80"
              alt="О студии Mary Fox"
              fill
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AnimatedTitle
            title="О студии"
            subtitle="Пространство, где искусство встречается с мастерством"
            className="mb-8"
          />
          <p className="text-secondary-foreground leading-relaxed mb-6">
            Mary Fox Tattoo Studio — это больше, чем тату-салон. Это место, где каждая
            работа создаётся с безупречным вниманием к деталям, а каждый клиент
            получает премиальный сервис мирового уровня.
          </p>
          <p className="text-secondary-foreground leading-relaxed mb-8">
            Наша команда — мастера с опытом работы в лучших студиях Европы и Азии.
            Мы создаём не просто татуировки — мы создаём искусство.
          </p>
          <Button variant="outline" asChild>
            <Link href="/about">
              Узнать больше
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </Section>
  );
}
