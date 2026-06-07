"use client";

import { useId } from "react";

export default function LogoIcon({ size = 36 }: { size?: number }) {
  const raw = useId();
  const u = raw.replace(/[^a-zA-Z0-9]/g, "");

  const rg = `rg${u}`;
  const cg = `cg${u}`;
  const bg = `bg${u}`;
  const ug = `ug${u}`;
  const ig = `ig${u}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        {/* Ring: cyan top-left → purple/magenta bottom-right */}
        <linearGradient id={rg} x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#00F0FF" />
          <stop offset="50%"  stopColor="#2563EB" />
          <stop offset="100%" stopColor="#9B2FFF" />
        </linearGradient>

        {/* Chevron: bright cyan → sky blue */}
        <linearGradient id={cg} x1="11" y1="17" x2="43" y2="83" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#00EEFF" />
          <stop offset="100%" stopColor="#1A90FF" />
        </linearGradient>

        {/* B: blue → purple */}
        <linearGradient id={bg} x1="47" y1="17" x2="65" y2="83" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1A72FF" />
          <stop offset="100%" stopColor="#8B2FFF" />
        </linearGradient>

        {/* Underscore: blue → purple */}
        <linearGradient id={ug} x1="28" y1="70" x2="58" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1A90FF" />
          <stop offset="100%" stopColor="#7B2FFF" />
        </linearGradient>

        {/* Inner radial glow (blue-left side) */}
        <radialGradient id={ig} cx="36%" cy="50%" r="52%">
          <stop offset="0%"   stopColor="#0B2255" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#030A16" stopOpacity="0"   />
        </radialGradient>
      </defs>

      {/* ── Background ── */}
      <circle cx="50" cy="50" r="49" fill="#050D1A" />
      <circle cx="50" cy="50" r="49" fill={`url(#${ig})`} />

      {/* ── Ring – outer glow ── */}
      <circle
        cx="50" cy="50" r="46"
        fill="none" stroke={`url(#${rg})`} strokeWidth="12"
        opacity="0.5" style={{ filter: "blur(9px)" }}
      />
      {/* ── Ring – sharp ── */}
      <circle
        cx="50" cy="50" r="46"
        fill="none" stroke={`url(#${rg})`} strokeWidth="1.8"
      />

      {/* ── Chevron ">" – glow ── */}
      <polyline
        points="11,17 43,50 11,83"
        fill="none"
        stroke={`url(#${cg})`}
        strokeWidth="24"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        opacity="0.3"
        style={{ filter: "blur(11px)" }}
      />
      {/* ── Chevron ">" – sharp ── */}
      <polyline
        points="11,17 43,50 11,83"
        fill="none"
        stroke={`url(#${cg})`}
        strokeWidth="14"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />

      {/* ── Underscore – glow ── */}
      <rect
        x="28" y="66" width="30" height="7" rx="1.5"
        fill={`url(#${ug})`} opacity="0.4"
        style={{ filter: "blur(5px)" }}
      />
      {/* ── Underscore – sharp ── */}
      <rect
        x="28" y="66" width="30" height="7" rx="1.5"
        fill={`url(#${ug})`}
      />

      {/* ── Letter "B" – glow ── */}
      <path
        d="M47,17 H63 A14,16.5 0 0 1 63,50 L47,50 L65,50 A16,16 0 0 1 65,83 H47 Z"
        fill={`url(#${bg})`} opacity="0.3"
        style={{ filter: "blur(9px)" }}
      />
      {/* ── Letter "B" – sharp ── */}
      <path
        d="M47,17 H63 A14,16.5 0 0 1 63,50 L47,50 L65,50 A16,16 0 0 1 65,83 H47 Z"
        fill={`url(#${bg})`}
      />
    </svg>
  );
}
