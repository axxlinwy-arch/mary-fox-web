import { CONTACT, SITE } from "@/constants/site";
import { EuphoriaLogo } from "@/components/euphoria/logo";

export function EuphoriaFooter() {
  return (
    <footer id="contacts" className="scroll-mt-20 border-t border-[rgba(180,35,100,0.28)] bg-[#090709]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid items-start gap-12 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <EuphoriaLogo size="lg" />
            <div>
              <p className="font-serif text-2xl font-semibold text-[#F1ECE5]">
                {SITE.shortName}
              </p>
              <p className="text-sm text-[#F1ECE5]/48">{SITE.tagline}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow">
              <span className="h-px w-6 bg-accent-yellow/40" />
              Контакты
            </p>
            <p className="text-[#F1ECE5]">{CONTACT.address}</p>
            <a
              href={`tel:${CONTACT.phone}`}
              className="block text-[#F1ECE5] transition-colors hover:text-accent"
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
              className="block text-champagne transition-opacity hover:opacity-80"
            >
              {CONTACT.instagramHandle}
            </a>
            <a
              href={CONTACT.maryInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-champagne transition-opacity hover:opacity-80"
            >
              {CONTACT.maryInstagramHandle}
            </a>
          </div>

          <div className="space-y-3">
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow">
              <span className="h-px w-6 bg-accent-yellow/40" />
              Юридическая информация
            </p>
            <p className="text-sm text-[#F1ECE5]">{CONTACT.legalEntity}</p>
            <p className="text-sm text-[#F1ECE5]/48">УНП {CONTACT.unp}</p>
            <a
              href="/offer"
              className="block text-sm text-[#F1ECE5]/48 transition-colors hover:text-accent"
            >
              Публичная оферта
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[rgba(180,35,100,0.22)] pt-8 text-xs text-[#F1ECE5]/38 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.shortName}. {CONTACT.legalEntity}.
          </p>
          <p>Республика Беларусь, г. Минск</p>
        </div>
      </div>
    </footer>
  );
}
