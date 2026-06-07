// ─── Class merging ────────────────────────────────────────────────────────────
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ─── Framer Motion variants ───────────────────────────────────────────────────
export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.33, 1, 0.68, 1] as const },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  },
});

export const slideUp = (delay = 0) => ({
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay, ease: [0.33, 1, 0.68, 1] as const },
  },
});

export const staggerContainer = (staggerChildren = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});

// ─── Smooth scroll ────────────────────────────────────────────────────────────
export function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Date formatting ──────────────────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
