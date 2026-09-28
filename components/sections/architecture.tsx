"use client";

import { useEffect, useRef, Suspense } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import ArchitectureScene from "@/components/three/ArchitectureScene";

const words = ["Structure", "System", "Interaction", "Experience"];

export function Architecture() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reduced) {
      gsap.set("[data-arch-word]", { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-arch-word]",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 55%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh items-center overflow-hidden"
      aria-label="Digital architecture"
    >
      {/* 3D Architecture — background */}
      <Suspense fallback={null}>
        <ArchitectureScene />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink via-ink/60 to-ink" aria-hidden />

      <div className="container-x relative z-10">
        <p className="mb-12 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40">
          Digital Architecture
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {words.map((word, i) => (
            <div
              key={word}
              data-arch-word
              className="border-l border-line-light pl-6"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-champagne/60">
                0{i + 1}
              </p>
              <p className="mt-3 font-display text-3xl font-light tracking-tightest text-paper sm:text-4xl">
                {word}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
