import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CtaButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "btn-cta inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold tracking-[0.06em] [&>*]:relative [&>*]:z-[1]",
        className
      )}
    >
      {children}
    </a>
  );
}
