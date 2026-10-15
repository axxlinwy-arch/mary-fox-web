import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className }: RevealProps) {
  return <div className={cn("enter", className)}>{children}</div>;
}
