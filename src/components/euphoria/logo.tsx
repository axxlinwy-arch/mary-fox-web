import Image from "next/image";
import { ASSETS } from "@/constants/site";
import { cn } from "@/lib/utils";

interface EuphoriaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

const sizes = {
  sm: { height: "2.25rem", width: "5.625rem" },
  md: { height: "3.25rem", width: "8rem" },
  lg: { height: "5rem", width: "5.5rem" },
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
        "relative shrink-0 drop-shadow-[0_0_1rem_rgba(242,27,131,0.32)]",
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
        sizes={s.width}
      />
    </div>
  );
}
