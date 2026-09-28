"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete();
        },
      });

      tl.fromTo(
        ".loader-brand",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".loader-name",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "+=0.2"
        )
        .to(".loader-line", { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, "-=0.1")
        .to([".loader-brand", ".loader-name"], { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.15")
        .to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.2");
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink"
      aria-hidden
    >
      <p className="loader-brand font-display text-sm uppercase tracking-[0.4em] text-paper/60">
        MAK
      </p>
      <div className="mt-4 h-px w-12 overflow-hidden bg-paper/10">
        <div className="loader-line h-full w-full origin-left scale-x-0 bg-champagne" />
      </div>
      <p className="loader-name mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-paper/40">
        Muhammad Amin Khan
      </p>
    </div>
  );
}
