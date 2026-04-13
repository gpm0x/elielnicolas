import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Linkedin, Instagram, MessageSquare, CheckCircle2, ChevronDown, AlertCircle } from "lucide-react";

// ─── TYPES & CONSTANTS ─────────────────────────────────────────────────────────

type ServiceType = "site" | "landing" | "sistema" | "app" | "outro" | "";

interface ServiceOption {
  value: ServiceType;
  label: string;
  description: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "site", label: "Site Institucional", description: "Presença digital profissional para sua empresa." },
  { value: "landing", label: "Landing Page", description: "Focada em conversão e vendas diretas." },
  { value: "sistema", label: "Sistema / SaaS", description: "Sistemas complexos sob medida." },
  { value: "app", label: "App Mobile", description: "Aplicativos iOS e Android nativos ou híbridos." },
  { value: "outro", label: "Outro", description: "Consultoria ou projetos especiais." },
];

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: "E-mail",
    sublabel: "Elielnicollas1011@gmail.com",
    href: "mailto:Elielnicollas1011@gmail.com",
    color: "hover:text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/20",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    sublabel: "linkedin.com/in/elielnicolas",
    href: "https://www.linkedin.com/in/eliel-nicolas-751822252/",
    color: "hover:text-sky-400 hover:bg-sky-400/10 hover:border-sky-400/20",
    glow: "group-hover:shadow-sky-500/20",
  },
  {
    icon: Instagram,
    label: "Instagram",
    sublabel: "@nicollaseliel",
    href: "https://www.instagram.com/nicollaseliel/",
    color: "hover:text-pink-400 hover:bg-pink-400/10 hover:border-pink-400/20",
    glow: "group-hover:shadow-pink-500/20",
  },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "" as ServiceType,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ─── VALIDATION ─────────────────────────────────────────────────────────────

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "O nome é obrigatório";

    if (!formData.contact.trim()) {
      newErrors.contact = "O contato é obrigatório";
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact);
      const isPhone = /^[0-9\s()+-]{8,}$/.test(formData.contact);
      if (!isEmail && !isPhone) {
        newErrors.contact = "Insira um e-mail ou telefone válido";
      }
    }

    if (!formData.service) newErrors.service = "Selecione um serviço";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const serviceLabel = SERVICE_OPTIONS.find(opt => opt.value === formData.service)?.label || formData.service;

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: serviceLabel
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Erro ao enviar mensagem';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // Non-JSON error message or empty body
        }
        throw new Error(errorMessage);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Erro no envio:', err);

      const msg = err.message === 'Failed to fetch'
        ? 'Não foi possível conectar ao servidor. Verifique se o back-end está rodando.'
        : err.message || 'Ocorreu um erro inesperado.';

      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <p className="font-mono text-sm text-primary uppercase tracking-[0.3em] mb-4">Orçamento</p>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-7xl tracking-tight leading-none mb-6">
              Tem um projeto <br /> <span className="text-primary">em mente?</span>
            </h2>

            <p className="text-text-secondary text-lg mb-12 max-w-md leading-relaxed">
              Me conta o que você precisa — sites, sistemas ou apps.
              Respondo em até <span className="text-foreground font-semibold">24h</span> com uma proposta inicial.
            </p>

            <div className="grid gap-3">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`group flex items-center gap-4 p-4 glass-card !rounded-2xl transition-all duration-300 ${link.color} ${link.glow}`}
                >
                  <link.icon size={20} className="transition-transform group-hover:scale-110" />
                  <div>
                    <p className="font-display font-bold text-sm tracking-tight">{link.label}</p>
                    <p className="text-xs text-text-muted">{link.sublabel}</p>
                  </div>
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
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className="glass-card p-10 md:p-12 relative overflow-hidden"
                >
                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    {/* Name Input */}
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onFocus={() => { setFocusedField("name"); setErrors({ ...errors, name: "" }); }}
                        onBlur={() => setFocusedField(null)}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-transparent border-b-2 py-3 text-foreground focus:outline-none transition-colors peer ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-primary'}`}
                      />
                      <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focusedField === "name" || formData.name
                        ? "-top-6 text-primary text-[10px] uppercase tracking-widest font-bold"
                        : "top-3 text-text-muted"
                        } ${errors.name ? 'text-red-400' : ''}`}>
                        Seu nome
                      </label>
                      {errors.name && (
                        <span className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Contact Input */}
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onFocus={() => { setFocusedField("contact"); setErrors({ ...errors, contact: "" }); }}
                        onBlur={() => setFocusedField(null)}
                        onChange={e => setFormData({ ...formData, contact: e.target.value })}
                        className={`w-full bg-transparent border-b-2 py-3 text-foreground focus:outline-none transition-colors peer ${errors.contact ? 'border-red-500/50' : 'border-white/10 focus:border-primary'}`}
                      />
                      <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focusedField === "contact" || formData.contact
                        ? "-top-6 text-primary text-[10px] uppercase tracking-widest font-bold"
                        : "top-3 text-text-muted"
                        } ${errors.contact ? 'text-red-400' : ''}`}>
                        E-mail ou Telefone
                      </label>
                      {errors.contact && (
                        <span className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.contact}
                        </span>
                      )}
                    </div>

                    {/* Custom Service Select */}
                    <div className="relative">
                      <label className={`absolute left-0 -top-6 text-primary text-[10px] uppercase tracking-widest font-bold transition-opacity ${formData.service ? 'opacity-100' : 'opacity-0'}`}>
                        O que você precisa?
                      </label>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setFocusedField(focusedField === "service" ? null : "service")}
                          className={`w-full flex items-center justify-between bg-transparent border-b-2 py-3 text-left transition-colors ${focusedField === "service" ? 'border-primary' : (errors.service ? 'border-red-500/50' : 'border-white/10')} ${!formData.service ? 'text-text-muted' : 'text-foreground'}`}
                        >
                          <span className="font-medium">
                            {formData.service ? SERVICE_OPTIONS.find(o => o.value === formData.service)?.label : "O que você precisa?"}
                          </span>
                          <ChevronDown size={18} className={`transition-transform duration-300 ${focusedField === "service" ? 'rotate-180 text-primary' : 'text-text-muted'}`} />
                        </button>

                        <AnimatePresence>
                          {focusedField === "service" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute left-0 right-0 top-full mt-2 z-[100] p-2 bg-[#0f0f1a] border border-white/10 shadow-2xl overflow-hidden rounded-2xl backdrop-blur-3xl"
                            >
                              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                {SERVICE_OPTIONS.map((option) => (
                                  <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, service: option.value });
                                      setFocusedField(null);
                                      setErrors({ ...errors, service: "" });
                                    }}
                                    className={`w-full text-left p-4 rounded-xl transition-all group ${formData.service === option.value ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-text-muted hover:text-foreground'}`}
                                  >
                                    <p className="font-bold text-sm tracking-tight">{option.label}</p>
                                    <p className="text-[10px] opacity-60 mt-0.5">{option.description}</p>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {errors.service && (
                        <span className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.service}
                        </span>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="relative group">
                      <textarea
                        rows={3}
                        value={formData.message}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/10 py-3 text-foreground focus:border-primary focus:outline-none transition-colors peer resize-none"
                      />
                      <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focusedField === "message" || formData.message
                        ? "-top-6 text-primary text-[10px] uppercase tracking-widest font-bold"
                        : "top-3 text-text-muted"
                        }`}>
                        Detalhes (opcional)
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden btn-shimmer group shadow-2xl transition-all bg-primary text-white shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <MessageSquare size={18} />
                            Solicitar orçamento grátis
                          </>
                        )}
                      </span>
                    </button>
                  </form>

                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-primary/5 blur-[60px] rounded-full -z-0" />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[500px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 border border-green-500/30"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>

                  <h3 className="font-display font-black text-3xl md:text-4xl text-foreground mb-4">
                    Recebido com <span className="text-primary">sucesso!</span>
                  </h3>

                  <p className="text-text-secondary text-lg mb-10 max-w-sm">
                    Obrigado pelo contato, {formData.name.split(' ')[0]}! Analisarei sua mensagem e retornarei em até 24 horas.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", contact: "", service: "", message: "" });
                    }}
                    className="px-8 py-4 rounded-xl border border-white/10 hover:border-primary/50 text-text-muted hover:text-primary transition-all font-bold text-sm uppercase tracking-widest"
                  >
                    Enviar nova mensagem
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10 transition-opacity duration-1000 ${submitted ? 'opacity-40' : 'opacity-100'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
