"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";

const GOLD = "#F5B51B";
const PINK = "#F21B83";
const GOLD_SOFT = "#F3D98A";
const EASE = [0.22, 1, 0.36, 1] as const;

function rootScale() {
  if (typeof document === "undefined") return 1;
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return (Number.isFinite(root) ? root : 16) / 16;
}

type Point = { x: number; y: number };
type Side = "tr" | "bl";

type MarkGeom = {
  side: Side;
  diamond: Point;
  diamondSize: number;
  start: Point;
  tip: Point;
  joint: Point;
  main: string;
  tail: string;
  full: string;
};

type Box = { x: number; y: number; w: number; h: number; r: number };

function n(value: number) {
  return Math.round(value * 10) / 10;
}

function centerOf(el: HTMLElement, origin: DOMRect): Point {
  const box = el.getBoundingClientRect();
  return {
    x: box.left - origin.left + box.width / 2,
    y: box.top - origin.top + box.height / 2,
  };
}

function buildMark(card: Box, anchor: Point, side: Side, scale: number): MarkGeom {
  const u = (value: number) => value * scale;
  const down = side === "bl";
  const ySign = down ? 1 : -1;
  const xSign = down ? -1 : 1;
  const radius = Math.max(0, card.r);
  const offset = u(14);
  const diamondSize = u(9 / Math.SQRT2);
  const lineRadius = radius + offset;
  const kappa = lineRadius * 0.5522847498;
  const diamond = { x: anchor.x, y: anchor.y + ySign * u(44) };
  const start = { x: diamond.x, y: diamond.y + ySign * (diamondSize / 2) };
  const lifted = { x: start.x, y: start.y + ySign * u(18) };
  const sideX = down ? card.x - offset : card.x + card.w + offset;
  const edgeY = down ? card.y + card.h + offset : card.y - offset;
  const corner = down
    ? { x: card.x + radius, y: card.y + card.h - radius }
    : { x: card.x + card.w - radius, y: card.y + radius };
  const arcStart = { x: sideX, y: down ? corner.y : corner.y };
  const arcEnd = down
    ? { x: corner.x, y: edgeY }
    : { x: corner.x, y: edgeY };
  const run = Math.max(card.w * 0.26, u(22));
  const joint = { x: arcEnd.x + xSign * -(run - u(16)), y: edgeY };
  const tip = { x: arcEnd.x + xSign * -run, y: edgeY + ySign * u(6) };
  const joinY = down
    ? Math.min(arcStart.y - u(12), lifted.y + u(28))
    : Math.max(arcStart.y + u(12), lifted.y - u(28));
  const join = { x: sideX, y: joinY };
  const arcCp1 = down ? { x: arcStart.x, y: arcStart.y + kappa } : { x: arcStart.x, y: arcStart.y - kappa };
  const arcCp2 = down ? { x: arcEnd.x - kappa, y: arcEnd.y } : { x: arcEnd.x + kappa, y: arcEnd.y };
  const tailCp1 = { x: joint.x + xSign * -u(7), y: joint.y };
  const tailCp2 = { x: tip.x + xSign * u(4), y: tip.y - ySign * u(2) };
  const tailCurve = `C ${n(tailCp1.x)} ${n(tailCp1.y)} ${n(tailCp2.x)} ${n(tailCp2.y)} ${n(tip.x)} ${n(tip.y)}`;

  const main = [
    `M ${n(start.x)} ${n(start.y)}`,
    `L ${n(lifted.x)} ${n(lifted.y)}`,
    `C ${n(lifted.x)} ${n(lifted.y + ySign * u(22))} ${n(join.x)} ${n(lifted.y + ySign * u(8))} ${n(join.x)} ${n(join.y)}`,
    `L ${n(arcStart.x)} ${n(arcStart.y)}`,
    `C ${n(arcCp1.x)} ${n(arcCp1.y)} ${n(arcCp2.x)} ${n(arcCp2.y)} ${n(arcEnd.x)} ${n(arcEnd.y)}`,
    `L ${n(joint.x)} ${n(joint.y)}`,
  ].join(" ");
  const tail = `M ${n(joint.x)} ${n(joint.y)} ${tailCurve}`;

  return { side, diamond, diamondSize, start, tip, joint, main, tail, full: `${main} ${tailCurve}` };
}

