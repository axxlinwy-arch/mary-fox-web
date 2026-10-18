"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CtaButton } from "@/components/euphoria/cta-button";
import { Reveal } from "@/components/euphoria/education/reveal";
import { EDUCATION } from "@/constants/content";
import { ASSETS, CONTACT } from "@/constants/site";

export function CertificateCta() {
  const reduced = useReducedMotion() === true;
  const figureRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.06, 1]);

  return (
    <div className="mt-16 lg:mt-24">
      <Reveal className="relative">
        <div
          aria-hidden
          className="glow-wash-hot pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[82%] -translate-x-1/2 -translate-y-1/2"
        />
        <figure ref={figureRef} className="relative">
          <div
            className="overflow-hidden rounded-xl"
            style={{
              maskImage: "linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)",
            }}
          >
            <div className="relative aspect-[15/11]">
              <motion.img
                src={ASSETS.team}
                alt="Выпуск учеников EUPHORIA"
                draggable={false}
                style={
                  reduced
                    ? { height: "181.818%", top: "-63.636%" }
                    : { height: "181.818%", top: "-63.636%", scale }
                }
                className="absolute left-0 w-full max-w-none object-cover"
              />
            </div>
          </div>
          <figcaption className="absolute bottom-[12%] left-4 flex items-center gap-3.5 sm:left-8 sm:gap-4 md:bottom-[16%] md:left-10">
            <ScrollSeal />
            <span className="max-w-[16rem] text-sm leading-snug text-champagne sm:max-w-none sm:text-[0.9375rem]">
              В конце обучения — сертификат
            </span>
          </figcaption>
        </figure>
      </Reveal>

      <Reveal className="mt-8 flex justify-center sm:mt-10" delay={0.14}>
        <CtaButton href={CONTACT.maryInstagram} className="h-12 px-7">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
            {EDUCATION.cta}
          </span>
        </CtaButton>
      </Reveal>
    </div>
  );
}

function ScrollSeal() {
  return (
    <svg
      viewBox="0 0 48 56"
      aria-hidden
      className="h-14 w-12 shrink-0 text-accent-gold"
      fill="none"
    >
      <path
        d="M14 14h18.5c2.6 0 4.5 1.8 4.5 4.2S35.1 22.4 32.5 22.4H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 14c0-2.4 1.9-4.2 4.3-4.2h14.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 14v30.2c0 2.8 2.3 5 5.2 5H32c2.6 0 4.8-2 4.8-4.6V22.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 14c-2.8 0-4.8 2-4.8 4.5S11.2 23 14 23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="36.5" cy="40" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M33.7 40.1 35.7 42.2 39.4 37.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
