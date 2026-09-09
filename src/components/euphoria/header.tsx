"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CONTACT, LAYOUT, ASSETS } from "@/constants/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/offer", label: "Оферта" },
  { href: "#contacts", label: "Контакты" },
] as const;

export function EuphoriaHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-accent/20"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 md:h-20 items-center justify-between px-6 md:px-8"
        style={{ maxWidth: LAYOUT.siteWidth }}
      >
        <Link href="/" className="group block leading-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.euphNadpis}
            alt="EUPHORIA Tattoo Studio"
            decoding="async"
            className="h-7 w-auto object-contain object-left transition-opacity duration-300 group-hover:opacity-90 md:h-8"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-secondary-foreground hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary-foreground hover:text-accent-gold transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-accent/40 px-5 py-2 text-sm font-medium text-foreground hover:border-accent hover:shadow-glow-sm transition-all duration-300"
          >
            Telegram
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-accent/20 bg-black/95 backdrop-blur-xl px-6 py-6 space-y-4"
        >
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-lg text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg text-accent-gold"
          >
            Instagram
          </a>
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg text-accent"
          >
            Telegram
          </a>
        </motion.div>
      )}
    </header>
  );
}
