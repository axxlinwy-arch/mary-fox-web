"use client";

import { ASSETS, HERO } from "@/constants/site";

export function HeroPhotoCarousel() {
  return (
    <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden sm:min-h-[360px] md:min-h-0">
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.finalPhoto}
          alt="EUPHORIA — Mary Fox"
          width={HERO.final.width}
          height={HERO.final.height}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="h-full w-full max-h-none max-w-none scale-[1.2] select-none object-contain sm:scale-[1.25] md:scale-[1.3]"
        />
      </div>
    </div>
  );
}
