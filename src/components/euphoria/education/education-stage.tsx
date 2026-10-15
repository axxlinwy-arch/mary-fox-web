"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  type MotionValue,
} from "framer-motion";
import { Lock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { circles, SHOW_MOBILE_CIRCLES, stages, type Stage } from "@/components/euphoria/education/stages";

const ease = [0.22, 1, 0.36, 1] as const;

type EducationStageProps = {
  stage: Stage;
  open: boolean;
  active: boolean;
  reduced: boolean;
  showDivider: boolean;
  listRef: RefObject<HTMLOListElement | null>;
  progress: MotionValue<number>;
  onToggle: () => void;
  onInView: (id: string, visible: boolean) => void;
};

export function EducationStage({
  stage,
  open,
  active,
  reduced,
  showDivider,
  listRef,
  progress,
  onToggle,
  onInView,
}: EducationStageProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(buttonRef, { margin: "-45% 0px -45% 0px" });
  const reached = useThreadReached(listRef, nodeRef, progress, reduced || inView);
  const filled = reduced || reached || inView;
  const panelId = useId();
  const triggerId = useId();

  useEffect(() => {
    onInView(stage.id, inView);
  }, [inView, onInView, stage.id]);

  return (
    <li className="enter grid grid-cols-[12px_minmax(0,1fr)] gap-x-4 lg:gap-x-6">
      <div className="relative">
        <span
          ref={nodeRef}
          aria-hidden
          className={cn(
            "absolute left-1/2 top-[3.8rem] z-[2] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border transition-all duration-500 motion-reduce:transition-none sm:top-[4.5rem] lg:top-[4.7rem] xl:top-[5.45rem]",
            filled
              ? "border-transparent bg-gradient-euphoria shadow-[0_0_10px_rgba(245,181,27,0.7)]"
              : "border-accent-gold/80 bg-background"
          )}
        />
      </div>

      <div className="grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)_auto] items-start gap-x-3 py-8 sm:grid-cols-[4.75rem_minmax(0,1fr)_auto] sm:gap-x-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-6 lg:py-10">
        <button
          ref={buttonRef}
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group col-span-3 grid cursor-pointer grid-cols-subgrid items-start text-left"
        >
          <Numeral value={stage.numeral} active={active} />
          <span className="min-w-0 pt-1 lg:pt-2">
            <span
              className={cn(
                "block font-serif text-[1.7rem] font-semibold leading-[1.12] transition-transform duration-300 motion-reduce:transition-none sm:text-3xl lg:text-4xl",
                stage.locked ? "text-gradient-stone" : "text-foreground",
                !reduced && "group-hover:translate-x-2"
              )}
            >
              {stage.title}
            </span>
            <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.28em] text-accent-gold">
              {stage.tags.map((tag) => (
                <span key={tag} className="whitespace-nowrap">
                  ◆ {tag}
                </span>
              ))}
              <span className={cn("whitespace-nowrap", stage.duration === "—" && "max-lg:hidden")}>
                ◆ {stage.duration}
              </span>
            </span>
          </span>
          {stage.locked ? (
            <Lock
              aria-hidden
              className="mt-2 h-4 w-4 shrink-0 text-accent-gold lg:mt-3"
              strokeWidth={1.5}
            />
          ) : (
            <Plus
              aria-hidden
              className={cn(
                "mt-1.5 h-5 w-5 shrink-0 text-accent-gold transition-transform duration-300 motion-reduce:transition-none lg:mt-2.5",
                open && "rotate-45"
              )}
              strokeWidth={1}
            />
          )}
        </button>

        <div
          id={panelId}
          role={open ? "region" : undefined}
          aria-labelledby={triggerId}
          className="col-start-2 min-w-0"
        >
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key={`${stage.id}-body`}
                initial={reduced ? false : { height: 0, opacity: 0, y: 12 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0, y: 12 }}
                transition={{ duration: reduced ? 0 : 0.38, ease }}
                className="overflow-hidden"
              >
                <StageBody stage={stage} reduced={reduced} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {showDivider ? (
        <div
          aria-hidden
          className="col-start-2 h-px bg-[linear-gradient(90deg,transparent,rgba(245,181,27,0.55)_42%,rgba(242,27,131,0.45)_62%,transparent)]"
        />
      ) : null}
    </li>
  );
}

