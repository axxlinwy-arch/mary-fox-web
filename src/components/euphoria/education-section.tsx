"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";
import { EDUCATION } from "@/constants/content";
import { cn } from "@/lib/utils";

type ItemId = (typeof EDUCATION.items)[number]["id"];

export function EducationSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<ItemId | null>("offline");

  return (
    <section
      id={EDUCATION.id}
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-pink opacity-20" />

      <div className="relative mx-auto w-full max-w-[58rem] px-6 md:px-8">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
            {EDUCATION.label}
          </p>
          <h2 className="font-display text-4xl leading-none text-gradient-euphoria md:text-6xl">
            {EDUCATION.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
            {EDUCATION.text}
          </p>
        </motion.header>

        <div className="mt-10 space-y-3 md:mt-14">
          {EDUCATION.items.map((item, index) => {
            const open = openId === item.id;
            const secret = "secret" in item && item.secret;
            const n = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: 0.05 * index, ease: "easeOut" }}
                className={cn(
                  "overflow-hidden rounded-2xl bg-black/45",
                  secret ? "neon-border-gold" : "neon-border"
                )}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
                >
                  <span
                    className={cn(
                      "font-display text-xl leading-none sm:text-2xl",
                      secret ? "text-accent-gold/70" : "text-accent/70"
                    )}
                  >
                    {secret ? "??" : n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl leading-none text-gradient-euphoria sm:text-3xl">
                      {item.title}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {secret ? (
                        <span className="rounded-full border border-accent-gold/40 bg-accent-gold/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent-gold">
                          Секретно · скоро
                        </span>
                      ) : (
                        item.formats.map((format) => (
                          <span
                            key={format}
                            className="rounded-full border border-accent/25 bg-black/40 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent"
                          >
                            {format}
                          </span>
                        ))
                      )}
                    </span>
                  </span>
                  {secret ? (
                    <Lock
                      className="h-4 w-4 shrink-0 text-accent-gold"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                        open && "rotate-180"
                      )}
                      strokeWidth={1.5}
                    />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key={`${item.id}-body`}
                      initial={
                        prefersReducedMotion ? false : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      {secret ? (
                        <SecretBody text={item.intro} />
                      ) : (
                        <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                          <p className="text-sm leading-relaxed text-white/70">
                            {item.intro}
                          </p>
                          {item.programs.length > 0 ? (
                            <ul
                              className={cn(
                                "mt-4 grid gap-3",
                                item.programs.length === 3
                                  ? "md:grid-cols-3"
                                  : "md:grid-cols-2"
                              )}
                            >
                              {item.programs.map((program) => (
                                <li
                                  key={program.title}
                                  className="rounded-xl border border-white/10 bg-black/35 p-4"
                                >
                                  <p className="text-xs uppercase tracking-[0.2em] text-accent-gold">
                                    {program.title}
                                  </p>
                                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    {program.text}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SecretBody({ text }: { text: string }) {
  return (
    <div className="relative border-t border-accent-gold/20 px-4 pb-6 pt-5 sm:px-6">
      <div
        className="select-none space-y-2 blur-[3px]"
        aria-hidden
      >
        <p className="h-3 w-4/5 rounded-full bg-white/15" />
        <p className="h-3 w-full rounded-full bg-white/10" />
        <p className="h-3 w-2/3 rounded-full bg-white/10" />
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <p className="h-16 rounded-lg bg-white/5" />
          <p className="h-16 rounded-lg bg-white/5" />
          <p className="h-16 rounded-lg bg-white/5" />
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-6 top-5 flex items-center justify-center sm:inset-x-6">
        <p className="max-w-sm text-center text-sm leading-relaxed text-accent-gold">
          {text}
        </p>
      </div>
    </div>
  );
}
