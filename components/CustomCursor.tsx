"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const spotRef     = useRef<HTMLDivElement>(null);
  const pos         = useRef({ x: -500, y: -500 });
  const ringPos     = useRef({ x: -500, y: -500 });
  const spotPos     = useRef({ x: -500, y: -500 });
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    const loop = () => {
      // Ring: medium lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }

      // Spotlight: very slow lag (cinematic)
      spotPos.current.x += (pos.current.x - spotPos.current.x) * 0.06;
      spotPos.current.y += (pos.current.y - spotPos.current.y) * 0.06;
      if (spotRef.current) {
        spotRef.current.style.left = `${spotPos.current.x}px`;
        spotRef.current.style.top  = `${spotPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      if (dotRef.current) {
        dotRef.current.style.width = "8px";
        dotRef.current.style.height = "8px";
        dotRef.current.style.background = "#38BDF8";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "52px";
        ringRef.current.style.height = "52px";
        ringRef.current.style.borderColor = "rgba(56,189,248,0.7)";
      }
      if (spotRef.current) {
        spotRef.current.style.opacity = "1.4";
      }
    };

    const onLeave = () => {
      if (dotRef.current) {
        dotRef.current.style.width = "5px";
        dotRef.current.style.height = "5px";
        dotRef.current.style.background = "#38BDF8";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "rgba(56,189,248,0.4)";
      }
      if (spotRef.current) {
        spotRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    const targets = document.querySelectorAll("a, button, [data-hover]");
    targets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={spotRef} className="cursor-spotlight hidden md:block" />
      <div ref={ringRef}  className="cursor-ring  hidden md:block" />
      <div ref={dotRef}   className="cursor-dot   hidden md:block" />
    </>
  );
}
