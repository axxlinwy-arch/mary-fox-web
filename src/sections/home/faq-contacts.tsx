"use client";

import Link from "next/link";
import { Section, FadeIn } from "@/components/shared/section";
import { AnimatedTitle } from "@/components/shared/animated-title";
import { FAQ } from "@/components/shared/faq";
import { Button } from "@/components/ui/button";
import { faq } from "@/mock/data";
import { CONTACT } from "@/constants/site";
import { MapPin, Phone, Mail, Instagram, Send } from "lucide-react";

export function FAQSection() {
  return (
    <Section id="faq" className="bg-card/50">
      <FadeIn>
        <AnimatedTitle
          title="FAQ"
          subtitle="Ответы на частые вопросы"
        />
      </FadeIn>
      <div className="max-w-3xl">
        <FAQ items={faq} />
      </div>
    </Section>
  );
}

export function ContactsSection() {
  return (
    <Section id="contacts">
      <FadeIn>
        <AnimatedTitle
          title="Контакты"
          subtitle="Мы всегда рады видеть вас в нашей студии"
        />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-card">
            <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-medium mb-1">Адрес</p>
              <p className="text-secondary-foreground">{CONTACT.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-card">
            <Phone className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-medium mb-1">Телефон</p>
              <a href={`tel:${CONTACT.phone}`} className="text-secondary-foreground hover:text-accent transition-colors">
                {CONTACT.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-card">
            <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-medium mb-1">Email</p>
              <a href={`mailto:${CONTACT.email}`} className="text-secondary-foreground hover:text-accent transition-colors">
                {CONTACT.email}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-card hover:shadow-glow-sm transition-all"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-card hover:shadow-glow-sm transition-all"
            >
              <Send className="h-4 w-4" />
              Telegram
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-card aspect-square lg:aspect-auto lg:h-full min-h-[300px]">
          <iframe
            src={CONTACT.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 300 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта Mary Fox Tattoo Studio"
          />
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/contacts">Связаться с нами</Link>
        </Button>
      </div>
    </Section>
  );
}
