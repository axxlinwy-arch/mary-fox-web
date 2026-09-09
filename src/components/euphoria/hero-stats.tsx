import { Zap, Trophy, ShieldCheck, Users, GraduationCap } from "lucide-react";
import { HERO_STATS } from "@/constants/content";
import { cn } from "@/lib/utils";

const ICONS = [Zap, Trophy, ShieldCheck, Users, GraduationCap] as const;

interface HeroStatsProps {
  centered?: boolean;
}

export function HeroStats({ centered = false }: HeroStatsProps) {
  const top = HERO_STATS.slice(0, 3);
  const bottom = HERO_STATS.slice(3);

  return (
    <div className="grid w-full max-w-[340px] grid-cols-6 gap-x-2 gap-y-3 sm:max-w-[380px] sm:gap-x-3 sm:gap-y-3.5 md:max-w-none">
      {top.map((stat, i) => (
        <StatItem
          key={stat.title}
          stat={stat}
          icon={ICONS[i]}
          centered={centered}
          className="col-span-2"
        />
      ))}
      {bottom.map((stat, i) => (
        <StatItem
          key={stat.title}
          stat={stat}
          icon={ICONS[i + 3]}
          centered={centered}
          className={cn("col-span-2", i === 0 && "col-start-2")}
        />
      ))}
    </div>
  );
}

function StatItem({
  stat,
  icon: Icon,
  centered,
  className,
}: {
  stat: (typeof HERO_STATS)[number];
  icon: (typeof ICONS)[number];
  centered: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <div className="relative mb-1.5 md:mb-2">
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent-gold/50 bg-black/50 shadow-[0_0_20px_rgba(253,184,19,0.15)] sm:h-[4.25rem] sm:w-[4.25rem] md:h-16 md:w-16">
          <Icon className="h-5 w-5 text-accent-gold" strokeWidth={1.5} />
        </div>
      </div>
      <p className="max-w-[6.5rem] text-[10px] font-semibold uppercase leading-tight tracking-wide text-accent sm:max-w-none">
        {stat.title}
      </p>
      {stat.subtitle ? (
        <p className="mt-0.5 max-w-[6.5rem] text-[8px] uppercase leading-tight tracking-wider text-white/70 sm:max-w-none">
          {stat.subtitle}
        </p>
      ) : null}
    </div>
  );
}
