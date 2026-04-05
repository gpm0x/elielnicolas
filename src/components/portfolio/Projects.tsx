import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Star, Layout, Database, Smartphone } from "lucide-react";

const projects = [
  {
    title: "Fechô",
    description:
      "SaaS completo para gestão de contratos desenvolvido com React e TypeScript. Validação de mercado com 60+ usuários reais e centenas de documentos gerados automaticamente.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "UX/UI"],
    featured: true,
    stats: "60+ usuários ativos · 100+ contratos",
    icon: Layout,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "DIETAI",
    description:
      "Aplicativo de nutrição com IA integrada para gerar refeições personalizadas.",
    tags: ["React-Native", "Node.js", "PostgreSQL", "UX/UI"],
    featured: false,
    icon: Database,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Company Code",
    description:
      "Empresa de tecnologia focada em soluções inovadoras como SaaS, aplicativos e sistemas web.",
    tags: ["Next.js", "Firebase", "Tailwind"],
    featured: false,
    icon: Smartphone,
    color: "from-orange-500 to-red-500"
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projetos" className="section-padding overflow-hidden" ref={ref}>
      {/* Decorative Number */}
      <span className="section-number">04</span>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary uppercase tracking-[0.3em] mb-4">Portfólio</p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
            O que eu <span className="text-primary">construí</span>.
          </h2>
        </motion.div>

        <div className="grid gap-8">
          {/* Featured project: Fechô */}
          {projects.filter(p => p.featured).map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="group relative glass-card p-8 md:p-12 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Star size={18} className="text-accent fill-accent" />
                    <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">Projeto Flagship</span>
                  </div>

                  <h3 className="font-display font-black text-3xl md:text-5xl text-foreground mb-6">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-lg mb-8 leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a href="#" className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors group/link">
                      <Github size={20} className="group-hover/link:rotate-12 transition-transform" />
                      Código
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors group/link">
                      <ExternalLink size={20} className="group-hover/link:scale-110 transition-transform" />
                      Demo ao vivo
                    </a>
                  </div>
                </div>

                {/* Visual Mockup Area */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-elevated border border-white/5 group-hover:border-primary/20 transition-colors">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon size={80} className="text-white/10 group-hover:text-primary/20 transition-colors group-hover:scale-110 duration-700" />
                  </div>
                  {/* Decorative "Browser" UI */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 flex items-center px-4 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Secondary projects grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(p => !p.featured).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="group glass-card p-8 flex flex-col gap-6 hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} bg-opacity-10 opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <project.icon size={24} className="text-white" />
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="text-text-muted hover:text-primary transition-colors">
                      <Github size={20} />
                    </a>
                    <a href="#" className="text-text-muted hover:text-primary transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-2xl mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
