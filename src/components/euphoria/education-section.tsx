"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { EDUCATION } from "@/constants/content";
import { EducationCircles } from "@/components/euphoria/education/education-circles";
import { EducationStage } from "@/components/euphoria/education/education-stage";
import { CertificateCta } from "@/components/euphoria/education/certificate-cta";
import { Reveal } from "@/components/euphoria/education/reveal";
import { StudentReviews } from "@/components/euphoria/education/student-reviews";
import { stages } from "@/components/euphoria/education/stages";

export function EducationSection() {
  const reduced = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);

  const { scrollYProgress: threadProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const circleY = [
    useTransform(sectionProgress, [0, 1], [14, -14]),
    useTransform(sectionProgress, [0, 1], [24, -24]),
    useTransform(sectionProgress, [0, 1], [34, -34]),
  ] as const;

  const onInView = useCallback((id: string, visible: boolean) => {
    setSeen((prev) => {
      const has = prev.includes(id);
      if (visible === has) return prev;
      return visible ? [...prev, id] : prev.filter((item) => item !== id);
    });
  }, []);

  const scrollActiveId = useMemo(() => {
    const ordered = stages.map((stage) => stage.id).filter((id) => seen.includes(id));
    return ordered.at(-1) ?? null;
  }, [seen]);

  const bustId = openId ?? scrollActiveId ?? stages[0].id;
  const activeStage = stages.find((stage) => stage.id === bustId) ?? stages[0];
  const petrified = activeStage.locked === true;
  const activeCircle = petrified ? -1 : stages.indexOf(activeStage);

  const title = EDUCATION.title;
  const splitAt = title.lastIndexOf(" ");
  const titleLead = title.slice(0, splitAt + 1);
  const titleAccent = title.slice(splitAt + 1);

  return (
    <section
      ref={sectionRef}
      id={EDUCATION.id}
      className="relative scroll-mt-20 bg-[#090709] py-20 md:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-wash absolute right-[-22%] top-[6%] h-[40rem] w-[34rem]" />
        <div className="glow-wash absolute bottom-[8%] left-[-20%] h-[36rem] w-[36rem]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid items-stretch lg:min-h-[calc(22vw*3.6)] lg:grid-cols-12 lg:gap-6 xl:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <header className="mx-auto mb-10 max-w-xl text-center lg:mx-0 lg:mb-0 lg:text-left">
              <Reveal>
                <p className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent-yellow sm:text-[11px] lg:justify-start">
                  <span className="h-px w-8 bg-accent-yellow/40" />
                  {EDUCATION.label}
                  <span className="h-px w-8 bg-accent-yellow/40" />
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <h2 className="font-serif text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
                  {titleLead}
                  <span className="text-gradient-euphoria">{titleAccent}</span>
                </h2>
              </Reveal>
            </header>

            <ol ref={listRef} className="relative list-none lg:mt-14">
              <PathThread progress={threadProgress} reduced={reduced} />
              {stages.map((stage, index) => (
                <EducationStage
                  key={stage.id}
                  stage={stage}
                  open={openId === stage.id}
                  active={openId === stage.id || (openId === null && bustId === stage.id)}
                  reduced={reduced}
                  showDivider={index < stages.length - 1}
                  listRef={listRef}
                  progress={threadProgress}
                  onToggle={() =>
                    setOpenId((current) => (current === stage.id ? null : stage.id))
                  }
                  onInView={onInView}
                />
              ))}
            </ol>
          </div>

          <Reveal className="relative hidden h-full self-stretch lg:col-span-5 lg:block" delay={0.18}>
            <EducationCircles
              activeIndex={activeCircle}
              petrified={petrified}
              reduced={reduced}
              offsets={circleY}
            />
          </Reveal>
        </div>

        <StudentReviews />
        <CertificateCta />
      </div>
    </section>
  );
}

function PathThread({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const needleTop = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 top-0 z-[1] w-3"
      style={{
        maskImage: "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
      }}
    >
      <motion.div
        className="absolute bottom-0 left-1/2 top-0 w-[2px] origin-top shadow-[0_0_8px_rgba(245,181,27,0.75),0_0_16px_rgba(242,27,131,0.4)]"
        style={{
          x: "-50%",
          scaleY: reduced ? 1 : progress,
          transformOrigin: "top center",
          backgroundImage: "linear-gradient(180deg, #F5B51B 0%, #FF7A45 48%, #F21B83 100%)",
        }}
      />
      {reduced ? null : (
        <motion.span
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-gold-soft shadow-[0_0_12px_2px_rgba(245,181,27,0.9)]"
          style={{ top: needleTop }}
        />
      )}
    </div>
  );
}
