"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { processSteps } from "@/lib/data";

export function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    if (reduced) {
      gsap.set("[data-process-step]", { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const getScroll = () => track.scrollWidth - window.innerWidth + 80;

      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.fromTo(
        "[data-process-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${getScroll()}`,
            scrub: 1,
          },
        }
      );

      root.querySelectorAll<HTMLElement>("[data-process-step]").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: step,
              containerAnimation: tween,
              start: "left 75%",
              end: "left 45%",
              scrub: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden" aria-label="Process">
      <div className="container-x flex items-end justify-between pb-10 pt-28 sm:pt-40">
        <div>
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40">
            Process
          </p>
          <h2 className="font-display text-5xl font-light uppercase leading-[0.9] tracking-tightest text-paper sm:text-7xl lg:text-8xl">
            From concept
            <br />
            to production
          </h2>
        </div>
        <p className="hidden max-w-[180px] text-right font-sans text-[10px] font-light uppercase leading-relaxed tracking-[0.2em] text-paper/35 sm:block">
          Scroll to explore
        </p>
      </div>

      <div className="relative">
        <div className="container-x">
          <div className="h-px w-full bg-line-light" data-process-progress style={{ transformOrigin: "left" }} />
        </div>

        <div ref={trackRef} className="flex w-max items-stretch gap-10 py-14 pr-10 sm:gap-16 sm:py-20">
          {processSteps.map((step, i) => (
            <div key={step.index} data-process-step className="w-[78vw] sm:w-[42vw] lg:w-[34vw]">
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[10px] tracking-[0.25em] text-champagne/70">
                  {step.index}
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-paper/30">
                  Step {i + 1} / {processSteps.length}
                </span>
              </div>
              <h3 className="mt-6 font-display text-4xl font-light uppercase tracking-tightest text-paper sm:text-5xl lg:text-6xl">
                {step.title}
              </h3>
              <p className="mt-6 max-w-sm font-sans text-xs font-light leading-relaxed text-paper/50 sm:text-sm">
                {step.description}
              </p>
            </div>
          ))}

          <div className="flex w-[40vw] items-center justify-center sm:w-[24vw]">
            <p className="font-display text-3xl font-light italic text-paper/60 sm:text-4xl">
              Ship it<span className="text-champagne">.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