function MarkSign({
  geom,
  gradientId,
  appear,
  onScreen,
  reduced,
  direction,
  activeIndex,
  tipRotate,
  tipShift,
}: {
  geom: MarkGeom;
  gradientId: string;
  appear: boolean;
  onScreen: boolean;
  reduced: boolean;
  direction: "next" | "prev" | null;
  activeIndex: number;
  tipRotate: MotionValue<number>;
  tipShift: MotionValue<number>;
}) {
  const primary = direction === "next" ? "tr" : direction === "prev" ? "bl" : null;
  const isPrimary = primary === geom.side;
  const shiver = primary != null && !isPrimary;
  const delay = geom.side === "bl" ? 0.25 : 0;
  const [spin, setSpin] = useState(0);
  const [shiverKey, setShiverKey] = useState(0);
  const [glintKey, setGlintKey] = useState(0);
  const skipped = useRef(true);

  useLayoutEffect(() => {
    if (skipped.current) {
      skipped.current = false;
      return;
    }
    if (reduced || !direction) return;
    if (isPrimary) {
      setSpin((value) => value + 1);
      setGlintKey((value) => value + 1);
    } else if (shiver) {
      setShiverKey((value) => value + 1);
    }
  }, [activeIndex, direction, isPrimary, reduced, shiver]);

  const drawn = reduced || appear;
  const lineTransition = {
    duration: reduced ? 0 : 0.9,
    delay: reduced ? 0 : delay + 0.5,
    ease: EASE,
  };
  const tailTransition = {
    duration: reduced ? 0 : 0.2,
    delay: reduced ? 0 : delay + 1.4,
    ease: EASE,
  };

  return (
    <g>
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={geom.start.x}
          y1={geom.start.y}
          x2={geom.tip.x}
          y2={geom.tip.y}
        >
          <stop offset="0%" stopColor={GOLD} stopOpacity={1} />
          <stop offset="75%" stopColor={PINK} stopOpacity={1} />
          <stop offset="100%" stopColor={PINK} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.g style={reduced ? undefined : { rotate: tipRotate, x: tipShift, transformOrigin: `${geom.joint.x}px ${geom.joint.y}px`, transformBox: "view-box" }}>
        <motion.g
          key={shiverKey}
          initial={false}
          animate={reduced || shiverKey === 0 ? { rotate: 0 } : { rotate: [0, 6, -6, 0] }}
          transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.45 }}
          style={{ transformOrigin: `${geom.joint.x}px ${geom.joint.y}px`, transformBox: "view-box" }}
        >
          <motion.path
            d={geom.tail}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={1.5}
            strokeLinecap="round"
            pathLength={1}
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={tailTransition}
          />
        </motion.g>
      </motion.g>
      <motion.path
        d={geom.main}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={lineTransition}
      />
      {onScreen && !reduced && appear ? (
        <motion.path
          d={geom.full}
          fill="none"
          stroke={GOLD_SOFT}
          strokeWidth={1.5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.06 1"
          initial={{ strokeDashoffset: 0.06, opacity: 0 }}
          animate={{ strokeDashoffset: [0.06, -1, -1], opacity: [1, 1, 0] }}
          transition={{
            duration: 5,
            times: [0, 0.28, 0.34],
            repeat: Infinity,
            delay: geom.side === "bl" ? 2.5 : 0,
            ease: "linear",
          }}
        />
      ) : null}
      {isPrimary && !reduced && glintKey > 0 ? (
        <motion.path
          key={glintKey}
          d={geom.full}
          fill="none"
          stroke={GOLD_SOFT}
          strokeWidth={1.5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.06 1"
          initial={{ strokeDashoffset: 0.06, opacity: 1 }}
          animate={{ strokeDashoffset: -1, opacity: [1, 1, 0] }}
          transition={{ duration: 0.7, ease: EASE, opacity: { duration: 0.7, times: [0, 0.82, 1] } }}
        />
      ) : null}
      <motion.g
        initial={{ scale: reduced ? 1 : 0, rotate: 0 }}
        animate={
          reduced
            ? { scale: 1, rotate: spin * 90 }
            : appear
              ? { scale: isPrimary && glintKey > 0 ? [1, 1.25, 1] : 1, rotate: spin * 90 }
              : { scale: 0, rotate: 0 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { scale: { type: "spring", duration: 0.5, delay }, rotate: { type: "spring", duration: 0.5 } }
        }
        style={{ transformOrigin: `${geom.diamond.x}px ${geom.diamond.y}px`, transformBox: "view-box" }}
      >
        <motion.rect
          x={geom.diamond.x - geom.diamondSize / 2}
          y={geom.diamond.y - geom.diamondSize / 2}
          width={geom.diamondSize}
          height={geom.diamondSize}
          fill={GOLD}
          transform={`rotate(45 ${geom.diamond.x} ${geom.diamond.y})`}
          style={{ filter: "drop-shadow(0 0 0.3125rem rgba(245,181,27,0.35))" }}
          initial={false}
          animate={onScreen && !reduced ? { opacity: [0.5, 1] } : { opacity: 1 }}
          transition={
            onScreen && !reduced
              ? { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
              : { duration: 0 }
          }
        />
        <rect
          x={geom.diamond.x - geom.diamondSize / 2}
          y={geom.diamond.y - geom.diamondSize / 2}
          width={geom.diamondSize}
          height={geom.diamondSize}
          fill={`url(#${gradientId})`}
          stroke={GOLD}
          strokeWidth={0.7}
          transform={`rotate(45 ${geom.diamond.x} ${geom.diamond.y})`}
        />
      </motion.g>
    </g>
  );
}

export function BrandMark({
  cardRef,
  prevRef,
  nextRef,
  direction,
  activeIndex,
}: {
  cardRef: RefObject<HTMLDivElement | null>;
  prevRef: RefObject<HTMLButtonElement | null>;
  nextRef: RefObject<HTMLButtonElement | null>;
  direction: "next" | "prev" | null;
  activeIndex: number;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() === true;
  const entered = useInView(overlayRef, { once: true, margin: "-15% 0px" });
  const [photoFirst, setPhotoFirst] = useState(false);
  const appear = entered && photoFirst;
  const onScreen = useInView(overlayRef, { amount: 0.2 });
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 80, damping: 22, mass: 0.4 });
  const trRotate = useTransform(smoothVelocity, [-1500, 0, 1500], [10, 0, -10]);
  const blRotate = useTransform(smoothVelocity, [-1500, 0, 1500], [-10, 0, 10]);
  const trShift = useTransform(smoothVelocity, (velocity) => {
    const t = Math.max(-1, Math.min(1, velocity / 1500));
    return -4 * t * rootScale();
  });
  const blShift = useTransform(smoothVelocity, (velocity) => {
    const t = Math.max(-1, Math.min(1, velocity / 1500));
    return 4 * t * rootScale();
  });
  const uid = useId().replace(/:/g, "");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [marks, setMarks] = useState<MarkGeom[] | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (reduced) {
      setPhotoFirst(true);
      return;
    }
    if (!card) return;
    let timer = 0;
    const showLines = () => {
      timer = window.setTimeout(() => setPhotoFirst(true), 420);
    };
    if (card.classList.contains("is-shown")) {
      showLines();
      return () => window.clearTimeout(timer);
    }
    const watcher = new MutationObserver(() => {
      if (!card.classList.contains("is-shown")) return;
      watcher.disconnect();
      showLines();
    });
    watcher.observe(card, { attributes: true, attributeFilter: ["class"] });
    return () => {
      watcher.disconnect();
      window.clearTimeout(timer);
    };
  }, [cardRef, reduced]);

  useLayoutEffect(() => {
    const root = overlayRef.current;
    const card = cardRef.current;
    if (!root || !card) return;

    const measure = () => {
      const origin = root.getBoundingClientRect();
      if (origin.width <= 0 || origin.height <= 0) return;
      const cardBox = card.getBoundingClientRect();
      const radius = parseFloat(getComputedStyle(card).borderTopLeftRadius) || 0;
      const box: Box = {
        x: cardBox.left - origin.left,
        y: cardBox.top - origin.top,
        w: cardBox.width,
        h: cardBox.height,
        r: radius,
      };
      const nextAnchor = nextRef.current
        ? centerOf(nextRef.current, origin)
        : { x: box.x + box.w, y: box.y + box.h / 2 };
      const prevAnchor = prevRef.current
        ? centerOf(prevRef.current, origin)
        : { x: box.x, y: box.y + box.h / 2 };
      setSize({ w: origin.width, h: origin.height });
      const scale = rootScale();
      setMarks([buildMark(box, nextAnchor, "tr", scale), buildMark(box, prevAnchor, "bl", scale)]);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    observer.observe(card);
    if (prevRef.current) observer.observe(prevRef.current);
    if (nextRef.current) observer.observe(nextRef.current);
    return () => observer.disconnect();
  }, [cardRef, prevRef, nextRef, activeIndex]);

  return (
    <div ref={overlayRef} aria-hidden className="pointer-events-none absolute inset-0 z-[22] overflow-visible">
      {marks && size.w > 0 ? (
        <svg className="absolute inset-0 overflow-visible" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`}>
          {marks.map((geom) => (
            <MarkSign
              key={geom.side}
              geom={geom}
              gradientId={`${uid}-${geom.side}`}
              appear={appear}
              onScreen={onScreen}
              reduced={reduced}
              direction={direction}
              activeIndex={activeIndex}
              tipRotate={geom.side === "tr" ? trRotate : blRotate}
              tipShift={geom.side === "tr" ? trShift : blShift}
            />
          ))}
        </svg>
      ) : null}
    </div>
  );
}
