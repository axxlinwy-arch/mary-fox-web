import Image from "next/image";
import { CONTACT, SITE, ASSETS } from "@/constants/site";
import { EuphoriaLogo } from "@/components/euphoria/logo";

export function EuphoriaFooter() {
  return (
    <footer id="contacts" className="border-t border-accent/10 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="flex items-center gap-4">
            <EuphoriaLogo size="md" />
            <div>
              <p className="font-display text-2xl text-gradient-euphoria">
                {SITE.shortName}
              </p>
              <p className="text-sm text-secondary-foreground">{SITE.tagline}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-gold">
              Контакты
            </p>
            <p className="text-foreground">{CONTACT.address}</p>
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-accent hover:text-accent-secondary transition-colors"
            >
              @maryfoxtattooo
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-accent-gold hover:opacity-80 transition-opacity"
            >
              {CONTACT.instagramHandle}
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-gold">
              Юридическая информация
            </p>
            <p className="text-sm text-secondary-foreground">
              {CONTACT.legalEntity}
            </p>
            <a
              href="#offer"
              className="block text-sm text-secondary-foreground hover:text-accent transition-colors"
            >
              Публичная оферта
            </a>
          </div>
        </div>

        <div className="mt-12 relative h-32 md:h-40 overflow-hidden rounded-xl neon-border opacity-60">
          <Image
            src={ASSETS.team}
            alt="Команда EUPHORIA"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="mt-8 pt-8 border-t border-accent/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-secondary-foreground">
          <p>
            © {new Date().getFullYear()} {SITE.shortName}. {SITE.founder}.
          </p>
          <p>Республика Беларусь, г. Минск</p>
        </div>
      </div>
    </footer>
  );
}
