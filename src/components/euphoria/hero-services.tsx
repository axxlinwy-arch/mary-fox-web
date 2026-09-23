import { Heart, Sparkles, GraduationCap, Shield, Star } from "lucide-react";
import { HERO_SERVICES } from "@/constants/content";
import { cn } from "@/lib/utils";

const ICONS = [Star, Heart, GraduationCap, Shield, Sparkles] as const;

interface HeroServicesProps {
  centered?: boolean;
}

export function HeroServices({ centered = false }: HeroServicesProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5 sm:gap-2",
        centered ? "justify-center" : "justify-start"
      )}
    >
      {HERO_SERVICES.map((service, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <div
            key={service}
            className="flex items-center gap-1.5 rounded-md border border-accent-gold/25 bg-card px-2 py-1.5 shadow-volume sm:px-2.5 sm:py-2"
          >
            <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent-gold shrink-0" strokeWidth={1.5} />
            <span className="text-[7px] sm:text-[8px] md:text-[9px] font-medium uppercase tracking-wide text-foreground/90 leading-tight">
              {service}
            </span>
          </div>
        );
      })}
    </div>
  );
}
