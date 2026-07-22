import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/eu.jpeg";
import { Reveal, SectionHeading } from "./primitives";

const STATS = [
  { value: 60, suffix: "+", label: "Clientes atendidos" },
  { value: 100, suffix: "+", label: "Contratos entregues" },
  { value: 3, suffix: "+", label: "Anos de experiência" },
  { value: 4, suffix: "+", label: "Produtos em produção" },
];

const PRINCIPLES = [
  {
    title: "Entrego, não só desenvolvo",
    body: "Escopo fechado, prazo real e um produto no ar. Código bonito que ninguém usa não conta como entrega.",
  },
  {
    title: "Penso como fundador",
    body: "Já tive que vender, dar suporte e sustentar o próprio produto. Isso muda as decisões técnicas que tomo pelo seu.",
  },
  {
    title: "Construo para escalar",
    body: "Arquitetura que aguenta o próximo ano, não só o próximo deploy. Sem dívida técnica escondida na entrega.",
  },
];

/* Odometer-style counter — runs once when the strip enters the viewport. */
const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const still = useReducedMotion();
  const [display, setDisplay] = useState(still ? to : 0);

  useEffect(() => {
    if (!inView || still) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, still]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-primary">{suffix}</span>
    </span>
  );
};

const About = () => (
  <section id="sobre" className="section rule-top">
    <div className="frame relative z-10">
      <SectionHeading
        index="01"
        kicker="Sobre"
        title={
          <>
            Resultado real,
            <br />
            <span className="stroke-ink">não só código.</span>
          </>
        }
        note={
          <>
            Sou Eliel Nicolas, desenvolvedor full-stack há mais de três anos
            construindo produtos digitais reais — de landing pages que convertem
            a sistemas SaaS com usuários ativos todos os dias.
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* ── Portrait ─────────────────────────────────────────────── */}
        <Reveal>
          <figure className="relative">
            <div className="ticks group relative aspect-[3/4] overflow-hidden border border-border">
              <img
                src={profileImg}
                alt="Eliel Nicolas"
                loading="lazy"
                className="h-full w-full object-cover object-top grayscale contrast-[1.05] transition-all duration-900 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-accent/15 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            <figcaption className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="eyebrow">Fortaleza, CE — Brasil</span>
              <span className="font-mono text-[10px] text-ink-ghost">
                Remoto / Híbrido
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* ── Narrative ────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center">
          <Reveal delay={0.1}>
            <div className="space-y-6 text-[17px] leading-[1.7] text-ink-muted">
              <p>
                Como fundador da{" "}
                <span className="font-medium text-accent">Fechô</span>, construí
                do zero um SaaS de contratos que chegou a{" "}
                <span className="text-ink">
                  60+ usuários ativos e 100+ contratos gerados
                </span>
                . Não foi um projeto de portfólio — foi um produto com clientes,
                suporte e faturamento.
              </p>
              <p>
                Essa experiência é o que separa quem escreve código de quem
                entrega negócio. Quando você me contrata, recebe{" "}
                <span className="text-ink">
                  um produto que funciona, que vende e que escala
                </span>
                .
              </p>
            </div>
          </Reveal>

          {/* Principles as a numbered index list */}
          <div className="mt-12 border-t border-border">
            {PRINCIPLES.map((item, i) => (
              <Reveal key={item.title} delay={0.15 + i * 0.07}>
                <div className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-border py-6 transition-colors duration-500 hover:bg-white/[0.015]">
                  <span className="pt-1 font-mono text-[10px] tabular-nums text-primary/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-headline text-ink transition-colors duration-400 group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stat strip — the numbers, set like a data table ─────────── */}
      <div className="mt-20 grid grid-cols-2 border-t border-border md:mt-28 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className="group relative border-b border-border py-8 pr-4 md:border-b-0 md:border-l md:px-7 md:py-10 md:first:border-l-0 md:first:pl-0"
          >
            {/* Rule that draws itself in on hover */}
            <span className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-editorial group-hover:scale-x-100" />
            <div className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-none tracking-tightest text-ink">
              <Counter to={stat.value} suffix={stat.suffix} />
            </div>
            <p className="eyebrow mt-3">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
