import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ExternalLink,
  Github,
  FileSignature,
  Salad,
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Fechô",
    category: "SaaS · Jurídico",
    problem: "Empresas gerenciando contratos manualmente, com risco e lentidão.",
    solution: "SaaS completo para criação e gestão de contratos com assinatura digital.",
    result: "60+ usuários ativos · 100+ contratos gerados",
    resultHighlight: true,
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    color: "from-blue-500 to-cyan-400",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/5",
    icon: FileSignature,
    demo: "https://fecho-one.vercel.app/",
    code: "#",
  },
  {
    title: "DIETAI",
    category: "App · Saúde & Nutrição",
    problem: "Planos alimentares genéricos que ignoram rotina e preferências individuais.",
    solution: "App mobile com IA que gera refeições 100% personalizadas em segundos.",
    result: "App em produção · IA integrada",
    resultHighlight: false,
    tags: ["React Native", "Node.js", "PostgreSQL", "IA"],
    color: "from-emerald-500 to-teal-400",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    icon: Salad,
    demo: "https://dietai-pearl.vercel.app/",
    code: "#",
  },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projetos" className="section-padding overflow-hidden" ref={ref}>
      {/* Decorative Number */}
      <span className="section-number">04</span>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary uppercase tracking-[0.3em] mb-4">Portfólio</p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Projetos que <span className="text-primary">geram resultado</span>.
          </h2>
          <p className="mt-5 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Mais do que projetos isolados — um{" "}
            <span className="text-foreground font-semibold">ecossistema de produtos digitais reais</span>,
            cada um resolvendo um problema de mercado específico.
          </p>
        </motion.div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              className={`group glass-card p-8 flex flex-col gap-5 border ${project.borderColor} ${project.bgColor} hover:border-opacity-60 transition-all duration-500`}
            >
              {/* Card header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg shrink-0`}>
                    <project.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-mono ${project.accentColor} uppercase tracking-[0.2em] font-bold`}>
                      {project.category}
                    </p>
                    <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href={project.code} className="text-text-muted hover:text-primary transition-colors">
                    <Github size={18} />
                  </a>
                  <a href={project.demo} className="text-text-muted hover:text-primary transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Problem → Resultado */}
              <div className="grid gap-2.5">
                <div className="flex items-start gap-3">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider pt-0.5 shrink-0 w-14">Problema</span>
                  <p className="text-text-secondary text-sm leading-relaxed">{project.problem}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider pt-0.5 shrink-0 w-14">Solução</span>
                  <p className="text-text-secondary text-sm leading-relaxed">{project.solution}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className={`text-[9px] font-mono uppercase tracking-wider pt-0.5 shrink-0 w-14 font-bold ${project.resultHighlight ? "text-primary" : project.accentColor}`}>
                    Resultado
                  </span>
                  <p className={`text-sm font-bold ${project.resultHighlight ? "text-primary" : project.accentColor}`}>
                    {project.result}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-bold text-text-muted uppercase tracking-wider border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
