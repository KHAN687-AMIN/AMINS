"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Reveal } from "@/components/ui/reveal";

const capabilities = [
  "Frontend Engineering",
  "Backend Engineering",
  "Interaction",
  "Motion",
  "3D Web",
  "Deployment",
];

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-visual]",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="about" className="relative py-28 sm:py-40" aria-label="About">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Visual */}
          <div className="lg:col-span-5">
            <Reveal>
              <div
                data-about-visual
                className="relative aspect-[4/5] overflow-hidden bg-graphite"
                style={{ clipPath: "inset(100% 0% 0% 0%)" }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-paper/40">
                    Profile — 2026
                  </p>
                  <p className="font-display text-[10vw] font-light uppercase leading-[0.85] tracking-tightest text-paper sm:text-[7vw] lg:text-[4vw]">
                    MAK
                  </p>
                </div>
                <div className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-champagne" aria-hidden />
              </div>
            </Reveal>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="mb-8 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40">
                About
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-light leading-[1.1] tracking-tightest text-paper sm:text-5xl lg:text-6xl">
                Muhammad Amin Khan is a full-stack developer focused on building modern digital products and interactive web experiences.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg font-sans text-sm font-light leading-relaxed text-paper/55 sm:text-base">
                Every project is an opportunity to craft something precise — where engineering rigor meets visual sophistication.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 flex flex-wrap gap-2">
                {capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="border border-line-light px-4 py-2 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-paper/55"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
