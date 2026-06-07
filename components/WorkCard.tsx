"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  desc: string;
  tags: readonly string[];
  accent: string;
  status: string;
}

export default function WorkCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="group relative border-b cursor-default"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent hover bg */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `${project.accent}08` }}
      />

      <div className="relative z-10 flex items-center py-7 px-1 gap-5">
        {/* Number */}
        <span
          className="font-mono text-[10px] w-7 shrink-0"
          style={{ color: project.accent }}
        >
          {project.number}
        </span>

        {/* Title + expandable desc */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-display font-bold text-white text-lg tracking-tight">
              {project.title}
            </h3>
            <span
              className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5"
              style={{
                color: project.accent,
                border: `1px solid ${project.accent}35`,
                background: `${project.accent}0d`,
              }}
            >
              {project.status}
            </span>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="font-body text-sm leading-relaxed overflow-hidden"
                style={{ color: "#64748B" }}
              >
                {project.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Category */}
        <span
          className="hidden sm:block font-mono text-[10px] tracking-[0.2em] uppercase shrink-0"
          style={{ color: "#334155" }}
        >
          {project.category}
        </span>

        {/* Year */}
        <span
          className="hidden md:block font-mono text-[10px] shrink-0"
          style={{ color: "#1e3a5f" }}
        >
          {project.year}
        </span>

        {/* Tech tags on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:flex gap-2 shrink-0"
            >
              {project.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[9px] px-2 py-0.5 tracking-wide"
                  style={{
                    color: "#38BDF8",
                    border: "1px solid rgba(56,189,248,0.2)",
                    background: "rgba(56,189,248,0.05)",
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrow button */}
        <motion.div
          animate={{ background: hovered ? "#ffffff" : "transparent" }}
          transition={{ duration: 0.25 }}
          className="w-9 h-9 flex items-center justify-center shrink-0"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ArrowUpRight
            size={14}
            style={{ color: hovered ? "#030712" : "#475569" }}
            className="transition-colors duration-200"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
