"use client";

const ITEMS = [
  "Python", "Django", "Next.js", "React", "TypeScript",
  "AI Avtomatika", "Telegram Bot", "E-Commerce",
  "EduTech", "GreenTech", "PostgreSQL", "REST API",
  "Docker", "Linux", "OpenAI", "Celery",
];

const DOUBLED = [...ITEMS, ...ITEMS];

export default function MarqueeBand() {
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        background: "#071827",
        borderTop:    "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Fade masks */}
      <div
        className="absolute left-0 inset-y-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #071827, transparent)" }}
      />
      <div
        className="absolute right-0 inset-y-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #071827, transparent)" }}
      />

      <div className="flex items-center animate-marquee whitespace-nowrap will-change-transform">
        {DOUBLED.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span
              className="font-mono text-[10px] tracking-[0.35em] uppercase px-5"
              style={{ color: "#334155" }}
            >
              {item}
            </span>
            <span style={{ color: "#D4AF37", fontSize: "6px", opacity: 0.55 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
