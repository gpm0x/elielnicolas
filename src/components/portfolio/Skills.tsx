import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Smartphone, Database, Terminal as TerminalIcon } from "lucide-react";

const categories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" },
      { name: "Angular", icon: "devicon-angularjs-plain" },
      { name: "HTML5", icon: "devicon-html5-plain" },
      { name: "CSS3", icon: "devicon-css3-plain" },
    ],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    skills: [
      { name: "React Native", icon: "devicon-react-original" },
      { name: "Flutter", icon: "devicon-flutter-plain" },
      { name: "Dart", icon: "devicon-dart-plain" },
    ],
  },
  {
    title: "Backend & DB",
    icon: Database,
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "MySQL", icon: "devicon-mysql-plain" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
    ],
  },
  {
    title: "Ferramentas",
    icon: TerminalIcon,
    skills: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "n8n", icon: "devicon-nodejs-plain" }, // Alternative icon
      { name: "Vscode", icon: "devicon-vscode-plain" },
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
          <p className="font-mono text-sm text-primary uppercase tracking-[0.3em] mb-4">Especialidades</p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Meu ecossistema <br /> de <span className="text-primary">tecnologias</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + catIdx * 0.1, duration: 0.6 }}
              className="glass-card p-8 flex flex-col h-full hover:border-primary/20 group"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                  <cat.icon size={20} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
