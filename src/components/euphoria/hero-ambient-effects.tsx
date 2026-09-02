"use client";

/** Hero ambient — шёлковая aurora + вертикальный блик слева направо */
export function HeroAmbientEffects() {
  return (
    <div className="hero-ambient pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-ambient__silk hero-ambient__silk--primary" />
      <div className="hero-ambient__silk hero-ambient__silk--secondary" />
      <div className="hero-ambient__bridge" />
      <div className="hero-ambient__shimmer" />
      <div className="hero-ambient__vignette" />
    </div>
  );
}
