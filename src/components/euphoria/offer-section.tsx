"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { OFFER } from "@/constants/content";
import { CONTACT } from "@/constants/site";

export function EuphoriaOffer() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl bg-card/80 backdrop-blur-sm neon-border p-8 md:p-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="shrink-0 p-3 rounded-xl bg-accent/10 neon-border-gold">
              <FileText className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-5xl tracking-wide text-foreground mb-2">
                {OFFER.title}
              </h1>
              <p className="text-sm text-secondary-foreground">
                {CONTACT.legalEntity}
              </p>
            </div>
          </div>

          <p className="text-secondary-foreground leading-relaxed mb-8">
            {OFFER.description}
          </p>

          <div className="rounded-xl border border-dashed border-accent/30 bg-black/40 p-10 md:p-14 text-center">
            <FileText className="w-12 h-12 text-accent/40 mx-auto mb-4" />
            <p className="text-foreground/80 mb-2">{OFFER.placeholder}</p>
            <p className="text-xs text-secondary-foreground">{OFFER.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
