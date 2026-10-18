import { CONTACT } from "@/constants/site";
import { CtaButton } from "@/components/euphoria/cta-button";
import { cn } from "@/lib/utils";

export function BookButton({ className }: { className?: string }) {
  return (
    <CtaButton href={CONTACT.maryInstagram} className={cn("flex-col px-7 py-2.5", className)}>
      <span className="text-sm font-semibold uppercase leading-none tracking-[0.08em] sm:text-[0.9375rem]">
        Записаться
      </span>
      <span className="mt-1 text-[0.625rem] font-medium uppercase leading-none tracking-[0.12em] opacity-70">
        на тату / обучение
      </span>
    </CtaButton>
  );
}
