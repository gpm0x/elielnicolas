import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Rocket, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Grupo Growth",
    role: "Full Stack Developer",
    period: "Mar 2025 – Jul 2025",
    location: "Remoto",
    description: [
      "Desenvolvimento de sites, apps e sistemas inteligentes",
      "Criação de bot financeiro com notícias, análises e alertas em tempo real",
      "Automação de fluxos com n8n e suporte em Machine Learning",
      "Gestão de projetos e definição de arquiteturas",
    ],
    isFounder: false,
  },
  {
    company: "MillenniuM",
    role: "Desenvolvedor Mobile",
    period: "Nov 2024 – Jun 2025",
    location: "Fortaleza, CE",
    description: [
      "Desenvolvimento de aplicativos móveis com foco em performance",
      "Integração robusta com APIs REST",
      "Otimização contínua da experiência do usuário",
    ],
    isFounder: false,
  },
  {
    company: "EEM Dep. Francisco Monte",
    role: "Desenvolvedor Web & Instrutor",
    period: "Jan 2024 – Jun 2025",
    location: "Fortaleza, CE",
    description: [
      "Responsável técnico pela infraestrutura web da instituição",
      "Automação de processos internos e criação de sistemas digitais",
      "Instrutor de programação e tecnologia para 30+ alunos",
    ],
    isFounder: false,
  },
  {
    company: "Fechô",
    role: "Fundador & CEO",
    period: "Mar 2023 – Presente",
    location: "Fortaleza, CE",
    description: [
      "SaaS desenvolvido com React e TypeScript do zero até validação",
      "60+ usuários ativos · 100+ contratos gerados",
      "Foco total em UX, performance e evolução contínua do produto",
    ],
    isFounder: true,
  },
  {
    company: "IJCPM",
    role: "Front-End Developer",
    period: "Jan 2022 – Dez 2023",
    location: "Fortaleza, CE",
    description: [
      "Criação de sistemas com React, JavaScript e Python",
      "Integração com Google Forms e MySQL",
      "Manutenção de sistemas web e correção de bugs",
    ],
    isFounder: false,
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
          <p className="font-mono text-sm text-primary uppercase tracking-[0.3em] mb-4">Trajetória</p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Onde eu <span className="text-primary">construí</span> minha carreira.
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

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
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
                      <p className="text-primary font-medium flex items-center gap-2">
                        <Briefcase size={16} />
                        {exp.role}
                      </p>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-1 text-xs font-mono text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="grid gap-3">
                    {exp.description.map((item, j) => (
                      <li key={j} className="text-text-secondary text-sm leading-relaxed flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
