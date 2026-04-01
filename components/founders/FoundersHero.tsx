"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEO_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/founders-montage.mp4`;

export function FoundersHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -200]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden mb-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
        src={VIDEO_URL}
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background" />
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-content mx-auto px-6 lg:px-16 pt-32 lg:pt-44 pb-24 lg:pb-36 text-center flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-sm font-medium uppercase tracking-[0.15em] text-brand-red mb-4"
        >
          The People Behind ClawComp
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-6"
        >
          Meet the Founders
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="text-base leading-relaxed text-text-muted max-w-prose"
        >
          ClawComp was built by three university students with a shared
          conviction: autonomous AI is the most consequential technological
          shift of their generation, and the builders who get hands-on
          experience with it now will have an outsized advantage. Jack, Yash,
          and Luke bring together technical depth, product intuition, social
          media expertise, and entrepreneurial drive&mdash;and ClawComp aims
          to unite more builders like this under the urgency of the moment.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
          href="https://youtube.com/@promptcastofficial?si=nLh4TYJG5Sfn8kOI"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-background-elevated border border-border hover:border-brand-red text-text-primary font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Watch Their Podcast
        </motion.a>
      </motion.div>
    </section>
  );
}
