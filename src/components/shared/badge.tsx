import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        {
          "bg-card text-secondary-foreground": variant === "default",
          "bg-accent/10 text-accent": variant === "accent",
          "border border-border text-secondary-foreground": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
