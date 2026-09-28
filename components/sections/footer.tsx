import { socials } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-line-light" aria-label="Footer">
      <div className="container-x flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-light tracking-[0.2em] text-paper">
            Muhammad Amin Khan
          </p>
          <p className="mt-1 font-sans text-[10px] font-light uppercase tracking-[0.25em] text-paper/35">
            Full-Stack Developer
          </p>
        </div>

        <div className="flex items-center gap-6">
          {socials.slice(1).map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[10px] font-light uppercase tracking-[0.25em] text-paper/40 transition-colors duration-300 hover:text-paper"
            >
              {social.label}
            </a>
          ))}
        </div>

        <p className="font-sans text-[10px] font-light uppercase tracking-[0.25em] text-paper/30">
          © 2026
        </p>
      </div>
    </footer>
  );
}
