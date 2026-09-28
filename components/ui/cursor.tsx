"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type CursorLabel = "" | "VIEW" | "OPEN" | "DRAG";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const setLabel = (text: CursorLabel) => {
      gsap.to(label, {
        opacity: text ? 1 : 0,
        duration: 0.15,
        overwrite: true,
        onStart: () => {
          if (text) label.textContent = text;
        },
      });
    };

    const setScale = (scale: number) => {
      gsap.to(ring, {
        scale,
        duration: 0.25,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const onOver = (e: Event) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (!target) {
        setLabel("");
        setScale(1);
        gsap.to(dot, { scale: 1, duration: 0.2, overwrite: true });
        return;
      }
      const cursorType = target.dataset.cursor as CursorLabel;
      setLabel(cursorType ?? "");
      setScale(cursorType ? 2.4 : 1.3);
      gsap.to(dot, { scale: 0.2, duration: 0.2, overwrite: true });
    };

    const onOut = (e: Event) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (!target) return;
      gsap.to(dot, { scale: 1, duration: 0.2, overwrite: true });
      if (!target.dataset.cursor) setScale(1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] hidden [@media(pointer:fine)]:block"
    >
      {/* Center dot — always visible */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-paper mix-blend-difference"
      />
      {/* Trailing ring with label */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-paper/50 mix-blend-difference"
      >
        <span
          ref={labelRef}
          className="font-sans text-[7px] font-medium uppercase tracking-[0.1em] text-paper opacity-0"
        />
      </div>
    </div>
  );
}
