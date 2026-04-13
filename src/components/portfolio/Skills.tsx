import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Server, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Sites & Landing Pages",
    icon: Monitor,
    tagline: "Páginas rápidas, bonitas e que convertem.",
    skills: [
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "HTML5", icon: "devicon-html5-plain" },
      { name: "CSS3", icon: "devicon-css3-plain" },
    ],
  },
  {
    title: "Sistemas & SaaS",
    icon: Server,
    tagline: "Sistemas do zero, escaláveis e seguros.",
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
      { name: "MySQL", icon: "devicon-mysql-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "n8n / Automação", icon: "devicon-nodejs-plain" },
    ],
  },
  {
    title: "Apps Mobile",
    icon: Smartphone,
    tagline: "Apps para Android e iOS com foco em performance.",
    skills: [
      { name: "React Native", icon: "devicon-react-original" },
      { name: "Flutter", icon: "devicon-flutter-plain" },
      { name: "Dart", icon: "devicon-dart-plain" },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding overflow-hidden" ref={ref}>
      {/* Decorative Number */}
      <span className="section-number">02</span>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary uppercase tracking-[0.3em] mb-4">Serviços</p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
            O que eu <span className="text-primary">entrego</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + catIdx * 0.1, duration: 0.6 }}
              className="glass-card p-8 flex flex-col h-full hover:border-primary/20 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                  <cat.icon size={20} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {cat.title}
                </h3>
              </div>

              <p className="text-sm text-primary/80 font-medium mb-6 italic">
                "{cat.tagline}"
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + catIdx * 0.1 + i * 0.05 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/10 transition-all cursor-default"
                  >
                    <i className={`${skill.icon} text-sm`} />
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#contato"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + catIdx * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 text-foreground font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-auto"
              >
                Solicitar orçamento
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-colors">
                  <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
