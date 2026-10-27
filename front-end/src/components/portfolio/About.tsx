import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/eu.jpeg";
import { Reveal, SectionHeading } from "./primitives";

const STATS = [
  { value: 90, suffix: "+", label: "Clientes atendidos" },
  { value: 5, suffix: "+", label: "Anos de experiência" },
  { value: 60, suffix: "+", label: "Usuários ativos na Fechô" },
  { value: 100, suffix: "+", label: "Contratos gerados" },
];

const PRINCIPLES = [
  {
    title: "Foco na entrega",
    body: "Cada projeto é conduzido com objetivos claros, escopo definido e atenção aos prazos. Meu compromisso é entregar soluções funcionais, bem construídas e prontas para uso real.",
  },
  {
    title: "Visão de produto e negócio",
    body: "Com experiência no desenvolvimento de soluções para clientes e na construção do meu próprio SaaS, considero não apenas os requisitos técnicos, mas também os objetivos comerciais e a experiência de quem utilizará o produto.",
  },
  {
    title: "Tecnologia preparada para crescer",
    body: "Desenvolvo com foco em organização, manutenção e escalabilidade. Cada decisão técnica considera as necessidades atuais do projeto e sua capacidade de evoluir no futuro.",
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
            Transformo ideias em produtos digitais
            <br />
            <span className="stroke-ink">que geram resultados.</span>
          </>
        }
        note={
          <>
            Sou Eliel Nicolas, desenvolvedor Full-Stack com mais de 5 anos de
            experiência no desenvolvimento de produtos digitais — desde landing
            pages de alta conversão até plataformas SaaS completas, sempre com
            foco em performance, escalabilidade e experiência do usuário.
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
                Ao longo da minha trajetória, já atendi{" "}
                <span className="text-ink">mais de 90 clientes</span>,
                desenvolvendo soluções digitais alinhadas às necessidades de
                diferentes negócios.
              </p>
              <p>
                Como fundador da{" "}
                <span className="font-medium text-accent">Fechô</span>,
                desenvolvi um SaaS de contratos do zero, que alcançou mais de{" "}
                <span className="text-ink">
                  60 usuários ativos e 100 contratos gerados
                </span>
                . Uma experiência que foi além do desenvolvimento: envolveu
                validação de produto, atendimento aos usuários, suporte e
                construção de um negócio real.
              </p>
              <p>
                Essa vivência moldou minha forma de trabalhar. Acredito que
                tecnologia de qualidade não se resume a escrever código, mas a{" "}
                <span className="text-ink">
                  resolver problemas, otimizar processos e criar soluções que
                  gerem valor de verdade
                </span>
                .
              </p>
              <p>
                Meu objetivo é transformar necessidades em produtos digitais
                funcionais, eficientes e preparados para evoluir junto com o
                negócio.
              </p>
            </div>
          </Reveal>

          {/* Principles as a numbered index list */}
          <Reveal delay={0.12}>
            <p className="eyebrow mt-12">Como trabalho</p>
          </Reveal>
          <div className="mt-4 border-t border-border">
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

          <Reveal delay={0.4}>
            <p className="mt-8 font-display text-lg font-bold leading-snug tracking-headline text-ink">
              Meu compromisso é transformar desafios em soluções digitais de
              qualidade, combinando experiência técnica, visão estratégica e{" "}
              <span className="text-primary">foco em resultados.</span>
            </p>
          </Reveal>
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
