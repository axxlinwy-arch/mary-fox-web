"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CONTACT, ASSETS } from "@/constants/site";

export function EuphoriaHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#090709]">
      <nav
        className="mx-auto flex h-16 w-full max-w-[120rem] items-center justify-between px-5 xl:h-20 xl:px-16"
      >
        <Link href="/" className="group block leading-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.euphNadpis}
            alt="EUPHORIA Tattoo Studio"
            decoding="async"
            className="h-7 w-auto object-contain object-left transition-opacity duration-300 group-hover:opacity-90 xl:h-8"
          />
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground transition-colors duration-300 hover:text-accent"
          >
            Telegram
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground transition-colors duration-300 hover:text-accent"
          >
            Instagram
          </a>
          <a href="#contacts" className="text-sm text-foreground transition-colors duration-300 hover:text-accent">
            Контакты
          </a>
          <a
            href="/offer"
            className="btn-cta inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold tracking-[0.04em]"
          >
            Оферта
          </a>
        </div>

        <button
          type="button"
          className="xl:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-0.5rem" }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden space-y-4 border-t border-accent-gold/20 bg-[#090709] px-6 py-6"
        >
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block text-lg text-foreground"
          >
            Telegram
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block text-lg text-foreground"
          >
            Instagram
          </a>
          <a href="#contacts" onClick={() => setMobileOpen(false)} className="block text-lg text-foreground">
            Контакты
          </a>
          <a
            href="/offer"
            onClick={() => setMobileOpen(false)}
            className="btn-cta inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold tracking-[0.04em]"
          >
            Оферта
          </a>
        </motion.div>
      )}
    </header>
  );
}
