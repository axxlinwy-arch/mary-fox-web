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
      className="relative scroll-mt-20 overflow-hidden bg-[#090709] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute right-[-12%] top-[18%] h-96 w-80 rounded-full bg-[radial-gradient(circle,rgba(196,20,98,0.18)_0%,rgba(122,18,62,0.24)_40%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-[-8%] left-[-12%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(196,20,98,0.18)_0%,rgba(122,18,62,0.24)_40%,transparent_70%)] blur-2xl" />

      <div className="relative mx-auto w-full max-w-[58rem] px-6 md:px-8">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px]">
            <span className="h-px w-8 bg-accent-yellow/40" />
            {EDUCATION.label}
            <span className="h-px w-8 bg-accent-yellow/40" />
          </p>
          <h2 className="font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-[#F1ECE5] sm:text-4xl lg:text-[2.6rem]">
            {EDUCATION.title.slice(0, EDUCATION.title.lastIndexOf(" ") + 1)}
            <span className="text-gradient-euphoria">
              {EDUCATION.title.slice(EDUCATION.title.lastIndexOf(" ") + 1)}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#F1ECE5]/48 sm:text-[15px]">
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
                  secret ? "neon-border-gold rounded-2xl bg-card" : "surface-card rounded-2xl"
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
                      "font-serif text-xl leading-none sm:text-2xl",
                      secret ? "text-accent-yellow/70" : "text-champagne/70"
                    )}
                  >
                    {secret ? "??" : n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-2xl font-semibold leading-none text-[#F1ECE5] sm:text-3xl">
                      {item.title}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {secret ? (
                        <span className="rounded-full border border-accent-yellow/40 bg-accent-yellow/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent-yellow">
                          Секретно · скоро
                        </span>
                      ) : (
                        item.formats.map((format) => (
                          <span
                            key={format}
                            className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent"
                          >
                            {format}
                          </span>
                        ))
                      )}
                    </span>
                  </span>
                  {secret ? (
                    <Lock
                      className="h-4 w-4 shrink-0 text-accent-yellow"
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
                        <div className="border-t border-[rgba(180,35,100,0.22)] px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                          <p className="text-sm leading-relaxed text-[#F1ECE5]/68">
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
                                  className="rounded-xl border border-[rgba(180,35,100,0.38)] bg-[#110C11] p-4"
                                >
                                  <p className="text-xs uppercase tracking-[0.2em] text-accent-yellow">
                                    {program.title}
                                  </p>
                                  <p className="mt-2 text-sm leading-relaxed text-[#F1ECE5]/68">
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
    <div className="relative border-t border-[rgba(180,35,100,0.22)] px-4 pb-6 pt-5 sm:px-6">
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
        <p className="max-w-sm text-center text-sm leading-relaxed text-champagne">
          {text}
        </p>
      </div>
    </div>
  );
}
