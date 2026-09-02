"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT } from "@/constants/content";
import { ASSETS, SITE } from "@/constants/site";

export function EuphoriaAbout() {
  return (
    <section className="relative py-24 md:py-32 border-t border-accent/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-pink opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
              {SITE.founder}
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wide text-gradient-euphoria mb-6">
              {ABOUT.title}
            </h2>
            <div className="space-y-4 text-secondary-foreground leading-relaxed">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl neon-border">
              <Image
                src={ASSETS.maryPortrait}
                alt="Mary Fox — EUPHORIA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 md:-left-8 w-32 h-40 md:w-40 md:h-52 overflow-hidden rounded-xl neon-border-gold shadow-glow-gold hidden sm:block"
            >
              <Image
                src={ASSETS.maryEditorial}
                alt="Mary Fox за работой"
                fill
                className="object-cover"
                sizes="160px"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
        >
          {ABOUT.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 md:p-6 rounded-xl bg-card neon-border"
            >
              <p className="font-display text-3xl md:text-4xl text-gradient-euphoria mb-1">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-secondary-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
