import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionHeading } from "./primitives";

const EXPERIENCES = [
  {
    company: "Fechô",
    role: "Fundador & Desenvolvedor",
    result:
      "SaaS de contratos construído do zero — produto, código, suporte e vendas.",
    metric: "60+ usuários · 100+ contratos",
    tags: ["SaaS", "React", "TypeScript", "Node.js"],
    isFounder: true,
  },
  {
    company: "Grupo Growth",
    role: "Full-Stack",
    result:
      "Sistemas web, automações internas e um bot financeiro com alertas em tempo real.",
    metric: "Bot financeiro em produção",
    tags: ["Sistema", "Automação", "n8n", "IA"],
    isFounder: false,
  },
  {
    company: "MillenniuM",
    role: "Mobile Developer",
    result:
      "Apps mobile integrados a APIs REST, com foco em performance e experiência.",
    metric: "Apps publicados nas lojas",
    tags: ["Mobile", "React Native", "APIs REST"],
    isFounder: false,
  },
  {
    company: "EEM Dep. Francisco Monte",
    role: "Desenvolvedor & Instrutor",
    result:
      "Infraestrutura web da instituição, automação interna e formação de novos devs.",
    metric: "30+ alunos formados",
    tags: ["Web", "Automação", "Ensino"],
    isFounder: false,
  },
  {
    company: "IJCPM",
    role: "Front-End Developer",
    result:
      "Sistemas web em React e Python com integração a bancos de dados e otimização de processos.",
    metric: "Processos internos otimizados",
    tags: ["React", "Python", "MySQL"],
    isFounder: false,
  },
];

const Experience = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 60%"],
  });

  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="experiencia" className="section rule-top">
      <div className="frame relative z-10">
        <SectionHeading
          index="03"
          kicker="Trajetória"
          title={
            <>
              Onde já <span className="text-primary">entreguei</span>
              <br />
              resultado.
            </>
          }
          note="Cinco contextos diferentes, do próprio SaaS à sala de aula. O que se repete em todos é a entrega em produção."
        />

        <div ref={listRef} className="relative">
          {/* Progress rail — fills as the list scrolls past */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:block">
            <motion.div
              style={{ height }}
              className="w-full origin-top bg-gradient-to-b from-primary via-accent to-transparent"
            />
          </div>

          <div className="border-t border-border">
            {EXPERIENCES.map((exp, i) => (
              <Reveal
                key={exp.company}
                delay={i * 0.06}
                className="group relative border-b border-border"
              >
                {/* Node on the rail */}
                <span
                  className={`absolute -left-[3.5px] top-9 hidden h-[7px] w-[7px] rounded-full transition-all duration-500 md:block ${
                    exp.isFounder
                      ? "bg-accent shadow-[0_0_0_4px_rgba(45,212,191,0.14)]"
                      : "bg-ink-ghost group-hover:bg-primary"
                  }`}
                />

                <div className="grid grid-cols-1 items-start gap-x-8 gap-y-4 py-8 transition-colors duration-500 group-hover:bg-white/[0.015] md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)_auto] md:py-10 md:pl-8 lg:pl-12">
                  {/* Company + role */}
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3
                        className={`font-display text-[clamp(1.35rem,2.6vw,1.9rem)] font-bold leading-tight tracking-headline transition-colors duration-400 ${
                          exp.isFounder
                            ? "text-ink"
                            : "text-ink group-hover:text-primary"
                        }`}
                      >
                        {exp.company}
                      </h3>
                      {exp.isFounder && (
                        <span className="rounded-full border border-accent/30 bg-accent/[0.07] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-accent">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                      {exp.role}
                    </p>
                  </div>

                  {/* Result + tags */}
                  <div>
                    <p className="text-[15px] leading-relaxed text-ink-muted">
                      {exp.result}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-wider text-ink-ghost transition-colors duration-400 group-hover:text-ink-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="md:pt-1 md:text-right">
                    <span
                      className={`font-mono text-[11px] tracking-wide ${
                        exp.isFounder ? "text-accent" : "text-primary/80"
                      }`}
                    >
                      {exp.metric}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
