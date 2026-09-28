"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { Loader } from "@/components/ui/loader";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Introduction } from "@/components/sections/introduction";
import { Statement } from "@/components/sections/statement";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Work } from "@/components/sections/work";
import { ProjectDetail } from "@/components/sections/project-detail";
import { Technology } from "@/components/sections/technology";
import { Process } from "@/components/sections/process";
import { Architecture } from "@/components/sections/architecture";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import type { Project } from "@/lib/data";

export default function PortfolioPage() {
  useLenis();
  const [loaded, setLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <Nav />

      <main>
        {loaded && (
          <>
            <Hero />
            <Introduction />
            <Statement />
            <About />
            <Expertise />
            <Work onOpenProject={setActiveProject} />
            <Technology />
            <Process />
            <Architecture />
            <Contact />
          </>
        )}
      </main>

      <Footer />

      <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
