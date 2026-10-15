import { Instagram } from "lucide-react";
import { CONTACT, SITE } from "@/constants/site";
import { EuphoriaLogo } from "@/components/euphoria/logo";
import { Reveal } from "@/components/euphoria/education/reveal";

export function EuphoriaFooter() {
  return (
    <footer id="contacts" className="scroll-mt-20 bg-[#090709]">
      <div
        aria-hidden
        className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(245,181,27,0.55)_42%,rgba(242,27,131,0.45)_62%,transparent)]"
      />
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid items-start gap-12 md:grid-cols-3">
          <Reveal>
            <div className="flex items-center gap-3">
              <EuphoriaLogo size="lg" />
              <div>
                <p className="font-serif text-2xl font-semibold text-[#F1ECE5]">{SITE.shortName}</p>
                <p className="text-sm text-[#F1ECE5]">{SITE.tagline}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-3">
              <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow">
                <span className="h-px w-8 bg-accent-yellow/40" />
                Контакты
                <span className="h-px w-8 bg-accent-yellow/40" />
              </p>
              <div className="space-y-3 text-sm leading-5 text-[#F1ECE5]">
                <p>{CONTACT.address}</p>
                <a href={`tel:${CONTACT.phone}`} className="block transition-colors duration-300 hover:text-accent">
                  {CONTACT.phoneDisplay}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="block transition-colors duration-300 hover:text-accent">
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors duration-300 hover:text-accent"
                >
                  <Instagram className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {CONTACT.instagramHandle}
                </a>
                <a
                  href={CONTACT.maryInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors duration-300 hover:text-accent"
                >
                  <Instagram className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {CONTACT.maryInstagramHandle}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="space-y-3">
              <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow">
                <span className="h-px w-8 bg-accent-yellow/40" />
                Юридическая информация
                <span className="h-px w-8 bg-accent-yellow/40" />
              </p>
              <div className="space-y-3 text-sm leading-5 text-[#F1ECE5]">
                <p>{CONTACT.legalEntity}</p>
                <p>УНП {CONTACT.unp}</p>
                <a href="/offer" className="block transition-colors duration-300 hover:text-accent">
                  Публичная оферта
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.32} className="mt-12 text-xs text-[#F1ECE5]">
          <div
            aria-hidden
            className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(245,181,27,0.55)_42%,rgba(242,27,131,0.45)_62%,transparent)]"
          />
          <div className="flex flex-col justify-between gap-4 pt-8 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {SITE.shortName}. {CONTACT.legalEntity}.
            </p>
            <p>Республика Беларусь, г. Минск</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
