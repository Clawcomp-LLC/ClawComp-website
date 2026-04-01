"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface Sponsor {
  name: string;
  logo: string;
  href: string;
  blurb: string;
  description: string;
  logoSize?: "default" | "large";
}

export function SponsorCard({
  sponsor,
  index,
}: {
  sponsor: Sponsor;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Red glow behind card on hover */}
      <div className="absolute -inset-px rounded-card bg-gradient-to-b from-brand-red/0 via-brand-red/0 to-brand-red/0 group-hover:from-brand-red/20 group-hover:via-brand-red/5 group-hover:to-brand-red/10 transition-all duration-500 blur-sm" />

      <div
        className={`
          relative bg-background-elevated border border-border rounded-card overflow-hidden
          transition-all duration-500 cursor-pointer
          group-hover:border-border-active group-hover:shadow-[0_0_40px_rgba(229,62,62,0.12)]
          ${expanded ? "border-border-active shadow-[0_0_40px_rgba(229,62,62,0.12)]" : ""}
        `}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E53E3E, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
        />

        <div className="p-6 md:p-8">
          {/* Logo + blurb row */}
          <div className="flex items-start gap-5">
            {/* Logo — clicking the logo itself links out */}
            <a
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 relative block group/logo"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-card bg-background-subtle border border-border flex items-center justify-center overflow-hidden transition-all duration-300 group-hover/logo:border-brand-red group-hover/logo:shadow-[0_0_20px_rgba(229,62,62,0.2)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={sponsor.logoSize === "large" ? 160 : 80}
                  height={sponsor.logoSize === "large" ? 96 : 80}
                  className="object-contain w-[70%] h-[70%]"
                />
                {/* External link indicator on hover */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"
                >
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </a>

            {/* Name + blurb */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg md:text-xl font-bold text-text-primary truncate">
                  {sponsor.name}
                </h3>
                <motion.div
                  className="flex-shrink-0"
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-5 h-5 text-text-muted group-hover:text-brand-coral transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-text-muted">
                {sponsor.blurb}
              </p>
            </div>
          </div>

          {/* Collapsible expanded content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-5 border-t border-border">
                  <p className="text-sm md:text-base leading-relaxed text-text-muted">
                    {sponsor.description}
                  </p>
                  <a
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-brand-red hover:text-brand-coral transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit {sponsor.name}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-card">
          <div className="sponsor-shimmer absolute inset-0" />
        </div>
      </div>
    </motion.div>
  );
}
