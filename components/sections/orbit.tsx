"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const NODES = ["Next.js", "React", "GSAP", "TypeScript", "Node.js", "MongoDB", "Motion", "UI/UX"];

export function Orbit() {
  const rootRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0.018);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const rafRef = useRef(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    if (!root || !ring) return;

    const size = () => Math.min(root.clientWidth, root.clientHeight) * 0.88;
    const radius = () => size() / 2 - 24;

    const positionNodes = () => {
      const r = radius();
      const nodes = ring.querySelectorAll<HTMLElement>("[data-orbit-node]");
      nodes.forEach((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 + angleRef.current;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r * 0.58;
        const depth = (Math.sin(angle) + 1) / 2;
        node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${0.8 + depth * 0.3})`;
        node.style.zIndex = String(Math.round(depth * 10));
        node.style.opacity = String(0.3 + depth * 0.7);
      });
    };

    const tick = () => {
      if (!draggingRef.current) {
        angleRef.current += velocityRef.current;
        velocityRef.current += (0.018 - velocityRef.current) * 0.015;
      }
      positionNodes();
      rafRef.current = requestAnimationFrame(tick);
    };

    if (reduced) {
      positionNodes();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      if (draggingRef.current) return;
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      velocityRef.current = 0.018 + x * 0.045;
    };

    const onDown = (e: PointerEvent) => {
      draggingRef.current = true;
      lastXRef.current = e.clientX;
      velocityRef.current = 0;
      root.setPointerCapture(e.pointerId);
    };
    const onDrag = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      angleRef.current += dx * 0.005;
      velocityRef.current = dx * 0.0011;
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    root.addEventListener("mousemove", onMove, { passive: true });
    root.addEventListener("pointerdown", onDown, { passive: true });
    root.addEventListener("pointermove", onDrag, { passive: true });
    root.addEventListener("pointerup", onUp, { passive: true });
    root.addEventListener("pointercancel", onUp, { passive: true });

    const ro = new ResizeObserver(positionNodes);
    ro.observe(root);

    return () => {
      cancelAnimationFrame(rafRef.current);
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onDrag);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      ro.disconnect();
    };
  }, [reduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-orbit-visual]",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative select-none overflow-hidden py-28 sm:py-40"
      aria-label="Digital gravity"
      data-cursor="DRAG"
    >
      <div className="container-x">
        <div className="mb-4 flex items-end justify-between">
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-paper/40 sm:text-[11px]">
            Digital Gravity
          </p>
          <p className="hidden font-display text-[10px] uppercase tracking-[0.3em] text-paper/30 sm:block">
            Drag to rotate
          </p>
        </div>
      </div>

      <div data-orbit-visual className="relative mx-auto aspect-square w-full max-w-[860px]">
        {/* Elliptical guides */}
        <div
          className="absolute left-1/2 top-1/2 h-[88%] w-[88%] rounded-full border border-paper/10"
          style={{ transform: "translate(-50%, -50%) scaleY(0.58)" }}
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-1/2 h-[58%] w-[58%] rounded-full border border-paper/[0.07]"
          style={{ transform: "translate(-50%, -50%) scaleY(0.58)" }}
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-1/2 h-[28%] w-[28%] rounded-full border border-paper/[0.05]"
          style={{ transform: "translate(-50%, -50%) scaleY(0.58)" }}
          aria-hidden
        />

        {/* Rotating node field */}
        <div ref={ringRef} className="absolute inset-0">
          {NODES.map((label) => (
            <button
              key={label}
              data-orbit-node
              className="absolute left-1/2 top-1/2 font-display text-[10px] font-medium uppercase tracking-[0.2em] text-paper sm:text-xs"
              style={{ transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(label)}
              onBlur={() => setHovered(null)}
            >
              <span className={`transition-colors duration-300 ${hovered === label ? "text-ember" : ""}`}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Center — the gravity well */}
        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
          aria-hidden
        >
          <span className="font-display text-xl font-medium uppercase tracking-[0.18em] text-paper sm:text-3xl">
            Code
          </span>
          <span className="font-serif text-base italic text-paper/45 sm:text-lg">×</span>
          <span className="font-display text-xl font-medium uppercase tracking-[0.18em] text-paper sm:text-3xl">
            Motion
          </span>
          <span className="font-serif text-base italic text-paper/45 sm:text-lg">×</span>
          <span className="font-display text-xl font-medium uppercase tracking-[0.18em] text-paper sm:text-3xl">
            Design
          </span>
        </div>
      </div>

      <div className="container-x mt-4 flex justify-center">
        <p className="h-5 font-display text-[11px] uppercase tracking-[0.25em] text-ember" aria-live="polite">
          {hovered ?? ""}
        </p>
      </div>
    </section>
  );
}
