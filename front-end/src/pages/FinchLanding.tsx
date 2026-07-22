import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const FinchLanding: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Isolar o escopo do GSAP para o Next.js / React lifecycle
    const ctx = gsap.context(() => {
      
      // Animação de Fundo com Parallax e Scrub
      gsap.to(".bg-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Elementos que aparecem gradualmente (Fade & Scale Up)
      const sections = gsap.utils.toArray<HTMLElement>('.gsap-reveal');
      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Animação Sequencial para a Engine (Passo a Passo)
      const engineSteps = gsap.utils.toArray<HTMLElement>('.engine-step');
      gsap.fromTo(engineSteps, 
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".engine-container",
            start: "top 75%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert(); // Cleanup Perfeito
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen bg-[#05060A] text-white overflow-hidden font-sans selection:bg-blue-600/30 selection:text-white"
    >
      {/* Background Cinematográfico */}
      <div className="absolute inset-0 z-0 bg-parallax opacity-60">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        
        {/* 1. HERO (A Promessa Outlier) */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center gsap-reveal">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto flex flex-col items-center"
          >
            <div className="inline-block px-4 py-1 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs uppercase tracking-[0.2em] text-blue-400 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              A Elite da Arquitetura SaaS
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Transforme Código em <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Equity Implacável.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
              Você não precisa de mais tutoriais amadores. Precisa de uma infraestrutura de vendas e arquitetura projetada para faturar múltiplos 7 dígitos sem quebrar.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-10 py-5 rounded-full bg-white text-black font-bold text-lg tracking-wide overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              APLICAR PARA A CONSULTORIA
            </motion.button>
          </motion.div>
        </section>

        {/* 2. O ANTÍDOTO / O PROBLEMA (A Grande Mentira) */}
        <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-black/50 gsap-reveal">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-semibold mb-10 text-white/90">
              A grande mentira que o mercado te vendeu.
            </h2>
            <div className="space-y-6 text-xl text-gray-400 font-light">
              <p>
                A maioria dos fundadores SaaS constrói produtos brilhantes, mas com uma arquitetura de crescimento amadora. O resultado? <strong className="text-white">O churn devora o lucro</strong> e a escala quebra os servidores.
              </p>
              <p>
                Não é sobre ter a melhor ideia. É sobre ter a <strong className="text-white">engenharia de aquisição e retenção</strong> mais hostil e impenetrável do seu nicho.
              </p>
            </div>
          </div>
        </section>

        {/* 3. VISUAL BREAKPOINT (Mindshift Interativo) */}
        <section className="min-h-screen flex items-center justify-center px-6 relative gsap-reveal">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-center tracking-tighter mix-blend-difference z-10 uppercase text-white/90">
            Escalar não é sorte. <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-200">É precisão.</span>
          </h2>
        </section>

        {/* 4. A VIRADA DE CHAVE (Pilares da Entrega) */}
        <section className="py-32 px-6 border-t border-white/5 gsap-reveal">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 text-center">
              <h3 className="text-3xl md:text-5xl font-bold mb-6">A Trindade da Alta Performance</h3>
              <p className="text-gray-400 text-lg">Os pilares exatos que separam negócios SaaS de elite dos medianos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pilar 1 */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-[#0A0D14] p-8 rounded-xl border border-white/5 flex flex-col backdrop-blur-sm">
                  <div className="w-12 h-12 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">01</div>
                  <h4 className="text-2xl font-semibold mb-4 text-white">Estratégia de Monetização</h4>
                  <p className="text-gray-400 leading-relaxed">Modelos de precificação predatórios e esteira de produtos desenhada para extrair o máximo de LTV do seu usuário.</p>
                </div>
              </motion.div>

              {/* Pilar 2 */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-[#0A0D14] p-8 rounded-xl border border-white/5 flex flex-col backdrop-blur-sm">
                  <div className="w-12 h-12 mb-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">02</div>
                  <h4 className="text-2xl font-semibold mb-4 text-white">Arquitetura Inquebrável</h4>
                  <p className="text-gray-400 leading-relaxed">Código limpo, escalável e otimizado. Refatoração profunda para aguentar picos de tráfego sem derrubar o banco de dados.</p>
                </div>
              </motion.div>

              {/* Pilar 3 */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-[#0A0D14] p-8 rounded-xl border border-white/5 flex flex-col backdrop-blur-sm">
                  <div className="w-12 h-12 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold">03</div>
                  <h4 className="text-2xl font-semibold mb-4 text-white">Growth & Escala</h4>
                  <p className="text-gray-400 leading-relaxed">Funis de aquisição injetados diretamente no seu software (PLG) e engenharia de marketing focada em CAC mínimo.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. FRAMEWORK ENGINE (A Engenharia por Trás do Lucro) */}
        <section className="py-32 px-6 bg-black/40 border-t border-white/5 engine-container">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold mb-16 text-center">O Método Outlier</h3>
            <div className="space-y-12">
              {[
                { title: "Auditoria de Sangramento", desc: "Mapeamos exatamente por onde seu SaaS está perdendo dinheiro e velocidade no código e na oferta." },
                { title: "Refatoração Tática", desc: "Reestruturação do backend e frontend para suportar escala massiva com design pattern de elite." },
                { title: "Injeção de Conversão", desc: "Aplicação de gatilhos psicológicos e UX/UI cinematográfica dentro da jornada do usuário logado." },
                { title: "Scale Up Implacável", desc: "Liberação de campanhas e estratégias de growth hacking com o produto pronto para o impacto." }
              ].map((step, idx) => (
                <div key={idx} className="engine-step flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 text-blue-500 font-mono text-xl pt-1 border-b border-blue-500/30 pb-2">STEP 0{idx + 1}</div>
                  <div>
                    <h4 className="text-2xl font-semibold mb-2 text-white/90">{step.title}</h4>
                    <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FECHAMENTO HIGH-TICKET (A Proposta Inevitável) */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32 border-t border-white/5 gsap-reveal relative overflow-hidden">
          {/* Luz de fundo do botão */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">O seu próximo nível não aceita amadores.</h2>
            <p className="text-xl text-gray-400 mb-12">
              Esta consultoria atende apenas <strong className="text-white">projetos selecionados</strong>. O dinheiro não é o único critério. Se o seu SaaS tem potencial para dominar o mercado, aplique agora.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.2)] border border-white/10 hover:border-white/30 transition-all"
            >
              CANDIDATAR-SE À VAGA
            </motion.button>
            <p className="mt-6 text-sm text-gray-500 uppercase tracking-widest">Apenas 3 vagas abertas para este trimestre.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default FinchLanding;
