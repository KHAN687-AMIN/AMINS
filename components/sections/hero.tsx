"use client";

import { useEffect, useRef, Suspense } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import HeroScene from "@/components/three/HeroScene";
import { Magnetic } from "@/components/ui/magnetic";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduced) {
      gsap.set("[data-hero]", { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        "[data-hero-title] .line",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.4, ease: "power4.out", stagger: 0.12 }
      )
        .fromTo(
          "[data-hero-name]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          "[data-hero-meta] > *",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );

      // Scroll fade
      gsap.to("[data-hero-content]", {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* 3D Scene — background layer */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Dark vignette for depth */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink/40 via-transparent to-ink" aria-hidden />

      {/* Content — foreground layer */}
      <div data-hero-content className="relative z-10 flex flex-1 flex-col justify-between pb-10 pt-28 sm:pt-32">
        {/* Top meta */}
        <div data-hero-meta className="container-x flex items-start justify-between">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-paper/50">
            Full-Stack Developer
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-paper/50">
            Creative Frontend Engineer
          </p>
        </div>

        {/* Central composition */}
        <div className="container-x relative flex-1 flex flex-col justify-center">
          {/* Title — overlaps 3D */}
          <h1 data-hero-title className="font-display font-light uppercase leading-[0.88] tracking-tightest">
            <span className="block overflow-hidden">
              <span className="line block text-[15vw] text-paper sm:text-[12vw] lg:text-[10vw]">
                Full-Stack
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="line block text-[15vw] text-stroke sm:text-[12vw] lg:text-[10vw]">
                Developer
              </span>
            </span>
          </h1>

          {/* Name */}
          <div data-hero-name className="mt-8 sm:mt-12">
            <p className="font-sans text-sm font-light uppercase tracking-[0.4em] text-champagne sm:text-base">
              Muhammad Amin Khan
            </p>
            <div className="mt-3 h-px w-16 bg-champagne/40" aria-hidden />
          </div>
        </div>

        {/* Bottom row */}
        <div data-hero-meta className="container-x flex items-end justify-between">
          <p className="max-w-xs font-sans text-xs font-light leading-relaxed text-paper/50 sm:text-sm">
            I design and engineer refined digital experiences for modern businesses and products.
          </p>

          <Magnetic strength={0.25}>
            <a
              href="#work"
              data-hero-cta
              className="group flex h-20 w-20 items-center justify-center rounded-full border border-paper/20 transition-colors duration-500 hover:border-champagne/50 sm:h-24 sm:w-24"
              aria-label="View selected work"
            >
              <svg
                className="h-4 w-4 text-paper/60 transition-transform duration-500 group-hover:translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="relative z-10">
        <div className="container-x">
          <div className="hairline-t" />
          <div className="flex items-center justify-between py-4">
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-paper/30">
              Digital Products / Interactive Experiences / Engineering
            </p>
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-paper/30">
              © 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
