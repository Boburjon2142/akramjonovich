"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  badge: string;
  title: string;
  titleGradient?: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ badge, title, titleGradient, subtitle, center = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={center ? "text-center flex flex-col items-center" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inV ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <span className="badge-gold">
          <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#D4AF37" }} />
          {badge}
        </span>
      </motion.div>

      <motion.h2
        className="font-display font-black leading-[0.92] tracking-[-0.02em] text-white mb-1"
        style={{ fontSize: "clamp(2.5rem, 5.5vw, 6rem)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={inV ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
      >
        {title}
      </motion.h2>

      {titleGradient && (
        <motion.h2
          className="font-display font-black leading-[0.92] tracking-[-0.02em] text-gradient-blue"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 6rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
        >
          {titleGradient}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          className="font-body text-base leading-relaxed mt-5 max-w-lg"
          style={{ color: "#94A3B8" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className={`mt-8 w-14 h-px ${center ? "mx-auto" : ""}`}
        style={{ background: "linear-gradient(90deg, #2563EB, #38BDF8)" }}
        initial={{ scaleX: 0, originX: center ? 0.5 : 0 }}
        animate={inV ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
      />
    </div>
  );
}
