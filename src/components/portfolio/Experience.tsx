import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, TrendingUp } from "lucide-react";

const experiences = [
  {
    company: "Fechô",
    role: "Fundador & Dev",
    result: "SaaS de contratos do zero até 60+ usuários ativos e 100+ contratos gerados.",
    tags: ["SaaS", "React", "TypeScript", "Node.js"],
    isFounder: true,
    highlight: "60+ usuários · 100+ contratos",
  },
  {
    company: "Grupo Growth",
    role: "Full Stack",
    result: "Sistemas web, automações e um bot financeiro inteligente com alertas em tempo real.",
    tags: ["Sistema", "Automação", "n8n", "IA"],
    isFounder: false,
    highlight: "Bot financeiro em produção",
  },
  {
    company: "MillenniuM",
    role: "Mobile Dev",
    result: "Apps mobile integrados a APIs com foco em performance e experiência do usuário.",
    tags: ["App Mobile", "React Native", "APIs REST"],
    isFounder: false,
    highlight: "Apps publicados nas lojas",
  },
  {
    company: "EEM Dep. Francisco Monte",
    role: "Dev & Instrutor",
    result: "Infraestrutura web da instituição + automação interna + 30+ alunos formados em programação.",
    tags: ["Web", "Automação", "Ensino"],
    isFounder: false,
    highlight: "30+ alunos formados",
  },
  {
    company: "IJCPM",
    role: "Front-End Developer",
    result: "Sistemas web em React e Python, integração com bancos de dados e otimização de processos internos.",
    tags: ["React", "Python", "MySQL"],
    isFounder: false,
    highlight: "Sistemas internos otimizados",
  },
];

const Experience = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experiencia" className="section-padding overflow-hidden" ref={containerRef}>
      {/* Decorative Number */}
      <span className="section-number">03</span>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-mono text-sm text-primary uppercase tracking-[0.3em] mb-4">Casos de sucesso</p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Onde já <span className="text-primary">entreguei</span> resultado.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-white/5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-transparent origin-top"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                className="relative pl-12 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-[13px] md:left-[29px] top-6 w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 scale-125 z-20 ${
                  exp.isFounder 
                    ? "bg-accent border-accent shadow-[0_0_15px_rgba(45,212,191,0.5)]" 
                    : "bg-background border-primary"
                }`} />

                {/* Card */}
                <div className={`group relative glass-card p-8 hover:border-white/20 transition-all duration-500 ${
                  exp.isFounder ? "border-accent/40 bg-accent/[0.02]" : ""
                }`}>
                  {/* Rotating Gradient for Founder */}
                  {exp.isFounder && (
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary via-accent to-primary animate-gradient-xy opacity-30 -z-10" />
                  )}

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-primary transition-colors">
                          {exp.company}
                        </h3>
                        {exp.isFounder && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-wider">
                            <Rocket size={10} /> Founder
                          </span>
                        )}
                      </div>
                      <p className="text-primary font-medium text-sm">{exp.role}</p>
                    </div>

                    {/* Highlight stat */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold shrink-0">
                      <TrendingUp size={14} />
                      {exp.highlight}
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {exp.result}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-bold text-text-muted uppercase tracking-wider border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
