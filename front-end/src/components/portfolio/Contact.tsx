import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { Reveal, SectionHeading, StatusDot } from "./primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

type ServiceType = "site" | "landing" | "sistema" | "app" | "outro" | "";

const SERVICE_OPTIONS: { value: ServiceType; label: string; description: string }[] = [
  { value: "site", label: "Site Institucional", description: "Presença digital profissional para sua empresa." },
  { value: "landing", label: "Landing Page", description: "Focada em conversão e vendas diretas." },
  { value: "sistema", label: "Sistema / SaaS", description: "Sistemas complexos sob medida." },
  { value: "app", label: "App Mobile", description: "Aplicativos iOS e Android nativos ou híbridos." },
  { value: "outro", label: "Outro", description: "Consultoria ou projetos especiais." },
];

const CHANNELS = [
  {
    icon: Mail,
    label: "E-mail",
    value: "Elielnicollas1011@gmail.com",
    href: "mailto:Elielnicollas1011@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/eliel-nicolas",
    href: "https://www.linkedin.com/in/eliel-nicolas-751822252/",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@nicollaseliel",
    href: "https://www.instagram.com/nicollaseliel/",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "" as ServiceType,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);

    const serviceLabel =
      SERVICE_OPTIONS.find((opt) => opt.value === formData.service)?.label ||
      formData.service;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service: serviceLabel }),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao enviar mensagem";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Non-JSON or empty error body — keep the generic message.
        }
        throw new Error(errorMessage);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Erro no envio:", err);
      const raw = err instanceof Error ? err.message : "";
      setSubmitError(
        raw === "Failed to fetch"
          ? "Não foi possível conectar ao servidor. Verifique se o back-end está rodando."
          : raw || "Ocorreu um erro inesperado."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Floating-label field shared by the text inputs and the textarea. */
  const labelClass = (id: string, value: string, hasError: boolean) =>
    `pointer-events-none absolute left-0 transition-all duration-400 ease-editorial ${
      focusedField === id || value
        ? "-top-4 font-mono text-[9px] uppercase tracking-label"
        : "top-3.5 text-[15px] text-ink-faint"
    } ${
      hasError
        ? "text-red-400"
        : focusedField === id || value
        ? "text-primary"
        : ""
    }`;

  return (
    <section id="contato" className="section rule-top">
      <div className="frame relative z-10">
        <SectionHeading
          index="05"
          kicker="Contato"
          title={
            <>
              Tem um projeto
              <br />
              <span className="text-primary">em mente?</span>
            </>
          }
          note="Me conta o que você precisa — site, sistema ou app. Respondo em até 24h com uma proposta inicial e um prazo realista."
        />

        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* ── Channels ─────────────────────────────────────────────── */}
          <div>
            <Reveal>
              <div className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.06] py-1.5 pl-3 pr-4">
                <StatusDot />
                <span className="font-mono text-[10px] uppercase tracking-label text-accent">
                  Aceitando projetos para 2026
                </span>
              </div>
            </Reveal>

            <div className="border-t border-border">
              {CHANNELS.map((channel, i) => (
                <Reveal key={channel.label} delay={0.08 + i * 0.07}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 border-b border-border py-5 transition-colors duration-500 hover:bg-white/[0.015]"
                  >
                    <channel.icon
                      size={17}
                      strokeWidth={1.6}
                      className="shrink-0 text-ink-faint transition-colors duration-400 group-hover:text-primary"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="eyebrow">{channel.label}</p>
                      <p className="mt-1 truncate text-sm text-ink transition-colors duration-400 group-hover:text-primary">
                        {channel.value}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-ink-ghost transition-all duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink-faint">
                Prefere conversar direto? Manda um e-mail com duas linhas sobre o
                projeto — eu respondo com as perguntas certas.
              </p>
            </Reveal>
          </div>

          {/* ── Form ─────────────────────────────────────────────────── */}
          <Reveal delay={0.12}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="panel p-7 md:p-11"
                >
                  <div className="mb-10 flex items-center justify-between border-b border-border pb-5">
                    <span className="eyebrow">Briefing rápido</span>
                    <span className="font-mono text-[10px] text-ink-ghost">
                      ~1 min
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-11">
                    {/* Name */}
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onFocus={() => {
                          setFocusedField("name");
                          setErrors({ ...errors, name: "" });
                        }}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`field ${errors.name ? "!border-red-500/60" : ""}`}
                      />
                      <label htmlFor="name" className={labelClass("name", formData.name, !!errors.name)}>
                        Seu nome
                      </label>
                      {errors.name && (
                        <span className="absolute -bottom-5 left-0 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-red-400">
                          <AlertCircle size={10} /> {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="relative">
                      <input
                        id="contact"
                        type="text"
                        value={formData.contact}
                        onFocus={() => {
                          setFocusedField("contact");
                          setErrors({ ...errors, contact: "" });
                        }}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                        className={`field ${errors.contact ? "!border-red-500/60" : ""}`}
                      />
                      <label
                        htmlFor="contact"
                        className={labelClass("contact", formData.contact, !!errors.contact)}
                      >
                        E-mail ou telefone
                      </label>
                      {errors.contact && (
                        <span className="absolute -bottom-5 left-0 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-red-400">
                          <AlertCircle size={10} /> {errors.contact}
                        </span>
                      )}
                    </div>

                    {/* Service select */}
                    <div className="relative">
                      <span
                        className={`pointer-events-none absolute -top-4 left-0 font-mono text-[9px] uppercase tracking-label text-primary transition-opacity duration-400 ${
                          formData.service ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        O que você precisa?
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectOpen((v) => !v)}
                        aria-expanded={selectOpen}
                        className={`field flex w-full items-center justify-between text-left ${
                          errors.service ? "!border-red-500/60" : ""
                        } ${selectOpen ? "!border-primary" : ""} ${
                          formData.service ? "text-ink" : "text-ink-faint"
                        }`}
                      >
                        <span className="text-[15px]">
                          {formData.service
                            ? SERVICE_OPTIONS.find((o) => o.value === formData.service)?.label
                            : "O que você precisa?"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-500 ease-editorial ${
                            selectOpen ? "rotate-180 text-primary" : "text-ink-faint"
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {selectOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-surface-high shadow-2xl shadow-black/60"
                          >
                            {SERVICE_OPTIONS.map((option) => {
                              const isSelected = formData.service === option.value;
                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, service: option.value });
                                    setSelectOpen(false);
                                    setErrors({ ...errors, service: "" });
                                  }}
                                  className={`flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left transition-colors duration-300 last:border-b-0 ${
                                    isSelected
                                      ? "bg-primary/10 text-primary"
                                      : "text-ink-muted hover:bg-white/[0.03] hover:text-ink"
                                  }`}
                                >
                                  <span className="flex-1">
                                    <span className="block text-sm font-medium">
                                      {option.label}
                                    </span>
                                    <span className="mt-0.5 block text-[11px] text-ink-faint">
                                      {option.description}
                                    </span>
                                  </span>
                                  {isSelected && <Check size={14} />}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {errors.service && (
                        <span className="absolute -bottom-5 left-0 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-red-400">
                          <AlertCircle size={10} /> {errors.service}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={3}
                        value={formData.message}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="field resize-none"
                      />
                      <label htmlFor="message" className={labelClass("message", formData.message, false)}>
                        Detalhes do projeto (opcional)
                      </label>
                    </div>

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="flex items-start gap-2 rounded-md border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-red-300"
                      >
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        {submitError}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-solid w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" />
                          <span>Enviando…</span>
                        </>
                      ) : (
                        <>
                          <span>Solicitar orçamento grátis</span>
                          <ArrowUpRight size={15} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* ── Success ─────────────────────────────────────────── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="panel flex min-h-[440px] flex-col items-center justify-center p-10 text-center md:p-14"
                >
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"
                  >
                    <Check size={28} strokeWidth={2.2} />
                  </motion.span>

                  <h3 className="headline mt-8 text-3xl md:text-4xl">
                    Recebido<span className="text-accent">.</span>
                  </h3>

                  <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-muted">
                    Obrigado pelo contato
                    {formData.name.trim() ? `, ${formData.name.trim().split(" ")[0]}` : ""}!
                    Vou analisar sua mensagem e retornar em até 24 horas.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", contact: "", service: "", message: "" });
                    }}
                    className="btn btn-ghost mt-10"
                  >
                    <span>Enviar outra mensagem</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
