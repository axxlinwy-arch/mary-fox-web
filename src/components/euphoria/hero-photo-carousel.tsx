"use client";

import { ASSETS, HERO } from "@/constants/site";

export function HeroPhotoCarousel() {
  return (
    <div className="relative flex aspect-[3/2] h-auto w-full flex-col overflow-visible md:aspect-auto md:h-full md:min-h-0 md:overflow-hidden">
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-visible md:overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.finalPhoto}
          alt="EUPHORIA — Mary Fox"
          width={HERO.final.width}
          height={HERO.final.height}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="h-full w-full max-h-none max-w-none select-none object-contain object-top md:scale-[1.2] md:object-center"
        />
      </div>
    </div>
  );
}
