"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { services } from "@/lib/data";

export function Expertise() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-service-row]",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="expertise" className="relative py-28 sm:py-40" aria-label="Expertise">
      <div className="container-x">
        <div className="mb-14 sm:mb-20">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40">
            Expertise
          </p>
          <h2 className="font-display text-5xl font-light uppercase leading-[0.9] tracking-tightest text-paper sm:text-7xl lg:text-8xl">
            Capabilities
          </h2>
        </div>

        <div className="border-t border-line-light">
          {services.map((service, i) => (
            <div
              key={service.index}
              data-service-row
              className="group relative border-b border-line-light"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="flex items-center gap-5 py-6 transition-all duration-500 sm:gap-10 sm:py-8">
                <span
                  className={`font-sans text-[10px] tracking-[0.25em] transition-all duration-500 ${
                    active === i ? "translate-x-2 text-champagne" : "text-paper/30"
                  }`}
                >
                  {service.index}
                </span>
                <h3
                  className={`flex-1 font-display text-2xl font-light uppercase tracking-tightest transition-all duration-500 sm:text-4xl lg:text-5xl ${
                    active === i ? "translate-x-3 text-paper sm:translate-x-5" : "text-paper/80"
                  }`}
                >
                  {service.title}
                </h3>
                <svg
                  className={`h-4 w-4 shrink-0 transition-all duration-500 sm:h-5 sm:w-5 ${
                    active === i
                      ? "translate-x-0 text-paper opacity-100"
                      : "-translate-x-2 text-paper/30 opacity-0"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M7 17L17 7M17 7H8m9 0v9" />
                </svg>
              </div>

              <div
                className="grid transition-[grid-template-rows] duration-500 ease-out"
                style={{ gridTemplateRows: active === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-lg pb-6 pl-10 font-sans text-xs font-light leading-relaxed text-paper/50 sm:pl-16 sm:text-sm lg:pl-20">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
