"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function SponsorHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video montage background — falls back to gradient if no videos yet */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 20%, rgba(229,62,62,0.2), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(196,154,108,0.18), transparent 55%), radial-gradient(ellipse at center, rgba(17,17,24,0.6), transparent 80%)",
          }}
        />
        {/* Animated particle grid overlay */}
        <div className="absolute inset-0 sponsor-grid-overlay opacity-20" />
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#0A0A0F_85%)]" />

      {/* Sweeping red scan line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-[2] pointer-events-none will-change-transform"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(229,62,62,0.4), transparent)",
        }}
        animate={{ y: ["0vh", "100vh"] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Title content */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center px-6"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.p
          className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-brand-red mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Powering the Competition
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <span className="text-text-primary">Our </span>
          <span
            className="bg-clip-text text-transparent animate-gradient-flow"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #E53E3E 0%, #FF6B6B 25%, #FFFFFF 50%, #FF6B6B 75%, #E53E3E 100%)",
              backgroundSize: "300% 100%",
            }}
          >
            Sponsors
          </span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-text-muted max-w-prose leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Our network of companies on the frontier of AI, ready to supply you — excited to meet you.
        </motion.p>

        {/* Glowing divider */}
        <motion.div
          className="mt-10 w-24 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E53E3E, transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-text-muted">
            Meet Our Sponsors
          </span>
          <svg
            className="w-5 h-5 text-brand-red"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom fade into content */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[3] pointer-events-none" />
    </section>
  );
}
