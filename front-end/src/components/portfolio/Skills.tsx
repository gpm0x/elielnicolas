import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    id: "web",
    index: "01",
    title: "Sites & Landing Pages",
    tagline: "Páginas rápidas, bonitas e feitas para converter.",
    body: "Da estrutura de copy ao deploy. Performance medida, SEO técnico resolvido e um layout que não parece template.",
    deliverables: ["Design + código", "SEO técnico", "Deploy e domínio", "Analytics"],
    stack: [
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" },
      { name: "HTML5", icon: "devicon-html5-plain" },
      { name: "CSS3", icon: "devicon-css3-plain" },
    ],
  },
  {
    id: "saas",
    index: "02",
    title: "Sistemas & SaaS",
    tagline: "Plataformas do zero, escaláveis e seguras.",
    body: "Autenticação, permissões, cobrança, painel administrativo e automações. O sistema inteiro, não só a tela bonita.",
    deliverables: ["Arquitetura", "API + banco", "Painel admin", "Automação"],
    stack: [
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
      { name: "MySQL", icon: "devicon-mysql-plain" },
      { name: "Python", icon: "devicon-python-plain" },
    ],
  },
  {
    id: "mobile",
    index: "03",
    title: "Apps Mobile",
    tagline: "Android e iOS com foco em performance.",
    body: "Aplicativos híbridos que rodam nas duas lojas com uma base de código só — integrados às APIs que você já tem.",
    deliverables: ["iOS + Android", "Integração com API", "Publicação nas lojas", "Push"],
    stack: [
      { name: "React Native", icon: "devicon-react-original" },
      { name: "Flutter", icon: "devicon-flutter-plain" },
      { name: "Dart", icon: "devicon-dart-plain" },
    ],
  },
  {
    id: "Mentoria",
    index: "04",
    title: "Mentoria",
    tagline: "Aprenda tecnologia e construa seu próprio SaaS.",
    body: "Uma mentoria prática para quem deseja acelerar a carreira em tecnologia e tirar uma ideia do papel. Vou compartilhar o caminho que utilizo para validar, desenvolver, lançar e evoluir um SaaS, além de orientar sobre mercado, programação, produto e empreendedorismo.",
    deliverables: [
      "Plano de carreira em tecnologia",
      "Mentoria para construção de SaaS",
      "Validação de ideias",
      "Arquitetura e desenvolvimento",
      "Boas práticas de programação",
      "Estratégias de lançamento e monetização"
    ],
    stack: [
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-original" },
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Supabase", icon: "devicon-supabase-plain" }
    ],
  }
];

const Skills = () => {
  const [open, setOpen] = useState<string | null>(SERVICES[0].id);

  return (
    <section id="servicos" className="section rule-top">
      <div className="frame relative z-10">
        <SectionHeading
          index="02"
          kicker="Serviços"
          title={
            <>
              O que eu <span className="text-primary">entrego</span>.
            </>
          }
          note="Três frentes, um mesmo padrão de execução: escopo claro, comunicação direta e um produto no ar no fim do prazo."
        />

        <div className="border-t border-border">
          {SERVICES.map((service, i) => {
            const isOpen = open === service.id;

            return (
              <Reveal key={service.id} delay={i * 0.08} className="border-b border-border">
                <div className="group">
                  {/* ── Row header ────────────────────────────────── */}
                  <button
                    onClick={() => setOpen(isOpen ? null : service.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 py-7 text-left md:gap-8 md:py-9"
                  >
                    <span
                      className={`font-mono text-[11px] tabular-nums transition-colors duration-500 ${isOpen ? "text-primary" : "text-ink-ghost"
                        }`}
                    >
                      {service.index}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`headline text-[clamp(1.6rem,4.4vw,3.1rem)] transition-colors duration-500 ${isOpen ? "text-ink" : "text-ink-faint group-hover:text-ink"
                          }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <span className="hidden max-w-[24ch] shrink-0 text-right text-sm text-ink-muted lg:block">
                      {service.tagline}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-editorial ${isOpen
                        ? "rotate-180 border-primary/40 bg-primary/10 text-primary"
                        : "border-border text-ink-faint group-hover:border-ink-ghost group-hover:text-ink"
                        }`}
                    >
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>

                  {/* ── Expanded detail ───────────────────────────── */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1fr] md:gap-16 md:pl-[calc(11px+2rem)] lg:grid-cols-[1.1fr_0.9fr]">
                          <div>
                            <p className="max-w-md text-[15px] leading-relaxed text-ink-muted">
                              {service.body}
                            </p>

                            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5">
                              {service.deliverables.map((d) => (
                                <li
                                  key={d}
                                  className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint"
                                >
                                  <span className="h-px w-3 bg-accent/70" />
                                  {d}
                                </li>
                              ))}
                            </ul>

                            <a
                              href="#contato"
                              className="group/cta mt-9 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-label text-primary"
                            >
                              <span className="link-wipe">Solicitar orçamento</span>
                              <ArrowUpRight
                                size={13}
                                className="transition-transform duration-500 ease-editorial group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                              />
                            </a>
                          </div>

                          {/* Stack chips */}
                          <div className="md:pt-1">
                            <p className="eyebrow mb-4">Stack</p>
                            <div className="flex flex-wrap gap-2">
                              {service.stack.map((tech, j) => (
                                <motion.span
                                  key={tech.name}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: 0.12 + j * 0.045,
                                    duration: 0.5,
                                    ease: EASE,
                                  }}
                                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3 py-1.5 text-[12px] text-ink-muted transition-colors duration-400 hover:border-primary/40 hover:text-ink"
                                >
                                  <i className={`${tech.icon} text-[13px]`} aria-hidden="true" />
                                  {tech.name}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
