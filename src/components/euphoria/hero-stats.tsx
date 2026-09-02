import { Zap, Trophy, PenTool } from "lucide-react";
import { HERO_STATS } from "@/constants/content";
import { cn } from "@/lib/utils";

const ICONS = [Zap, Trophy, PenTool] as const;

interface HeroStatsProps {
  centered?: boolean;
}

export function HeroStats({ centered = false }: HeroStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {HERO_STATS.map((stat, i) => {
        const Icon = ICONS[i];
        return (
          <div
            key={stat.title}
            className={cn(
              "flex flex-col",
              centered ? "items-center text-center" : "items-start text-left"
            )}
          >
            <div className="relative mb-2">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent-gold/50 bg-black/50 shadow-[0_0_20px_rgba(253,184,19,0.15)]">
                <Icon className="h-5 w-5 text-accent-gold" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-accent leading-tight">
              {stat.title}
            </p>
            {stat.subtitle && (
              <p className="mt-0.5 text-[8px] uppercase tracking-wider text-white/70 leading-tight">
                {stat.subtitle}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
