"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CONTACT, ASSETS } from "@/constants/site";
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
        "fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/10 backdrop-blur-md transition-colors duration-500",
        scrolled && "bg-black/20 backdrop-blur-lg"
      )}
    >
      <nav
        className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-5 md:h-20 md:px-10 lg:px-16"
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
            className="btn-cta inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold tracking-[0.04em]"
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
          className="md:hidden space-y-4 border-t border-accent-gold/20 bg-background/95 px-6 py-6 backdrop-blur-xl"
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
