import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const Index = () => (
  <div className="relative min-h-screen bg-background text-foreground">
    {/* ── Atmosphere ──────────────────────────────────────────────────
        Four fixed layers, back to front: a single light source, the
        engineering grid, the page rails, and film grain over everything. */}
    <div className="aurora" aria-hidden="true" />
    <div className="grid-field" aria-hidden="true" />
    <div className="rails" aria-hidden="true" />
    <div className="grain" aria-hidden="true" />

    <a
      href="#sobre"
      className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-label focus:text-background"
    >
      Pular para o conteúdo
    </a>

    <Navbar />

    <main className="relative z-10">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>

    <Footer />
  </div>
);

export default Index;
