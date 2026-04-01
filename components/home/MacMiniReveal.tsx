"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function MacMiniReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end 0.75"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-8 lg:pt-16 overflow-hidden"
    >
      <div className="relative flex flex-col items-center max-w-content mx-auto px-6 lg:px-16">
        <motion.h2
          className="text-center text-7xl md:text-[8rem] lg:text-[10rem] font-extrabold tracking-tighter leading-[0.85] uppercase text-text-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {["Get", "a", "Free"].map((word) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.25em]"
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          {["Mac", "Mini"].map((word) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.25em] text-brand-red"
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <div
          className="relative mt-8 md:mt-12 w-full overflow-hidden"
          style={{ height: "clamp(220px, 32vw, 400px)" }}
        >
          <motion.div
            className="flex justify-center"
            style={{ y: imageY, opacity: imageOpacity }}
          >
            <Image
              src="/mac-mini.png"
              alt="Mac Mini"
              width={800}
              height={533}
              className="w-auto max-w-[90vw] md:max-w-150 lg:max-w-175"
              priority
            />
          </motion.div>
        </div>
      </div>

      <div className="w-full border-t border-border" />
    </section>
  );
}
