"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section, FadeIn } from "@/components/shared/section";
import { AnimatedTitle } from "@/components/shared/animated-title";
import { Button } from "@/components/ui/button";
import { courses } from "@/mock/data";

export function EducationPreviewSection() {
  const featured = courses[0];

  return (
    <Section id="education">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeIn>
          <AnimatedTitle
            title="Обучение"
            subtitle="Станьте мастером с Mary Fox Education"
            className="mb-8"
          />
          <p className="text-secondary-foreground leading-relaxed mb-6">
            Наша образовательная платформа — это путь от новичка до профессионала.
            Курсы разработаны практикующими мастерами с мировым именем.
          </p>
          <div className="space-y-3 mb-8">
            {courses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                href={`/education/${course.slug}`}
                className="flex items-center justify-between p-4 rounded-xl bg-card hover:shadow-glow-sm transition-all duration-300 group"
              >
                <div>
                  <p className="font-medium group-hover:text-accent transition-colors">
                    {course.title}
                  </p>
                  <p className="text-sm text-secondary-foreground">{course.duration}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-secondary-foreground group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
          <Button asChild>
            <Link href="/education">
              Все курсы
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white/70 text-sm uppercase tracking-wider mb-2">
                Featured Course
              </p>
              <p className="text-white font-display text-3xl">{featured.title}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
