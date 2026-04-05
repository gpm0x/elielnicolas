import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Linkedin, Github, Send, Instagram } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:Elielnicollas1011@gmail.com?subject=Contato via Portfólio - ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink);
  };

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/nicollaseliel/", color: "hover:text-red-400 hover:bg-red-400/10" },
    { icon: Phone, label: "WhatsApp", href: "https://wa.me/5585984440849", color: "hover:text-green-400 hover:bg-green-400/10" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/elielnicolas", color: "hover:text-blue-400 hover:bg-blue-400/10" },
    { icon: Github, label: "GitHub", href: "https://github.com/elielnicolas", color: "hover:text-white hover:bg-white/10" },
  ];

  return (
    <section id="contato" className="section-padding overflow-hidden" ref={ref}>
      {/* Decorative Number */}
      <span className="section-number">05</span>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-32">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-sm text-primary uppercase tracking-[0.3em] mb-4">Contato</p>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-7xl tracking-tight leading-none mb-10">
              Vamos <br /> <span className="text-primary">conversar</span>?
            </h2>

            <p className="text-text-secondary text-lg mb-12 max-w-md leading-relaxed">
              Estou sempre em busca de novos desafios, parcerias e projetos inovadores.
              Sinta-se à vontade para me contatar.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`flex items-center gap-4 p-5 glass-card !rounded-2xl transition-all duration-300 ${link.color}`}
                >
                  <link.icon size={20} />
                  <span className="font-display font-bold text-sm tracking-tight">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="glass-card p-10 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-white/10 py-3 text-foreground focus:border-primary focus:outline-none transition-colors peer"
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focusedField === "name" || formData.name
                    ? "-top-6 text-primary text-xs uppercase tracking-widest"
                    : "top-3 text-text-muted"
                    }`}>
                    Seu nome completo
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-white/10 py-3 text-foreground focus:border-primary focus:outline-none transition-colors peer"
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focusedField === "email" || formData.email
                    ? "-top-6 text-primary text-xs uppercase tracking-widest"
                    : "top-3 text-text-muted"
                    }`}>
                    E-mail
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-white/10 py-3 text-foreground focus:border-primary focus:outline-none transition-colors peer resize-none"
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focusedField === "message" || formData.message
                    ? "-top-6 text-primary text-xs uppercase tracking-widest"
                    : "top-3 text-text-muted"
                    }`}>
                    Como posso te ajudar hoje?
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full relative py-5 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-[0.2em] overflow-hidden btn-shimmer group shadow-2xl shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Send size={18} />
                    Enviar Mensagem
                  </span>
                </button>
              </form>
            </div>

            {/* Background glowing blob for form */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
