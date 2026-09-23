"use client";

import { motion } from "framer-motion";

const WAVES = [
  { left: "0%", top: "30%", w: "60%", h: "40%", d: 14 },
  { left: "30%", top: "50%", w: "50%", h: "35%", d: 18 },
  { left: "10%", top: "60%", w: "45%", h: "30%", d: 16 },
] as const;

export function AnimatedHeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {WAVES.map((wave, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px] md:blur-[100px]"
          style={{
            left: wave.left,
            top: wave.top,
            width: wave.w,
            height: wave.h,
            background:
              "radial-gradient(circle, rgba(122,18,62,0.35) 0%, rgba(196,20,98,0.16) 40%, transparent 70%)",
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 25, -15, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.5, 0.85, 0.6, 0.75, 0.5],
          }}
          transition={{
            duration: wave.d,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,300 C360,250 720,350 1080,280 C1260,240 1380,260 1440,300 L1440,900 L0,900 Z"
          fill="url(#wavePink)"
          animate={{ d: [
            "M0,300 C360,250 720,350 1080,280 C1260,240 1380,260 1440,300 L1440,900 L0,900 Z",
            "M0,320 C360,280 720,320 1080,300 C1260,270 1380,290 1440,320 L1440,900 L0,900 Z",
            "M0,300 C360,250 720,350 1080,280 C1260,240 1380,260 1440,300 L1440,900 L0,900 Z",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,400 C400,360 800,420 1200,380 C1320,360 1400,370 1440,400 L1440,900 L0,900 Z"
          fill="url(#wavePink2)"
          animate={{ d: [
            "M0,400 C400,360 800,420 1200,380 C1320,360 1400,370 1440,400 L1440,900 L0,900 Z",
            "M0,380 C400,340 800,400 1200,360 C1320,340 1400,350 1440,380 L1440,900 L0,900 Z",
            "M0,400 C400,360 800,420 1200,380 C1320,360 1400,370 1440,400 L1440,900 L0,900 Z",
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <defs>
          <linearGradient id="wavePink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f21b83" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#c41462" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7a123e" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="wavePink2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c41462" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f21b83" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
    </div>
  );
}
