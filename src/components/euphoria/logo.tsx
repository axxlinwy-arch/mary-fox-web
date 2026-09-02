import Image from "next/image";
import { ASSETS } from "@/constants/site";
import { cn } from "@/lib/utils";

interface EuphoriaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

const sizes = {
  sm: { height: 36, width: 90 },
  md: { height: 52, width: 128 },
  lg: { height: 64, width: 158 },
} as const;

export function EuphoriaLogo({
  className,
  size = "sm",
  priority = false,
}: EuphoriaLogoProps) {
  const s = sizes[size];

  return (
    <div
      className={cn(
        "relative shrink-0 drop-shadow-[0_0_16px_rgba(255,20,147,0.4)]",
        className
      )}
      style={{ height: s.height, width: s.width }}
    >
      <Image
        src={ASSETS.logoEuphoria}
        alt="EUPHORIA — Minsk"
        fill
        className="object-contain object-left"
        priority={priority}
        sizes={`${s.width}px`}
      />
    </div>
  );
}
