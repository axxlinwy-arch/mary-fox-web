import { CONTACT } from "@/constants/site";

export function BookButton({ className }: { className?: string }) {
  return (
    <a
      href={CONTACT.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex flex-col justify-center rounded-lg border-2 border-accent-gold/80 bg-black/65 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold hover:bg-black/80 ${className ?? ""}`}
      style={{
        boxShadow:
          "0 0 20px rgba(253,184,19,0.45), 0 0 40px rgba(253,184,19,0.2), inset 0 0 10px rgba(253,184,19,0.06)",
      }}
    >
      <span className="text-sm sm:text-base font-black uppercase tracking-[0.12em] text-accent-gold leading-none">
        Записаться
      </span>
      <span className="mt-1.5 text-[10px] sm:text-xs text-white/75 uppercase tracking-wider leading-none">
        на тату / обучение
      </span>
    </a>
  );
}
