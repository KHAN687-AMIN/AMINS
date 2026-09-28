"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { services } from "@/lib/data";

export function Services() {
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
    <section ref={rootRef} id="services" className="relative py-28 sm:py-40" aria-label="Services">
      <div className="container-x">
        <div className="mb-14 flex items-end justify-between sm:mb-20">
          <div>
            <p className="mb-4 font-display text-[10px] uppercase tracking-[0.3em] text-paper/40 sm:text-[11px]">
              Services
            </p>
            <h2 className="font-display text-5xl font-medium uppercase leading-[0.9] tracking-tightest text-paper sm:text-7xl lg:text-8xl">
              What I
              <br />
              <span className="text-stroke">do</span>
            </h2>
          </div>
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
                  className={`font-display text-xs tracking-[0.2em] transition-all duration-500 sm:text-sm ${
                    active === i ? "translate-x-2 text-ember" : "text-paper/35"
                  }`}
                >
                  {service.index}
                </span>
                <h3
                  className={`flex-1 font-display text-2xl font-medium uppercase tracking-tightest transition-all duration-500 sm:text-4xl lg:text-5xl ${
                    active === i ? "translate-x-3 text-paper sm:translate-x-5" : "text-paper/85"
                  }`}
                >
                  {service.title}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 transition-all duration-500 sm:h-6 sm:w-6 ${
                    active === i
                      ? "translate-x-0 text-paper opacity-100"
                      : "-translate-x-2 text-paper/40 opacity-0"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M7 17L17 7M17 7H8m9 0v9" />
                </svg>
              </div>

              {/* Expanding description */}
              <div
                className="grid transition-[grid-template-rows] duration-500 ease-out"
                style={{ gridTemplateRows: active === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-xl pb-6 pl-10 font-sans text-sm leading-relaxed text-paper/55 sm:pl-16 sm:text-base lg:pl-20">
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
