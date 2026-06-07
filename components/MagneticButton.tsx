"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  target?: string;
  type?: "button" | "submit";
}

const STYLES: Record<string, React.CSSProperties> = {
  primary: {
    background: "#2563EB",
    boxShadow: "0 0 24px rgba(37,99,235,0.45), 0 0 60px rgba(37,99,235,0.15)",
    color: "#fff",
  },
  ghost: {
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.02)",
    color: "#94A3B8",
  },
  outline: {
    border: "1px solid rgba(37,99,235,0.4)",
    background: "transparent",
    color: "#38BDF8",
  },
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  target,
  type = "button",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left - r.width / 2) * 0.32,
      y: (e.clientY - r.top - r.height / 2) * 0.32,
    });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  const shared = {
    className: `inline-flex items-center gap-3 px-7 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase transition-all duration-300 ${className}`,
    style: STYLES[variant],
    animate: { x: pos.x, y: pos.y },
    transition: { type: "spring" as const, stiffness: 180, damping: 18 },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (href) {
    return (
      <motion.a
        {...shared}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...shared}
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}
