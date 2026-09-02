"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, FadeIn } from "@/components/shared/section";
import { AnimatedTitle } from "@/components/shared/animated-title";
import { ArtistCard } from "@/components/shared/artist-card";
import { Button } from "@/components/ui/button";
import { artists } from "@/mock/data";

export function ArtistsSection() {
  return (
    <Section id="artists" className="bg-card/50">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <AnimatedTitle
            title="Наши мастера"
            subtitle="Команда профессионалов мирового уровня"
            className="mb-0"
          />
          <Button variant="outline" asChild className="mt-6 md:mt-0 shrink-0">
            <Link href="/artists">
              Все мастера
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {artists.map((artist, index) => (
          <ArtistCard key={artist.id} artist={artist} index={index} />
        ))}
      </div>
    </Section>
  );
}