function Numeral({ value, active }: { value: string; active: boolean }) {
  return (
    <span className="relative mt-1 block w-full shrink-0 text-left lg:w-max lg:pr-1">
      <span
        className={cn(
          "block whitespace-nowrap font-serif text-6xl leading-none text-transparent transition-opacity duration-500 motion-reduce:transition-none sm:text-7xl xl:text-8xl",
          "[-webkit-text-stroke:1.5px_rgba(242,27,131,0.5)]",
          active ? "opacity-0" : "opacity-35 group-hover:opacity-70 max-lg:opacity-50"
        )}
      >
        {value}
      </span>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 whitespace-nowrap font-serif text-6xl leading-none text-gradient-euphoria transition-opacity duration-500 motion-reduce:transition-none sm:text-7xl xl:text-8xl",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-45"
        )}
      >
        {value}
      </span>
    </span>
  );
}

const skeletonLeft = ["w-[92%]", "w-full", "w-[74%]", "w-[56%]"];
const skeletonRight = ["w-[85%]", "w-[70%]", "w-[90%]"];

function StageBody({ stage, reduced }: { stage: Stage; reduced: boolean }) {
  if (stage.locked) {
    return (
      <div className={cn("pb-1", SHOW_MOBILE_CIRCLES ? "lg:pt-6" : "pt-6")}>
        {SHOW_MOBILE_CIRCLES ? <MobileStageCircle stage={stage} reduced={reduced} /> : null}
        <div className="relative">
          <div
            aria-hidden
            className="grid gap-6 opacity-60 lg:grid-cols-[minmax(0,5fr)_1px_minmax(0,7fr)] lg:gap-8"
          >
            <div>
              <div className="h-2.5 w-[30%] rounded-full bg-accent-gold/35" />
              <div className="mt-[14px] flex flex-col gap-[14px]">
                {skeletonLeft.map((width) => (
                  <div key={width} className={cn("edu-shimmer h-3 rounded-full blur-[2px]", width)} />
                ))}
              </div>
              <div className="mt-[14px] h-2.5 w-[35%] rounded-full bg-accent-gold/35" />
            </div>
            <div className="z-0 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(245,181,27,0.55),transparent)] lg:h-auto lg:w-px lg:bg-[linear-gradient(180deg,transparent,rgba(245,181,27,0.6),transparent)]" />
            <div>
              <div className="h-2.5 w-[35%] rounded-full bg-accent-gold/35" />
              <ul className="mt-[14px] flex flex-col gap-[14px]">
                {skeletonRight.map((width) => (
                  <li key={width} className="flex items-center gap-3">
                    <span className="h-px w-4 shrink-0 bg-accent-gold/70" />
                    <span className={cn("edu-shimmer h-3 rounded-full blur-[2px]", width)} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <p
              className="max-w-[420px] px-8 py-7 text-center text-sm leading-relaxed text-foreground sm:text-[15px]"
              style={{
                textShadow: "0 1px 2px rgba(9,7,9,0.45), 0 0 18px rgba(9,7,9,0.55)",
                backgroundImage:
                  "radial-gradient(ellipse, rgba(8,6,10,0.85) 0%, transparent 70%)",
              }}
            >
              {stage.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (stage.tracks && stage.tracks.length > 0) {
    return (
      <div className="pb-1">
        <div className={cn(SHOW_MOBILE_CIRCLES ? "lg:pt-6" : "pt-6")}>
          {SHOW_MOBILE_CIRCLES ? <MobileStageCircle stage={stage} reduced={reduced} /> : null}
          {stage.tracks.map((track, index) => (
            <div key={track.label}>
              {index > 0 ? (
                <div
                  aria-hidden
                  className="my-5 h-px bg-[linear-gradient(90deg,transparent,rgba(245,181,27,0.45),transparent)]"
                />
              ) : null}
              <p className="text-[10px] uppercase tracking-[0.32em] text-accent-gold sm:text-[11px]">
                {track.label}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-[15px]">
                {track.text}
              </p>
            </div>
          ))}
        </div>
        <Duration value={stage.duration} />
      </div>
    );
  }

  return (
    <div className="pb-1">
      <div className={cn(SHOW_MOBILE_CIRCLES ? "lg:pt-6" : "pt-6")}>
        {SHOW_MOBILE_CIRCLES ? <MobileStageCircle stage={stage} reduced={reduced} /> : null}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_1px_minmax(0,7fr)] lg:gap-8">
        <p className="text-sm leading-relaxed text-foreground/70 sm:text-[15px]">
          {stage.description}
        </p>
        <div
          aria-hidden
          className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(245,181,27,0.55),transparent)] lg:h-auto lg:w-px lg:bg-[linear-gradient(180deg,transparent,rgba(245,181,27,0.6),transparent)]"
        />
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-accent-gold sm:text-[11px]">
            Что внутри
          </p>
          <ul className="mt-4 space-y-3">
            {stage.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-foreground/70 sm:text-[15px]"
              >
                <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent-gold/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
      <Duration value={stage.duration} />
    </div>
  );
}

function MobileStageCircle({ stage, reduced }: { stage: Stage; reduced: boolean }) {
  const index = stages.findIndex((item) => item.id === stage.id);
  const circle = circles[stage.locked ? 2 : index] ?? circles[0];
  const petrified = stage.locked === true;

  return (
    <div aria-hidden className="mx-auto mb-4 mt-5 w-fit p-6 lg:hidden">
      <motion.div
        className="relative aspect-square w-[clamp(120px,34vw,140px)]"
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.4, ease, delay: 0.12 }}
      >
        {petrified ? null : (
          <div
            className="pointer-events-none absolute rounded-full blur-[16px]"
            style={{
              inset: -16,
              background: "radial-gradient(circle, rgba(242,27,131,0.18) 0%, transparent 68%)",
            }}
          />
        )}
        <div className={cn("edu-mobile-circle-ring", petrified && "opacity-20")} />
        <div
          className="relative z-[1] h-full w-full overflow-hidden rounded-full"
          style={
            petrified
              ? { opacity: 0.5, filter: "grayscale(1) blur(2px)" }
              : undefined
          }
        >
          <img src={circle.src} alt="" draggable={false} className="h-full w-full object-cover" />
        </div>
        {petrified ? (
          <div className="pointer-events-none absolute inset-0 z-[2] grid place-items-center">
            <Lock className="h-5 w-5 text-accent-gold" strokeWidth={1.5} />
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}

function Duration({ value }: { value: string }) {
  return (
    <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-accent-gold">
      Длительность: {value}
    </p>
  );
}

function useThreadReached(
  listRef: RefObject<HTMLOListElement | null>,
  nodeRef: RefObject<HTMLSpanElement | null>,
  progress: MotionValue<number>,
  force: boolean
) {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    if (force) return;
    const sync = (value: number) => {
      const list = listRef.current;
      const node = nodeRef.current;
      if (!list || !node) return;
      const listRect = list.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const height = listRect.height || 1;
      const threshold = (nodeRect.top - listRect.top + nodeRect.height / 2) / height;
      const next = value + 0.04 >= threshold;
      setReached((prev) => (prev === next ? prev : next));
    };

    sync(progress.get());
    const unsubscribe = progress.on("change", sync);
    const list = listRef.current;
    const observer = list ? new ResizeObserver(() => sync(progress.get())) : null;
    if (list && observer) observer.observe(list);

    return () => {
      unsubscribe();
      observer?.disconnect();
    };
  }, [force, listRef, nodeRef, progress]);

  return force || reached;
}
