"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const links = [
  { label: "Work", href: "#work", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Expertise", href: "#expertise", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

export function Nav() {
  const rootRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || reduced) return;
    const items = rootRef.current?.querySelectorAll(".menu-item");
    if (!items) return;
    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: "power3.out", delay: 0.15 }
    );
  }, [open, reduced]);

  const goTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }), 60);
    }
  };

  return (
    <>
      <header
        ref={rootRef}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? "bg-ink/80 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between py-4 transition-all duration-500 sm:py-5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
            className="font-display text-lg font-light tracking-[0.25em] text-paper"
            aria-label="Back to top"
          >
            MAK
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => goTo(link.href)}
                className="group relative font-sans text-[10px] font-light uppercase tracking-[0.25em] text-paper/60 transition-colors duration-300 hover:text-paper"
              >
                <span className="mr-1.5 text-[8px] text-paper/30">{link.index}</span>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-400 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="h-px w-6 bg-paper" />
            <span className="h-px w-6 bg-paper" />
          </button>
        </div>
        <div className="h-px w-full bg-line-light" style={{ opacity: scrolled ? 1 : 0 }} />
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[150] flex flex-col bg-ink transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="container-x flex items-center justify-between py-4">
          <span className="font-display text-lg font-light tracking-[0.25em] text-paper">
            MAK
          </span>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <span className="h-px w-6 rotate-45 bg-paper" />
            <span className="h-px w-6 -rotate-45 bg-paper" />
          </button>
        </div>
        <nav className="container-x flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
          {links.map((link, i) => (
            <button
              key={link.label}
              onClick={() => goTo(link.href)}
              className="menu-item flex items-baseline gap-4 py-3 text-left"
              tabIndex={open ? 0 : -1}
            >
              <span className="font-sans text-[10px] text-paper/30">{link.index}</span>
              <span className="font-display text-5xl font-light tracking-tightest text-paper">
                {link.label}
              </span>
            </button>
          ))}
        </nav>
        <div className="container-x pb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-paper/30">
            Muhammad Amin Khan — Full-Stack Developer
          </p>
        </div>
      </div>
    </>
  );
}
