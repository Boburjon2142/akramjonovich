"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  accent: string;
  status: string;
  year: string;
  vtype: string;
  url?: string;
  categoryLabel?: string;
  yearLabel?: string;
}

/* ─── Abstract CSS visuals ──────────────────────────────────────────────────── */

function BookstoreVisual({ accent }: { accent: string }) {
  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden">
      <Image
        src="/images/projects/bilimstore.png"
        alt="Bilim Uz Bookstore bosh sahifasi"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 66vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,8,0.02) 45%, rgba(5,5,8,0.34) 100%)",
          boxShadow: `inset 0 0 50px ${accent}10`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`,
        }}
      />
    </div>
  );
}

function MarketplaceVisual({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2 flex-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-sm flex items-end justify-end p-1"
            style={{
              background: i % 3 === 0 ? `${accent}20` : i % 3 === 1 ? `${accent}12` : `${accent}0a`,
              border: `1px solid ${accent}15`,
              aspectRatio: "1",
            }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: `${accent}45` }} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pt-2" style={{ borderTop: `1px solid ${accent}12` }}>
        <div className="flex -space-x-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-5 h-5 rounded-full" style={{ background: `${accent}${30 + i * 10}`, border: "2px solid var(--void)" }} />
          ))}
        </div>
        <span className="font-mono text-[9px]" style={{ color: accent }}>128 artists</span>
      </div>
    </div>
  );
}

function QRVisual({ accent }: { accent: string }) {
  const grid = Array.from({ length: 49 }, (_, i) =>
    [0, 2, 4, 6, 8, 14, 16, 18, 21, 25, 27, 32, 35, 40, 42, 44, 46, 48].includes(i)
  );
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-7 gap-0.5">
          {grid.map((dark, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ background: dark ? accent : `${accent}10` }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          <span className="font-mono text-[9px]" style={{ color: accent }}>Scan to visit</span>
        </div>
      </div>
    </div>
  );
}

function GeoVisual({ accent }: { accent: string }) {
  const pins = [{ x: "25%", y: "30%" }, { x: "55%", y: "45%" }, { x: "70%", y: "25%" }, { x: "40%", y: "65%" }];
  return (
    <div className="w-full h-full relative p-4">
      <div className="absolute inset-4 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute inset-x-0 h-px" style={{ top: `${25 * i + 12}%`, background: `${accent}10` }} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute inset-y-0 w-px" style={{ left: `${25 * i + 12}%`, background: `${accent}10` }} />
        ))}
      </div>
      {pins.map((p, i) => (
        <div key={i} className="absolute flex flex-col items-center" style={{ left: p.x, top: p.y }}>
          <div className="w-3 h-3 rounded-full border-2" style={{ background: `${accent}28`, borderColor: accent }} />
          <div className="w-px h-3" style={{ background: accent }} />
          {i === 1 && (
            <div className="absolute -top-7 glass-navy px-2 py-1 text-[8px] font-mono whitespace-nowrap" style={{ color: accent }}>
              +3 orders
            </div>
          )}
        </div>
      ))}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="25%" y1="30%" x2="55%" y2="45%" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3 3" />
        <line x1="55%" y1="45%" x2="70%" y2="25%" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

function AnalyticsVisual({ accent }: { accent: string }) {
  const bars = [55, 72, 48, 90, 65, 82, 70, 95];
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-wider" style={{ color: "var(--text-faint)" }}>SALES FORECAST</span>
        <span className="font-mono text-[10px]" style={{ color: "#10B981" }}>AI ↑</span>
      </div>
      <div className="flex items-end gap-1.5 flex-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
            <div
              className="rounded-sm w-full"
              style={{ height: `${h}%`, background: i === 7 ? accent : i >= 5 ? `${accent}75` : `${accent}28` }}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["Reorder AI", "Stock Alert"].map((label, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-sm" style={{ background: `${accent}0c` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <span className="font-mono text-[8px]" style={{ color: "var(--text-faint)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatlyImageVisual({ accent }: { accent: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src="/images/projects/statly.png"
        alt="STATLY AI funksiyalari boshqaruv paneli"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 65%, rgba(5,5,8,0.2) 100%)",
          boxShadow: `inset 0 0 35px ${accent}0d`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)` }}
      />
    </div>
  );
}

