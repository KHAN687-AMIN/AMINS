"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reduced) {
      gsap.set("[data-manifesto-line]", { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-manifesto-line]");

      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
            },
          }
        );
      });

      // Emphasis reveal on "DIGITAL EXPERIENCES"
      gsap.fromTo(
        "[data-manifesto-emphasis]",
        { opacity: 0.12 },
        {
          opacity: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-manifesto-emphasis]",
            start: "top 70%",
          },
        }
      );

      // Subtle parallax on the closing statement
      gsap.to("[data-manifesto-close]", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-32 sm:py-44 lg:py-56"
      aria-label="Manifesto"
    >
      <div className="container-x">
        <p className="mb-14 font-display text-[10px] uppercase tracking-[0.3em] text-paper/40 sm:mb-20 sm:text-[11px]">
          Manifesto
        </p>

        <h2 className="font-display font-medium uppercase leading-[0.92] tracking-tightest">
          <span className="block overflow-hidden">
            <span data-manifesto-line className="block text-[10vw] text-paper sm:text-[7.5vw] lg:text-[6vw]">
              I don&rsquo;t just write code.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-manifesto-line
              data-manifesto-emphasis
              className="block text-[10vw] text-paper sm:text-[7.5vw] lg:text-[6vw]"
            >
              I build digital experiences.
            </span>
          </span>
        </h2>

        <div className="mt-20 flex justify-end sm:mt-28">
          <div data-manifesto-close className="max-w-md">
            <p className="font-display text-2xl font-medium leading-snug tracking-tight text-paper/85 sm:text-3xl lg:text-4xl">
              Where engineering, motion and visual design meet.
            </p>
            <div className="mt-8 h-px w-20 bg-ember" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
