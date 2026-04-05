import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      {/* Global Visual Effects */}
      <div className="noise-overlay" />
      
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="blob w-[500px] h-[500px] bg-primary/10 -top-40 -right-40" />
        <div className="blob w-[400px] h-[400px] bg-accent/5 bottom-20 -left-20 animate-blob [animation-delay:2s]" />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