function BotVisual({ accent }: { accent: string }) {
  const messages = [
    { text: "📚 Bugun necha bet o'qidingiz?", left: true },
    { text: "15 bet", left: false },
    { text: "✅ Jami: 142 bet. Streak: 12 kun!", left: true },
  ];
  return (
    <div className="w-full h-full p-5 flex flex-col justify-center gap-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
          style={{ background: `${accent}22`, border: `1px solid ${accent}28` }}>🤖</div>
        <span className="font-mono text-[9px]" style={{ color: accent }}>BilimTrackerBot</span>
        <div className="w-1.5 h-1.5 rounded-full ml-auto" style={{ background: "#10B981" }} />
      </div>
      {messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.left ? "justify-start" : "justify-end"}`}>
          <div
            className="font-mono text-[9px] px-2.5 py-1.5 max-w-[80%] rounded-sm"
            style={{
              background: msg.left ? `${accent}12` : `${accent}30`,
              border: `1px solid ${accent}18`,
              color: msg.left ? "var(--text-muted)" : "var(--text-primary)",
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function SpendlyVisual({ accent }: { accent: string }) {
  const groups = [
    {
      title: "Oylik to'lovlar",
      items: ["Abonent to'lovi - 25 000 so'm", "Kommunal - 50 000 so'm"],
    },
    {
      title: "Ro'zg'or",
      items: ["Bozorlik - 72 000 so'm", "Non - 10 000 so'm", "Pomidor - 25 000 so'm"],
    },
  ];

  return (
    <div className="w-full h-full p-3">
      <div
        className="h-full rounded-md p-3 flex flex-col gap-2 overflow-hidden"
        style={{
          background: "rgba(10, 15, 30, 0.75)",
          border: "1px solid rgba(0, 255, 255, 0.15)",
          boxShadow: "0 0 22px rgba(0, 255, 255, 0.06), inset 0 0 18px rgba(124, 58, 237, 0.05)",
        }}
      >
        <div className="flex items-center gap-2 pb-2 border-b border-white/5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0"
            style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
          >
            💸
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] font-semibold text-white leading-none">Spendly</div>
            <div className="font-mono text-[7px] uppercase tracking-[0.22em] mt-1" style={{ color: accent }}>bot</div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full ml-auto shadow-[0_0_8px_#10B981]" style={{ background: "#10B981" }} />
        </div>

        <div className="grid grid-cols-2 gap-2 min-h-0">
          {groups.map((group) => (
            <div key={group.title} className="min-w-0">
              <div className="font-mono text-[8px] font-semibold mb-1" style={{ color: accent }}>
                📁 {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <div key={item} className="font-mono text-[7px] leading-[1.35] truncate" style={{ color: "var(--text-muted)" }}>
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-auto font-mono text-[8px] font-semibold px-2 py-1.5 rounded-sm"
          style={{ color: "#A5F3FC", background: `${accent}10`, border: `1px solid ${accent}18` }}
        >
          💰 Umumiy jami: 2 957 035 so'm
        </div>
      </div>
    </div>
  );
}

const makeVisual = (type: string, accent: string) => {
  switch (type) {
    case "bookstore":   return <BookstoreVisual accent={accent} />;
    case "marketplace": return <MarketplaceVisual accent={accent} />;
    case "qr":          return <QRVisual accent={accent} />;
    case "geo":         return <GeoVisual accent={accent} />;
    case "analytics":   return <StatlyImageVisual accent={accent} />;
    case "bot":         return <SpendlyVisual accent={accent} />;
    default:            return null;
  }
};

const RAW: Project[] = [
  {
    id: "bilim-uz", num: "01", title: "Bilim Uz Bookstore",
    category: "E-COMMERCE • DJANGO", year: "2024",
    desc: "Kitob do'koni uchun katalog, savat, checkout, yetkazib berish zonasi va admin panel.",
    tags: ["Django", "Next.js", "PostgreSQL"], accent: "#00F5FF", status: "Live", vtype: "bookstore",
    url: "https://bilimstore.uz/",
  },
  {
    id: "artar-uz", num: "02", title: "Artar.uz",
    category: "MARKETPLACE • WEB PLATFORM", year: "2024",
    desc: "Rassomlar va san'at asarlari uchun profil, e'lon, qidiruv va reyting tizimi.",
    tags: ["Next.js", "Django", "Search"], accent: "#7C3AED", status: "Live", vtype: "marketplace",
  },
  {
    id: "muslim-qr", num: "03", title: "Muslim QR",
    category: "QR PLATFORM • PRIVACY", year: "2024",
    desc: "Xotira sahifalari uchun QR asosidagi shaxsiy sahifa va media platforma.",
    tags: ["Next.js", "QR", "Media"], accent: "#10B981", status: "Live", vtype: "qr",
  },
  {
    id: "ustago", num: "04", title: "Ustago",
    category: "SERVICE MARKETPLACE • GEO", year: "2024",
    desc: "Usta va mijozlarni bog'lovchi buyurtma va hududga asoslangan platforma.",
    tags: ["Django", "Maps", "React"], accent: "#F59E0B", status: "Live", vtype: "geo",
  },
  {
    id: "statly", num: "05", title: "STATLY",
    category: "RETAIL • AI ANALYTICS", year: "2024",
    desc: "Chakana savdo uchun AI xulosa, qayta buyurtma tavsiyasi va monitoring konsepti.",
    tags: ["AI", "FastAPI", "Next.js"], accent: "#00F5FF", status: "Concept", vtype: "analytics",
  },
  {
    id: "spendly", num: "06", title: "Spendly",
    categoryLabel: "TELEGRAM BOT · FINANCE TRACKING",
    yearLabel: "2026",
    url: "https://t.me/spendsumbot",
    category: "TELEGRAM BOT • TRACKING", year: "2023",
    desc: "Shaxsiy xarajatlarni yozib borish, kategoriyalar bo'yicha hisoblash va oylik hisobot chiqarish uchun Telegram bot.",
    tags: ["Python", "Aiogram", "SQLite", "Telegram Bot"], accent: "#00F5FF", status: "Live", vtype: "bot",
  },
];

/* ─── Card ──────────────────────────────────────────────────────────────────── */

function ProjectCard({
  p,
  index,
  featured = false,
  style,
}: {
  p: Project;
  index: number;
  featured?: boolean;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const visH = featured ? "100%" : 160;

  return (
    <motion.a
      href={p.url}
      target={p.url ? "_blank" : undefined}
      rel={p.url ? "noopener noreferrer" : undefined}
      aria-label={p.url ? `${p.title} saytini ochish` : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer flex flex-col glass-navy overflow-hidden h-full"
      style={{
        borderColor: hovered ? "rgba(0, 255, 255, 0.45)" : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? "0 0 30px rgba(0, 255, 255, 0.12)" : "0 0 0 rgba(0, 0, 0, 0)",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual */}
      <div
        className="relative overflow-hidden flex-1"
        style={{
          minHeight: typeof visH === "number" ? visH : undefined,
          background: `linear-gradient(135deg, ${p.accent}0c 0%, var(--surface) 100%)`,
          borderBottom: `1px solid ${p.accent}15`,
        }}
      >
        <motion.div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}40)` }}
          animate={{ opacity: hovered ? 1 : 0.3 }}
        />
        <motion.div
          className="w-full h-full"
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {makeVisual(p.vtype, p.accent)}
        </motion.div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(5,5,8,0.55)", backdropFilter: "blur(4px)" }}
            >
              <div
                className="flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase"
                style={{
                  color: p.accent,
                  border: `1px solid ${p.accent}45`,
                  background: `${p.accent}0f`,
                }}
              >
                View Case <ArrowUpRight size={12} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className={`flex flex-col gap-2.5 ${featured ? "p-7" : "p-5"}`}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: p.accent }}>
            {p.categoryLabel ?? p.category}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5"
              style={{
                color: p.status === "Live" ? "#10B981" : "#F59E0B",
                border: `1px solid ${p.status === "Live" ? "rgba(16,185,129,0.22)" : "rgba(245,158,11,0.22)"}`,
                background: `${p.status === "Live" ? "rgba(16,185,129,0.06)" : "rgba(245,158,11,0.06)"}`,
              }}
            >
              {p.status}
            </span>
            <span className="font-mono text-[9px]" style={{ color: "var(--text-faint)" }}>{p.yearLabel ?? p.year}</span>
          </div>
        </div>

        <h3
          className="font-display font-semibold tracking-tight"
          style={{
            color: "var(--text-primary)",
            fontSize: featured ? "1.2rem" : "1rem",
          }}
        >
          {p.title}
        </h3>

        {(featured || p.id === "spendly") && (
          <p
            className={`font-body leading-relaxed ${p.id === "spendly" ? "text-[10px]" : "text-sm"}`}
            style={{ color: "var(--text-muted)" }}
          >
            {p.desc}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {p.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] px-2 py-0.5"
              style={{
                color: "var(--text-faint)",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────────── */

export default function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="loyihalar"
      className="relative py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--void)" }}
    >
      {/* Orb */}
      <div
        className="absolute right-0 top-1/3 w-[600px] h-[600px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)" }}
      />

      <div ref={ref} className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[9px] tracking-[0.35em] uppercase"
                style={{
                  background: "rgba(37,99,235,0.08)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  color: "#3B82F6",
                }}
              >
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#3B82F6" }} />
                Loyihalarim
              </div>
            </motion.div>

            <motion.a
              href="#aloqa"
              initial={{ opacity: 0 }}
              animate={inV ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-200 shrink-0 mt-1"
              style={{ color: "var(--text-faint)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#3B82F6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-faint)")}
              onClick={(e) => { e.preventDefault(); document.querySelector("#aloqa")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Barcha loyihalar
              <ArrowUpRight size={13} />
            </motion.a>
          </div>

          <motion.h2
            className="font-display font-bold leading-[0.93] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)", color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          >
            Har bir loyiha oddiy koddan emas,
          </motion.h2>
          <motion.h2
            className="font-display font-bold leading-[0.93] tracking-[-0.02em] text-gradient-blue"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          >
            muammoni tushunishdan boshlanadi.
          </motion.h2>
        </div>

        {/* ── Bento grid — desktop ── */}
        <motion.div
          className="hidden md:grid gap-4 mt-8"
          style={{
            gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
            gridTemplateRows: "310px 310px",
            gridTemplateAreas: `
              "bilim statly"
              "bilim tracker"
            `,
          }}
          initial={{ opacity: 0 }}
          animate={inV ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div style={{ gridArea: "bilim" }}>
            <ProjectCard p={RAW[0]} index={0} featured />
          </div>
          <div style={{ gridArea: "statly", height: "100%" }}>
            <ProjectCard p={RAW[4]} index={1} />
          </div>
          <div style={{ gridArea: "tracker", height: "100%" }}>
            <ProjectCard p={RAW[5]} index={2} />
          </div>
        </motion.div>

        {/* ── Stacked — mobile ── */}
        <div className="md:hidden flex flex-col gap-4 mt-8">
          {[RAW[0], RAW[4], RAW[5]].map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} featured={p.id === "bilim-uz"} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inV ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center gap-3"
        >
          <div className="w-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: "var(--text-faint)" }}>
            Barcha loyihalar NDA ostida yoki ochiq manbada mavjud
          </span>
        </motion.div>
      </div>
    </section>
  );
}
