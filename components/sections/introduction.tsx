"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Introduction() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reduced) {
      gsap.set("[data-intro-line]", { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-intro-line]");

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

      gsap.fromTo(
        "[data-intro-emphasis]",
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-intro-emphasis]",
            start: "top 70%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-32 sm:py-44 lg:py-56"
      aria-label="Introduction"
    >
      <div className="container-x">
        <p className="mb-14 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40 sm:mb-20">
          Philosophy
        </p>

        <h2 className="font-display font-light uppercase leading-[0.92] tracking-tightest">
          <span className="block overflow-hidden">
            <span data-intro-line className="block text-[10vw] text-paper sm:text-[7.5vw] lg:text-[6vw]">
              Digital
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-intro-line className="block text-[10vw] text-stroke sm:text-[7.5vw] lg:text-[6vw]">
              experiences
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-intro-line
              data-intro-emphasis
              className="block text-[10vw] text-paper sm:text-[7.5vw] lg:text-[6vw]"
            >
              engineered
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-intro-line className="block text-[10vw] text-paper sm:text-[7.5vw] lg:text-[6vw]">
              with precision.
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}
