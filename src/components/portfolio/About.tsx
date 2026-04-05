import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, FileText, Layers, ArrowRight } from "lucide-react";
import profileImg from "@/assets/eu.jpeg";

const stats = [
  { icon: Users, value: "60+", label: "Usuários ativos", color: "text-primary" },
  { icon: FileText, value: "100+", label: "Contratos gerados", color: "text-accent" },
  { icon: Layers, value: "2", label: "Apps publicados", color: "text-primary" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-padding overflow-hidden" ref={ref}>
      {/* Decorative Number */}
      <span className="section-number">01</span>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-center">
          {/* Photo Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Geometric Frame */}
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10" />
              <img
                src={profileImg}
                alt="Eliel Nicolas"
                className="w-full aspect-[3/4] object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                style={{ display: 'block' }}
              />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-card bg-primary/10 border-primary/20 z-20 backdrop-blur-xl">
                <p className="font-mono text-xs text-primary uppercase tracking-widest font-bold">Baseado em</p>
                <p className="font-display font-bold text-lg">Fortaleza, CE</p>
              </div>
            </div>

            {/* Decorative background shape */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-primary/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/5 blur-3xl rounded-full -z-10" />
          </motion.div>

          {/* Text Side */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none mb-8">
                Construindo o <span className="text-primary">futuro</span> através do código.
              </h2>

              <div className="grid gap-6 text-text-secondary leading-relaxed text-lg">
                <p>
                  Desenvolvedor Full Stack especializado no ecossistema <span className="text-foreground font-medium">React, Next.js, Node.js e TypeScript</span>.
                  Minha abordagem une a precisão técnica com uma visão empreendedora lapidada na prática.
                </p>
                <p>
                  Como fundador da <span className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">Fechô</span>,
                  construí um SaaS do zero que validou seu valor no mercado real, atendendo mais de 60 usuários e automatizando centenas de contratos.
                </p>
                <p>
                  Acredito que o código é uma ferramenta para <span className="text-foreground">resolver problemas reais</span>.
                  Minha missão é transformar ideias complexas em produtos digitais escaláveis e centrados no usuário.
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="glass-card p-6 flex flex-col gap-2 group hover:glow"
                >
                  <div className="flex items-center justify-between">
                    <stat.icon size={24} className={`${stat.color} opacity-80`} />
                    <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="font-display font-black text-3xl text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-text-muted uppercase tracking-widest leading-none">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
