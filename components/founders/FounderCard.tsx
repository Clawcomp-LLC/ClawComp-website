"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export function FounderCard({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const controls = useAnimation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const revealed = useRef(false);

  useEffect(() => {
    if (window.scrollY > 0) {
      setHasScrolled(true);
      return;
    }
    const onScroll = () => {
      setHasScrolled(true);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (hasScrolled && isInView && !revealed.current) {
      revealed.current = true;
      controls.start({ opacity: 1, y: 0 });
    }
  }, [hasScrolled, isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
      className="bg-background-elevated border border-border rounded-card p-8 hover:border-border-active transition-all duration-300"
    >
      {children}
    </motion.div>
  );
}
