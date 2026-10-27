import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/eu.jpeg";
import { useTilt } from "@/hooks/use-tilt";
import { Marquee, StatusDot } from "./primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

const STACK = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "React Native",
  "Tailwind CSS",
  "PostgreSQL",
  "Flutter",
  "Python",
  "Firebase",
  "n8n",
];

const SPECS = [
  { k: "Experiência", v: "5+ anos" },
  { k: "Base", v: "Fortaleza, CE" },
  { k: "Foco", v: "Produto & SaaS" },
];

/* Character-level reveal for the display type. Each glyph rides up out of a
   clipped band, staggered left-to-right — the page's signature entrance. */
const Word = ({
  text,
  className = "",
  style,
  delayBase = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delayBase?: number;
}) => {
  const still = useReducedMotion();

  return (
    <span className="flex" aria-label={text} style={style}>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="overflow-hidden py-[0.06em]">
          <motion.span
            aria-hidden="true"
            className={`inline-block ${className}`}
            initial={still ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.15,
              delay: delayBase + i * 0.035,
              ease: EASE,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const rise: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: (d: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: d, ease: EASE },
  }),
};

const Hero = () => {
  const still = useReducedMotion();
  /* The portrait carries the only glare on the page — it reads as light
     raking across a print, which the flat panels elsewhere don't want. */
  const portraitTilt = useTilt<HTMLDivElement>({
    max: 7,
    glare: true,
    "max-glare": 0.14,
  });

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col justify-between pt-28 md:pt-32"
    >
      {/* ── Left edge rail — vertical running head ─────────────────────── */}
      <motion.div
        initial={still ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 xl:block"
        style={{ width: "var(--gutter)" }}
      >
        <span className="vertical-rl mx-auto block font-mono text-[10px] uppercase tracking-label text-ink-ghost">
          Portfólio — Ed. 2025
        </span>
      </motion.div>

      <div className="frame relative z-10 w-full">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-20 lg:items-center">
          {/* ── Type column ──────────────────────────────────────────── */}
          <div>
            <motion.div
              variants={rise}
              initial={still ? undefined : "hidden"}
              animate="show"
              custom={0.15}
              className="mb-9 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.06] py-1.5 pl-3 pr-4">
                <StatusDot />
                <span className="font-mono text-[10px] uppercase tracking-label text-accent">
                  Disponível para projetos
                </span>
              </span>
              <span className="eyebrow">Full-Stack · Founder</span>
            </motion.div>

            {/* Name — two solid lines */}
            <h1 className="headline text-[clamp(3.5rem,13vw,11rem)] leading-[0.82]">
              <Word text="ELIEL" className="text-ink" delayBase={0.35} />
              <Word text="NICOLAS" className="text-ink" delayBase={0.5} />
            </h1>

            <motion.p
              variants={rise}
              initial={still ? undefined : "hidden"}
              animate="show"
              custom={1}
              className="deck mt-9 max-w-lg text-pretty"
            >
              Construo produtos digitais que{" "}
              <span className="text-ink">saem do protótipo e chegam ao mercado</span>{" "}
              — de landing pages que convertem a plataformas SaaS com usuários
              pagando e rodando em produção.
            </motion.p>

            <motion.div
              variants={rise}
              initial={still ? undefined : "hidden"}
              animate="show"
              custom={1.12}
              className="mt-11 flex flex-wrap items-center gap-4"
            >
              <a href="#contato" className="btn btn-solid group">
                <span>Iniciar um projeto</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a href="#projetos" className="btn btn-ghost group">
                <span>Ver o trabalho</span>
                <ArrowDownRight
                  size={15}
                  className="transition-transform duration-500 ease-editorial group-hover:translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* ── Portrait column ──────────────────────────────────────── */}
          <motion.div
            initial={still ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.45, ease: EASE }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div
              ref={portraitTilt}
              className="ticks group relative aspect-[4/5] overflow-hidden border border-border will-change-transform"
            >
              <motion.img
                src={heroImage}
                alt="Eliel Nicolas, desenvolvedor full-stack"
                initial={still ? false : { scale: 1.18 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, delay: 0.45, ease: EASE }}
                className="h-full w-full object-cover object-[center_12%] grayscale contrast-[1.08] transition-[filter] duration-900 ease-editorial group-hover:grayscale-0"
              />

              {/* Duotone tint — pulls the portrait into the palette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              {/* Grounding fade into the page */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
              {/* Slow scanline sweep */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>

            {/* Overlapping caption card — breaks the frame on purpose */}
            <motion.div
              initial={still ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.25, ease: EASE }}
              className="absolute -bottom-6 -left-4 border border-border bg-surface-raised/95 px-4 py-3 backdrop-blur-sm sm:-left-8"
            >
              <p className="font-mono text-[9px] uppercase tracking-label text-ink-faint">
                Fundador
              </p>
              <p className="mt-0.5 font-display text-lg font-bold leading-none tracking-headline text-ink">
                Fechô
                <span className="ml-2 align-middle font-mono text-[10px] font-normal tracking-normal text-accent">
                  60+ usuários
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Spec row ───────────────────────────────────────────────── */}
        <motion.dl
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 1 }}
          className="mt-20 grid grid-cols-1 border-t border-border sm:grid-cols-3 lg:mt-24"
        >
          {SPECS.map((spec) => (
            <div
              key={spec.k}
              className="border-b border-border px-0 py-5 sm:border-b-0 sm:border-l sm:px-6 sm:py-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="eyebrow">{spec.k}</dt>
              <dd className="mt-2 font-display text-xl font-semibold tracking-headline text-ink">
                {spec.v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* ── Stack ticker ─────────────────────────────────────────────── */}
      <motion.div
        initial={still ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 mt-16 border-t border-border"
      >
        <Marquee items={STACK} />
      </motion.div>
    </section>
  );
};

export default Hero;
