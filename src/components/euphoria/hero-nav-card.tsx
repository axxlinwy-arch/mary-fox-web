"use client";

import { useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroNavCard({
  href,
  title,
  src,
  className,
  disableTilt = false,
  glossy = false,
}: {
  href: string;
  title: string;
  src: string;
  className?: string;
  disableTilt?: boolean;
  glossy?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hover: false });

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disableTilt) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -16, y: px * 20, hover: true });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0, hover: false })}
      className={cn("block", className)}
      style={disableTilt ? undefined : { perspective: "900px" }}
    >
      <span
        className={cn(
          "relative block aspect-square w-full overflow-hidden rounded-[0.9rem] bg-black/40",
          glossy
            ? "hero-space-card-face"
            : "border border-accent/60 shadow-[0_18px_36px_rgba(0,0,0,0.55)]"
        )}
        style={
          disableTilt
            ? undefined
            : {
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${tilt.hover ? 26 : 6}px)`,
                transformStyle: "preserve-3d",
                transition: "transform 160ms ease-out",
              }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {glossy ? <span className="hero-space-card-sheen" aria-hidden /> : null}
        <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
        <span className="absolute inset-x-2.5 bottom-2.5 z-[1] flex items-end justify-between gap-1">
          <span className="text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-white md:text-[10px]">
            {title}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white" strokeWidth={1.75} />
        </span>
      </span>
    </a>
  );
}
