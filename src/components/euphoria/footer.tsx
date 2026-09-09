import { CONTACT, SITE } from "@/constants/site";
import { EuphoriaLogo } from "@/components/euphoria/logo";

export function EuphoriaFooter() {
  return (
    <footer id="contacts" className="scroll-mt-20 border-t border-accent/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid items-start gap-12 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <EuphoriaLogo size="lg" />
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
              href={`tel:${CONTACT.phone}`}
              className="block text-foreground transition-colors hover:text-accent"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="block text-accent transition-colors hover:text-accent-secondary"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-accent-gold transition-opacity hover:opacity-80"
            >
              {CONTACT.instagramHandle}
            </a>
            <a
              href={CONTACT.maryInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-accent-gold transition-opacity hover:opacity-80"
            >
              {CONTACT.maryInstagramHandle}
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-gold">
              Юридическая информация
            </p>
            <p className="text-sm text-foreground">{CONTACT.legalEntity}</p>
            <p className="text-sm text-secondary-foreground">УНП {CONTACT.unp}</p>
            <a
              href="/offer"
              className="block text-sm text-secondary-foreground transition-colors hover:text-accent"
            >
              Публичная оферта
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-accent/10 pt-8 text-xs text-secondary-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.shortName}. {CONTACT.legalEntity}.
          </p>
          <p>Республика Беларусь, г. Минск</p>
        </div>
      </div>
    </footer>
  );
}
