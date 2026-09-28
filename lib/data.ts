export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  year: string;
  role: string;
  image: string;
  live: string;
  github: string;
  challenge: string;
  approach: string;
  result: string;
}

export const projects: Project[] = [
  {
    id: "aura",
    index: "01",
    title: "AURA",
    category: "Full-Stack E-commerce",
    description:
      "A complete e-commerce platform with product management, cart flow and checkout — built end to end from database to interface.",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    year: "2025",
    role: "Design & Development",
    image: "/projects/aura.svg",
    live: "https://aura.example.com",
    github: "https://github.com",
    challenge:
      "AURA needed to feel like a premium retail brand while remaining fast and maintainable. The challenge was unifying product data, cart state and a checkout flow into one coherent system without sacrificing the editorial feel of the storefront.",
    approach:
      "I designed the data model around the shopping journey — products, variants, cart and orders — then built the storefront on Next.js with server components for performance. Every interface decision, from typography to motion, was made to reinforce the brand's quiet confidence.",
    result:
      "A unified commerce experience where the storefront, cart and checkout move as one system. The result is a fast, expressive platform that reads like a design piece and works like a product.",
  },
  {
    id: "nuve",
    index: "02",
    title: "NUVE",
    category: "Interactive Cocktail Experience",
    description:
      "An interactive digital menu and discovery experience for a cocktail bar — where every drink has a story told through motion.",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
    year: "2025",
    role: "Creative Development",
    image: "/projects/nuve.svg",
    live: "https://nuve.example.com",
    github: "https://github.com",
    challenge:
      "A static menu could not capture what makes the bar special. The challenge was translating atmosphere — texture, ritual, craft — into an interface that feels alive without becoming a gimmick.",
    approach:
      "I treated each drink as a small editorial story. Scroll and hover drive the motion: ingredients reveal, compositions shift, and the interface breathes with the pace of the bar. GSAP ScrollTrigger keeps everything tied to the reader's movement.",
    result:
      "An experience that behaves like the bar itself — deliberate, atmospheric, and quietly theatrical. Guests explore the menu the way they would explore the room.",
  },
  {
    id: "kstore",
    index: "03",
    title: "KSTORE",
    category: "E-commerce Platform",
    description:
      "A modern storefront with bold typography, expressive product presentation and a checkout that stays out of the way.",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB"],
    year: "2024",
    role: "Full-Stack Development",
    image: "/projects/kstore.svg",
    live: "https://kstore.example.com",
    github: "https://github.com",
    challenge:
      "KSTORE's catalog is visual first — the products are the hero. The challenge was building a storefront where large imagery and bold type coexist with a frictionless path to purchase.",
    approach:
      "I built the frontend around full-bleed product moments and anchored the backend with a clean REST API for products, inventory and orders. Performance budgets were set early so the expressive front end never paid for itself in load time.",
    result:
      "A storefront that presents products like editorial photography and converts like a focused checkout — expression and efficiency in the same system.",
  },
  {
    id: "amin-portfolio",
    index: "04",
    title: "AMIN PORTFOLIO",
    category: "Digital Experience",
    description:
      "This portfolio — an interactive, motion-driven presentation of selected work, built as a demonstration of what I do.",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Three.js", "Lenis", "Tailwind CSS"],
    year: "2026",
    role: "Design & Engineering",
    image: "/projects/amin-portfolio.svg",
    live: "https://muhammadaminkhan.dev",
    github: "https://github.com",
    challenge:
      "A developer portfolio should prove its own premise. The challenge was building a site that is itself an example of the craft — editorial typography, scroll choreography, 3D and interaction — while staying fast and accessible.",
    approach:
      "Every section is engineered as a small system: GSAP ScrollTrigger for scroll choreography, Lenis for smooth inertia, React Three Fiber for cinematic 3D, a custom cursor for tactile feedback, and typography as the primary visual material. Nothing decorative without a job.",
    result:
      "A portfolio that works as both a presentation of work and a demonstration of capability — the site itself is the proof.",
  },
];

export interface Service {
  index: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    index: "01",
    title: "Frontend Engineering",
    description:
      "Interfaces with Next.js, React and TypeScript — engineered for performance, accessibility and feel.",
  },
  {
    index: "02",
    title: "Full-Stack Development",
    description:
      "Complete products from database to deployment — Node.js, Express and MongoDB behind considered interfaces.",
  },
  {
    index: "03",
    title: "Interactive Experiences",
    description:
      "Scroll choreography, motion systems and tactile interaction that make a site memorable.",
  },
  {
    index: "04",
    title: "E-commerce",
    description:
      "Storefronts and commerce systems that present products beautifully and convert cleanly.",
  },
  {
    index: "05",
    title: "Motion Design",
    description:
      "GSAP-driven motion with intent — animation that communicates hierarchy and guides attention.",
  },
  {
    index: "06",
    title: "3D Web Experiences",
    description:
      "Three.js and React Three Fiber scenes that add depth and presence to digital products.",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Discover",
    description:
      "Every project starts with understanding — the problem, the audience, and what success actually looks like.",
  },
  {
    index: "02",
    title: "Architect",
    description:
      "Structure before surface. Systems, data and interaction are mapped so design decisions have somewhere to land.",
  },
  {
    index: "03",
    title: "Design",
    description:
      "Typography, space and motion are composed as one system — every element earns its place.",
  },
  {
    index: "04",
    title: "Engineer",
    description:
      "Clean, typed, performant code. The design is built with the same care it was composed with.",
  },
  {
    index: "05",
    title: "Deploy",
    description:
      "Shipped, measured and refined — launched fast and improved with intent.",
  },
];

export const socials = [
  { label: "Email", value: "hello@muhammadaminkhan.dev", href: "mailto:hello@muhammadaminkhan.dev" },
  { label: "LinkedIn", value: "in/muhammadaminkhan", href: "https://linkedin.com" },
  { label: "GitHub", value: "github.com/mak", href: "https://github.com" },
  { label: "WhatsApp", value: "+92 000 0000000", href: "https://wa.me/920000000000" },
];
