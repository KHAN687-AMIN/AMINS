"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { projects, type Project } from "@/lib/data";

interface WorkProps {
  onOpenProject: (project: Project) => void;
}

export function Work({ onOpenProject }: WorkProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-work-header] > *",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-work-header]", start: "top 80%" },
        }
      );

      root.querySelectorAll<HTMLElement>("[data-project]").forEach((project) => {
        const image = project.querySelector("[data-project-image]");
        const inner = project.querySelector("[data-project-inner]");
        const meta = project.querySelector("[data-project-meta]");
        const num = project.querySelector("[data-project-num]");

        gsap.fromTo(
          image,
          { clipPath: "inset(10% 10% 10% 10%) scale(1.08)" },
          {
            clipPath: "inset(0% 0% 0% 0%) scale(1)",
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: project, start: "top 72%" },
          }
        );

        if (inner) {
          gsap.to(inner, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: project, start: "top 55%" },
            }
          );
        }

        if (num) {
          gsap.fromTo(
            num,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: project, start: "top 60%" },
            }
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="work" className="relative py-28 sm:py-40" aria-label="Selected work">
      <div className="container-x" data-work-header>
        <div className="mb-16 flex items-end justify-between sm:mb-24">
          <div>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-paper/40">
              Selected Work
            </p>
            <h2 className="font-display text-5xl font-light uppercase leading-[0.9] tracking-tightest text-paper sm:text-7xl lg:text-8xl">
              Case Studies
            </h2>
          </div>
          <p className="hidden max-w-[180px] text-right font-sans text-[10px] font-light uppercase leading-relaxed tracking-[0.2em] text-paper/35 sm:block">
            2024 — 2026
            <br />
            Four projects
          </p>
        </div>
      </div>

      <div className="container-x flex flex-col gap-32 sm:gap-48">
        {projects.map((project, i) => (
          <article
            key={project.id}
            data-project
            className="group relative"
            data-cursor="VIEW"
          >
            <div
              data-project-num
              className={`absolute -top-12 z-0 font-display text-8xl font-light tracking-tightest sm:-top-16 sm:text-[10rem] ${
                i % 2 === 0 ? "left-0" : "right-0"
              }`}
            >
              <span className="text-stroke">{project.index}</span>
            </div>

            <button
              onClick={() => onOpenProject(project)}
              className="relative z-10 block w-full overflow-hidden text-left"
              aria-label={`View project: ${project.title}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenProject(project);
                }
              }}
            >
              <div
                data-project-image
                className="relative aspect-[16/10] w-full overflow-hidden bg-graphite sm:aspect-[16/8]"
                style={{ clipPath: "inset(10% 10% 10% 10%)" }}
              >
                <div data-project-inner className="will-transform absolute inset-0">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                </div>
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
              </div>
            </button>

            <div
              data-project-meta
              className={`relative z-10 mt-6 flex flex-col gap-4 sm:mt-8 ${
                i % 2 === 0
                  ? "sm:flex-row sm:items-end sm:justify-between"
                  : "sm:flex-row-reverse sm:items-end sm:justify-between"
              }`}
            >
              <div>
                <h3 className="font-display text-3xl font-light uppercase tracking-tightest text-paper transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-2 font-sans text-xs font-light uppercase tracking-[0.2em] text-paper/50 sm:text-sm">
                  {project.category}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-paper/35">
                  {project.year}
                </span>
                <span className="h-px w-8 bg-paper/20" aria-hidden />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-paper/35">
                  {project.stack.slice(0, 2).join(" · ")}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
