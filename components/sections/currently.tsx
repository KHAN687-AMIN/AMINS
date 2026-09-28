"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Reveal } from "@/components/ui/reveal";

export function Currently() {
  const rootRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !dotRef.current) return;
    const pulse = gsap.to(dotRef.current, {
      opacity: 0.25,
      scale: 0.7,
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      pulse.kill();
    };
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative py-24 sm:py-32" aria-label="Currently building">
      <div className="container-x">
        <Reveal>
          <div className="flex items-center gap-4">
            <span ref={dotRef} className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ember" />
            </span>
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-paper/50 sm:text-[11px]">
              Currently building
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-paper sm:text-3xl lg:text-4xl">
            Exploring the intersection of AI, interaction design, motion and full-stack web development.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
