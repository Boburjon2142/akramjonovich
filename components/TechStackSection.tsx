"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GROUPS = [
  {
    title: "Backend",
    icon: "🐍",
    accent: "#3B82F6",
    skills: [
      { name: "Python",                  level: 95 },
      { name: "Django",                  level: 92 },
      { name: "Django REST Framework",   level: 90 },
      { name: "FastAPI",                 level: 70 },
      { name: "PostgreSQL",              level: 85 },
      { name: "SQLite",                  level: 90 },
    ],
  },
  {
    title: "Frontend",
    icon: "🎨",
    accent: "#00F5FF",
    skills: [
      { name: "HTML5 / CSS3",            level: 90 },
      { name: "JavaScript",              level: 80 },
      { name: "Tailwind CSS",            level: 85 },
      { name: "Bootstrap",               level: 88 },
      { name: "React (asoslar)",         level: 72 },
      { name: "Responsive UI",           level: 93 },
    ],
  },
  {
    title: "Tools & Deploy",
    icon: "⚙️",
    accent: "#8B5CF6",
    skills: [
      { name: "Git / GitHub",            level: 90 },
      { name: "VS Code",                 level: 95 },
      { name: "Linux basics",            level: 75 },
      { name: "PythonAnywhere",          level: 85 },
      { name: "Netlify / Vercel",        level: 80 },
      { name: "aHost",                   level: 82 },
    ],
  },
  {
    title: "AI & Automation",
    icon: "🤖",
    accent: "#10B981",
    skills: [
      { name: "Telegram Bot API",        level: 92 },
      { name: "AI workflow",             level: 80 },
      { name: "Prompt engineering",      level: 82 },
      { name: "API integration",         level: 88 },
      { name: "Biznes avtomatika",       level: 85 },
    ],
  },
] as const;

function SkillBar({
  name,
  level,
  accent,
  inView,
  delay,
}: {
  name: string;
  level: number;
  accent: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px]"
          style={{ color: "var(--text-muted)" }}
        >
          {name}
        </span>
        <span
          className="font-mono text-[9px]"
          style={{ color: `${accent}99` }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-[2px] rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.0, delay, ease: [0.33, 1, 0.68, 1] }}
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent}77)`,
          }}
        />
      </div>
    </div>
  );
}

function GroupCard({
  group,
  index,
  inView,
}: {
  group: (typeof GROUPS)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.1 + index * 0.1,
        ease: [0.33, 1, 0.68, 1],
      }}
      className="flex flex-col gap-5 p-6 rounded-xl transition-all duration-350 cursor-default"
      style={{
        background: "rgba(13,13,20,0.65)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${group.accent}28`;
        el.style.background = "rgba(13,13,20,0.9)";
        el.style.boxShadow = `0 0 50px ${group.accent}0d`;
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.background = "rgba(13,13,20,0.65)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: `${group.accent}14`,
            border: `1px solid ${group.accent}28`,
          }}
        >
          {group.icon}
        </div>
        <div>
          <p
            className="font-display font-bold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {group.title}
          </p>
          <div
            className="mt-1 h-[2px] w-8 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${group.accent}, transparent)`,
            }}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-3">
        {group.skills.map((skill, si) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            accent={group.accent}
            inView={inView}
            delay={0.3 + index * 0.1 + si * 0.04}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="texnologiyalar"
      className="relative py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--void) 0%, var(--surface) 50%, var(--void) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] orb pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,245,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="badge-cyan">
                <span
                  className="w-1 h-1 rounded-full inline-block"
                  style={{ background: "var(--cyan)" }}
                />
                03 — Texnologiyalar
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display font-bold tracking-[-0.025em] leading-tight"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
                color: "var(--text-primary)",
              }}
            >
              Texnologiyalar
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="font-body text-base mt-3 leading-[1.75]"
              style={{ color: "var(--text-muted)" }}
            >
              Har bir loyiha maqsadiga mos texnologiya bilan quriladi.
              Quyida asosiy vositalarim.
            </motion.p>
          </div>

          {/* Stats pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inV ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
            style={{
              background: "rgba(0,245,255,0.05)",
              border: "1px solid rgba(0,245,255,0.12)",
              borderRadius: "8px",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
              style={{ background: "var(--cyan)", boxShadow: "0 0 6px rgba(0,245,255,0.7)" }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--cyan)" }}
            >
              10+ texnologiya
            </span>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {GROUPS.map((g, i) => (
            <GroupCard key={g.title} group={g} index={i} inView={inV} />
          ))}
        </div>

      </div>
    </section>
  );
}
