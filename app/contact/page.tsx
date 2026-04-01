"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top right, rgba(196,154,108,0.12), transparent 50%), radial-gradient(ellipse at bottom left, rgba(229,62,62,0.08), transparent 50%)",
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.2em] text-brand-red mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Contact
        </motion.p>

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Get In Touch
        </motion.h1>

        <motion.p
          className="text-text-muted text-base leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Questions about ClawComp, sponsorship opportunities, or anything else? Reach out directly.
        </motion.p>

        <motion.a
          href="mailto:jackb.openclaw@gmail.com"
          className="inline-flex items-center gap-3 bg-background-elevated border border-border rounded-card px-8 py-5 hover:border-border-active hover:shadow-[0_0_30px_rgba(229,62,62,0.12)] transition-all duration-300 group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
              strokeWidth={1.5}
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <span className="text-text-primary font-medium group-hover:text-brand-coral transition-colors">
            jackb.openclaw@gmail.com
          </span>
        </motion.a>
      </motion.div>
    </main>
  );
}
