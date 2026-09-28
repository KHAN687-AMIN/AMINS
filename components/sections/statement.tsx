"use client";

import { useEffect, useRef, Suspense } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import RingsScene from "@/components/three/RingsScene";

const words = ["Code", "Design", "Motion", "Systems"];

export function Statement() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reduced) {
      gsap.set("[data-statement-word]", { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-statement-word]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 60%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh items-center overflow-hidden"
      aria-label="Statement"
    >
      {/* 3D Rings — background */}
      <Suspense fallback={null}>
        <RingsScene />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink via-transparent to-ink" aria-hidden />

      <div className="container-x relative z-10">
        <p className="mb-12 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40">
          What I do
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {words.map((word, i) => (
            <div
              key={word}
              data-statement-word
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
