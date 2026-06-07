"use client";

const STATEMENTS = [
  "DESIGN WITH PURPOSE",
  "CODE WITH PASSION",
  "AUTOMATE WITH AI",
  "BUILD FOR BUSINESS",
  "SCALE WITH STRATEGY",
];

function Track() {
  return (
    <div className="flex items-center shrink-0">
      {STATEMENTS.map((s, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-display font-bold tracking-[0.14em] uppercase px-1 transition-colors duration-300 cursor-default"
            style={{ fontSize: "clamp(0.8rem, 1.4vw, 1rem)", color: "var(--text-faint)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-faint)")}
          >
            {s}
          </span>
          <span
            className="mx-6 text-xs"
            style={{ color: "var(--cyan)", opacity: 0.4 }}
          >
            ◆
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative py-5 overflow-hidden border-y"
      style={{
        background: "var(--surface)",
        borderColor: "rgba(0,245,255,0.04)",
      }}
    >
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--surface), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--surface), transparent)" }}
      />

      <div className="flex animate-marquee whitespace-nowrap">
        <Track />
        <Track />
        <Track />
      </div>
    </div>
  );
}
