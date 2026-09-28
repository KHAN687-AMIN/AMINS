"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TECH = [
  "Next.js", "React", "TypeScript", "JavaScript", "GSAP",
  "Three.js", "Node.js", "MongoDB", "Tailwind", "Git", "Vercel",
];

export function Technology() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-tech-item]",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative py-28 sm:py-40" aria-label="Technology">
      <div className="container-x">
        <div className="mb-14 sm:mb-20">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40">
            Technology
          </p>
          <h2 className="font-display text-5xl font-light uppercase leading-[0.9] tracking-tightest text-paper sm:text-7xl lg:text-8xl">
            The Stack
          </h2>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-5 border-t border-line-light pt-10 sm:gap-x-14 sm:pt-14">
          {TECH.map((item, i) => (
            <span
              key={item}
              data-tech-item
              className={`font-display font-light uppercase tracking-tightest transition-colors duration-300 hover:text-champagne ${
                i % 3 === 0
                  ? "text-4xl text-paper sm:text-5xl lg:text-6xl"
                  : i % 3 === 1
                  ? "text-2xl text-paper/70 sm:text-3xl lg:text-4xl"
                  : "text-lg text-paper/45 sm:text-xl lg:text-2xl"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
