import { motion } from "framer-motion";
import { ChevronDown, MessageSquare, FolderOpen, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [terminalText, setTerminalText] = useState("");
  const fullText = "const problema = eliel.resolve( seuProjeto );";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-1/4 -left-20 text-[25vw] font-display font-black text-white/[0.02] leading-none select-none">
          BUILDER
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-6">
          {/* Status Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-medium text-primary uppercase tracking-widest">
              Disponível para novos projetos
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="flex flex-col mb-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.85] text-foreground"
            >
              ELIEL <br />
              <span className="text-primary">NICOLAS</span>
            </motion.h1>
          </div>

          {/* Terminal Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-surface-card border border-white/5 font-mono text-sm md:text-base text-accent/80 backdrop-blur-xl"
          >
            <Terminal size={16} className="text-primary" />
            <span className="flex items-center gap-1">
              {terminalText}
              <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-primary inline-block"
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight mb-3">
              Seu próximo site, sistema ou app —{" "}
              <span className="text-primary">entregue do jeito certo.</span>
            </p>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Desenvolvo sites, landing pages, sistemas e SaaS customizados
              para negócios que precisam de resultado — não só de código.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <a
              href="#contato"
              className="group relative px-8 py-4 rounded-xl bg-primary text-white font-bold text-sm flex items-center gap-2 overflow-hidden btn-shimmer"
            >
              <MessageSquare size={18} />
              <span>Solicitar orçamento</span>
            </a>
            <a
              href="#projetos"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-foreground font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            >
              <FolderOpen size={18} />
              <span>Ver projetos</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-text-muted font-mono tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
