import { useReducedMotion } from "framer-motion";
import { ArrowUp, Instagram, Linkedin, Mail } from "lucide-react";
import { Reveal } from "./primitives";

const SOCIALS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/eliel-nicolas-751822252/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/nicollaseliel/", label: "Instagram" },
  { icon: Mail, href: "mailto:Elielnicollas1011@gmail.com", label: "E-mail" },
];

const GITHUB = "https://github.com/ElielM10100";

const Footer = () => {
  const year = new Date().getFullYear();
  const still = useReducedMotion();

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });

  return (
    <footer className="relative overflow-hidden rule-top">
      <div className="frame relative z-10 pt-20 md:pt-28">
        {/* ── Closing call ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-10 border-b border-border pb-16 md:flex-row md:items-end md:justify-between">
          <Reveal mask>
            <p className="font-display text-[clamp(1.5rem,3.6vw,2.6rem)] font-semibold leading-[1.15] tracking-headline text-ink">
              Vamos construir
              <br />
              alguma coisa que
              <br />
              <span className="text-primary">funcione de verdade.</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="mailto:Elielnicollas1011@gmail.com"
              className="group inline-flex items-center gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                Escrever para
              </span>
              <span className="link-wipe text-[15px] text-ink transition-colors duration-400 group-hover:text-primary">
                Elielnicollas1011@gmail.com
              </span>
            </a>
          </Reveal>
        </div>

        {/* ── Meta row ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-faint transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
              >
                <social.icon size={16} strokeWidth={1.7} />
              </a>
            ))}
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-faint transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
            >
              {/* Lucide's brand marks are deprecated — inlined to stay stable */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.9 5.48.9 11.68c0 4.96 3.29 9.16 7.86 10.65.57.1.78-.25.78-.55v-2.1c-3.2.68-3.88-1.4-3.88-1.4-.52-1.35-1.28-1.71-1.28-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.3-5.25-5.78 0-1.28.44-2.32 1.17-3.14-.12-.29-.51-1.48.11-3.08 0 0 .96-.31 3.15 1.2a10.8 10.8 0 0 1 5.74 0c2.18-1.51 3.14-1.2 3.14-1.2.62 1.6.23 2.79.11 3.08.73.82 1.17 1.86 1.17 3.14 0 4.49-2.7 5.48-5.27 5.77.41.36.78 1.08.78 2.18v3.23c0 .3.2.66.79.55a11.2 11.2 0 0 0 7.85-10.65C23.1 5.48 18.27.5 12 .5Z" />
              </svg>
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {[
              ["Home", "#", "home"],
              ["Sobre", "#sobre"],
              ["Serviços", "#servicos"],
              ["Trajetória", "#experiencia"],
              ["Projetos", "#projetos"],
              ["Contato", "#contato"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="link-wipe font-mono text-[11px] uppercase tracking-wider text-ink-faint transition-colors duration-400 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            onClick={toTop}
            className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-label text-ink-faint transition-colors duration-400 hover:text-primary"
          >
            Voltar ao topo
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all duration-500 ease-editorial group-hover:-translate-y-1 group-hover:border-primary/40">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* ── Colophon ─────────────────────────────────────────────────── */}
      <div className="frame relative z-10 flex flex-col items-center gap-2 border-t border-border py-7 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-ghost">
          © {year} Eliel Nicolas — Todos os direitos reservados
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-ghost">
          Fortaleza, CE · Brasil
        </p>
      </div>

      {/* Faint horizon glow, matching the aurora at the top of the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(79,142,247,0.13),transparent_70%)]" />
    </footer>
  );
};

export default Footer;
