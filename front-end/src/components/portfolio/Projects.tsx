import { motion } from "framer-motion";
import { ArrowUpRight, FileSignature, Salad } from "lucide-react";
import { Reveal, SectionHeading, SpotlightPanel, Tilt } from "./primitives";

const PROJECTS = [
  {
    id: "fecho",
    index: "01",
    title: "Fechô",
    category: "SaaS · Jurídico",
    icon: FileSignature,
    tone: "primary" as const,
    problem: "Empresas gerenciando contratos no braço, com risco jurídico e lentidão.",
    solution: "Plataforma completa de criação e gestão de contratos com assinatura digital.",
    result: "60+ usuários ativos · 100+ contratos gerados",
    year: "2024 — hoje",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    demo: "https://fecho-one.vercel.app/",
  },
  {
    id: "dietai",
    index: "02",
    title: "DIETAI",
    category: "App · Saúde & Nutrição",
    icon: Salad,
    tone: "accent" as const,
    problem: "Planos alimentares genéricos que ignoram rotina e preferência de cada pessoa.",
    solution: "App mobile com IA que monta refeições 100% personalizadas em segundos.",
    result: "App em produção · IA integrada",
    year: "2025",
    stack: ["React Native", "Node.js", "PostgreSQL", "IA"],
    demo: "https://dietai-pearl.vercel.app/",
  },
];

const TONES = {
  primary: {
    text: "text-primary",
    border: "border-primary/25",
    dot: "bg-primary",
    field:
      "radial-gradient(80% 100% at 20% 0%, rgba(79,142,247,0.30), transparent 62%), radial-gradient(70% 90% at 90% 80%, rgba(45,212,191,0.16), transparent 60%)",
  },
  accent: {
    text: "text-accent",
    border: "border-accent/25",
    dot: "bg-accent",
    field:
      "radial-gradient(80% 100% at 80% 0%, rgba(45,212,191,0.28), transparent 62%), radial-gradient(70% 90% at 10% 80%, rgba(79,142,247,0.18), transparent 60%)",
  },
};

const Projects = () => (
  <section id="projetos" className="section rule-top">
    <div className="frame relative z-10">
      <SectionHeading
        index="04"
        kicker="Projetos"
        title={
          <>
            Produtos no ar,
            <br />
            com gente usando.
          </>
        }
        note="Não são exercícios de portfólio. São dois produtos com usuários reais, cada um resolvendo um problema de mercado específico."
      />

      <div className="space-y-6 md:space-y-8">
        {PROJECTS.map((project, i) => {
          const tone = TONES[project.tone];
          const flip = i % 2 === 1;

          return (
            <Reveal key={project.id} delay={i * 0.1}>
              {/* Half the hero's tilt: these panels are wide, and the same
                  angle across that span reads as a warp rather than depth.
                  No glare either — the spotlight already tracks the cursor. */}
              <Tilt options={{ max: 4, perspective: 2400 }}>
                <SpotlightPanel className="grid lg:grid-cols-2">
                  {/* ── Generated cover ─────────────────────────────── */}
                  <div
                    className={`relative min-h-[240px] overflow-hidden border-border md:min-h-[320px] ${
                      flip
                        ? "lg:order-2 lg:border-l"
                        : "lg:order-1 lg:border-r"
                    } border-b lg:border-b-0`}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: tone.field }}
                    />
                    {/* Blueprint grid over the field */}
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                      }}
                    />

                    {/* Browser chrome */}
                    <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="ml-3 truncate font-mono text-[10px] text-white/35">
                        {project.demo.replace(/^https?:\/\//, "")}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 pt-10">
                      <motion.div
                        whileHover={{ rotate: -6, scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-background/60 backdrop-blur-sm ${tone.border} ${tone.text}`}
                      >
                        <project.icon size={24} strokeWidth={1.6} />
                      </motion.div>
                      <span className="headline text-[clamp(2.5rem,7vw,4.5rem)] text-white/90">
                        {project.title}
                      </span>
                    </div>

                    {/* Index watermark */}
                    <span className="absolute bottom-4 right-5 font-mono text-[10px] tabular-nums text-white/25">
                      {project.index} / 02
                    </span>
                  </div>

                  {/* ── Case detail ─────────────────────────────────── */}
                  <div className={`p-7 md:p-10 ${flip ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex items-center justify-between gap-4">
                      <span className={`eyebrow ${tone.text}`}>{project.category}</span>
                      <span className="font-mono text-[10px] text-ink-ghost">
                        {project.year}
                      </span>
                    </div>

                    <dl className="mt-8 space-y-5">
                      {[
                        { k: "Problema", v: project.problem, accent: false },
                        { k: "Solução", v: project.solution, accent: false },
                        { k: "Resultado", v: project.result, accent: true },
                      ].map((row) => (
                        <div
                          key={row.k}
                          className="grid grid-cols-[68px_1fr] items-baseline gap-4 border-b border-border pb-5 last:border-b-0"
                        >
                          <dt className="font-mono text-[9px] uppercase tracking-label text-ink-ghost">
                            {row.k}
                          </dt>
                          <dd
                            className={`text-[15px] leading-relaxed ${
                              row.accent
                                ? `font-medium ${tone.text}`
                                : "text-ink-muted"
                            }`}
                          >
                            {row.v}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-wider text-ink-faint"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-9">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-label text-ink transition-colors duration-400 hover:text-primary"
                      >
                        <span className="link-wipe">Visitar projeto</span>
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-500 ease-editorial group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    </div>
                  </div>
                </SpotlightPanel>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Projects;
