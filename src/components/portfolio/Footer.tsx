import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: Github, href: "https://github.com/ElielM10100", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/eliel-nicolas-751822252/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/nicollaseliel/", label: "Instagram" },

  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-16 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-display font-black tracking-tighter text-foreground"
            >
              Eliel Nicolas<span className="text-primary">.</span>
            </motion.div>
            <p className="text-text-muted text-[10px] font-mono uppercase tracking-[0.3em]">
              © {currentYear} Eliel Nicolas · Todos os direitos reservados
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 flex items-center justify-center rounded-xl border border-white/5 text-text-muted hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            className="group flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <ArrowUp size={18} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest">Topo</span>
          </motion.button>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex justify-center">
          <p className="text-xs font-mono text-text-muted flex items-center gap-2">
            Construído com <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="text-primary italic">⚡</motion.span> por Eliel Nicolas
          </p>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  );
};

export default Footer;
