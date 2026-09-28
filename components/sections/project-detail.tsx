"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Project } from "@/lib/data";

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !project) return;

    document.body.style.overflow = "hidden";

    if (!reduced) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          root,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" }
        );
        gsap.fromTo(
          "[data-pd-stagger]",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.35,
          }
        );
      }, root);
      return () => {
        ctx.revert();
        document.body.style.overflow = "";
      };
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [project, reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[180] overflow-y-auto bg-ink"
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
      style={{ clipPath: "inset(100% 0% 0% 0%)" }}
    >
      <div className="container-x py-6">
        {/* Header */}
        <div className="flex items-center justify-between py-4" data-pd-stagger>
          <span className="font-display text-[11px] uppercase tracking-[0.25em] text-paper/50">
            {project.index} — Project
          </span>
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 transition-colors duration-300 hover:border-paper/70"
            aria-label="Close project details"
          >
            <svg className="h-4 w-4 text-paper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div className="py-10 sm:py-16" data-pd-stagger>
          <h2 className="font-display text-[14vw] font-medium uppercase leading-[0.88] tracking-tightest text-paper sm:text-[10vw] lg:text-[8vw]">
            {project.title}
          </h2>
          <p className="mt-4 font-serif text-xl italic text-paper/60 sm:text-2xl">
            {project.category}
          </p>
        </div>

        {/* Facts */}
        <div className="grid grid-cols-2 gap-px bg-line-light sm:grid-cols-4" data-pd-stagger>
          {[
            ["Project", project.title],
            ["Role", project.role],
            ["Year", project.year],
            ["Stack", project.stack.join(", ")],
          ].map(([label, value]) => (
            <div key={label} className="bg-ink p-5 sm:p-6">
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-paper/40">
                {label}
              </p>
              <p className="mt-2 font-display text-sm text-paper sm:text-base">{value}</p>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="py-10 sm:py-16" data-pd-stagger>
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111013]">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Narrative */}
        <div className="grid gap-10 pb-10 sm:pb-16 lg:grid-cols-3">
          {[
            ["The Challenge", project.challenge],
            ["The Approach", project.approach],
            ["The Result", project.result],
          ].map(([label, text]) => (
            <div key={label} data-pd-stagger>
              <p className="mb-4 font-display text-[10px] uppercase tracking-[0.3em] text-ember">
                {label}
              </p>
              <p className="font-sans text-sm leading-relaxed text-paper/65 sm:text-base">{text}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4 border-t border-line-light py-10 sm:flex-row sm:items-center sm:justify-between" data-pd-stagger>
          <div className="flex flex-wrap gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-paper/30 px-6 py-3 font-display text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
            >
              Live Project
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-paper/30 px-6 py-3 font-display text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
            >
              GitHub
            </a>
          </div>
          <button
            onClick={onClose}
            className="font-display text-[11px] uppercase tracking-[0.25em] text-paper/50 transition-colors hover:text-paper"
          >
            Back to work
          </button>
        </div>
      </div>
    </div>
  );
}
