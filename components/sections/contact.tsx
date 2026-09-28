"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { socials } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-line]",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        "[data-contact-fade]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 60%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="contact" className="relative overflow-hidden pt-28 sm:pt-40" aria-label="Contact">
      <div
        className="pointer-events-none absolute -bottom-10 left-0 select-none font-display text-[26vw] font-light leading-none text-paper/[0.02]"
        aria-hidden
      >
        HELLO
      </div>

      <div className="container-x relative">
        <Reveal>
          <p className="mb-10 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40 sm:mb-14">
            Contact
          </p>
        </Reveal>

        <h2 className="font-display font-light uppercase leading-[0.88] tracking-tightest">
          <span className="block overflow-hidden">
            <span data-contact-line className="block text-[14vw] text-paper sm:text-[11vw] lg:text-[9vw]">
              Let&rsquo;s build
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-contact-line className="block text-[14vw] text-paper sm:text-[11vw] lg:text-[9vw]">
              something
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-contact-line className="block text-[14vw] text-stroke sm:text-[11vw] lg:text-[9vw]">
              exceptional.
            </span>
          </span>
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-8 font-sans text-sm font-light text-paper/60 sm:mt-10 sm:text-base">
            Have a project in mind?
          </p>
        </Reveal>

        <div data-contact-fade className="mt-14 sm:mt-20">
          <Magnetic strength={0.3}>
            <a
              href="mailto:hello@muhammadaminkhan.dev?subject=Project%20Inquiry"
              className="group relative inline-flex h-40 w-40 items-center justify-center rounded-full bg-paper text-ink transition-colors duration-500 hover:bg-champagne sm:h-52 sm:w-52"
              aria-label="Start a project — send an email"
            >
              <span className="absolute inset-0 rounded-full border border-paper/40 transition-transform duration-500 group-hover:scale-110" aria-hidden />
              <span className="font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] transition-transform duration-500 group-hover:scale-95 sm:text-xs">
                Start a
                <br />
                project →
              </span>
            </a>
          </Magnetic>
        </div>

        <div data-contact-fade className="mt-20 grid grid-cols-2 gap-px bg-line-light sm:mt-28 lg:grid-cols-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-6 bg-ink p-6 transition-colors duration-500 hover:bg-graphite sm:p-8"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-paper/35">
                {social.label}
              </span>
              <span className="font-sans text-sm font-light text-paper/80 transition-colors duration-300 group-hover:text-paper sm:text-base">
                {social.value}
              </span>
              <span className="mt-auto font-sans text-[10px] uppercase tracking-[0.25em] text-paper/25 transition-colors duration-300 group-hover:text-champagne">
                Open →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
