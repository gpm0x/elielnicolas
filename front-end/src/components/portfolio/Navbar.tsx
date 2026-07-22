import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home", index: "01" },
  { label: "Sobre", href: "#sobre", index: "02" },
  { label: "Serviços", href: "#servicos", index: "03" },
  { label: "Trajetória", href: "#experiencia", index: "04" },
  { label: "Projetos", href: "#projetos", index: "05" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track the section currently occupying the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Reading progress — a single hairline across the top of the page */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-primary via-accent to-primary"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[65] transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-editorial ${scrolled
            ? "border-b border-border bg-background/72 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6"
          }`}
      >
        <div className="frame flex items-center justify-between gap-6">
          {/* Wordmark */}
          <a
            href="#hero"
            className="group flex items-baseline gap-2"
            aria-label="Início"
          >
            <span className="font-display text-base font-extrabold uppercase tracking-headline text-ink">
              Eliel
            </span>
            <span className="font-display text-base font-extrabold uppercase tracking-headline text-ink-faint transition-colors duration-500 group-hover:text-primary">
              Nicolas
            </span>
          </a>

          {/* Desktop nav — active item gets a shared-layout pill */}
          <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface-raised/60 p-1 backdrop-blur-md md:flex">
            {LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-primary/25 bg-primary/[0.09]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="group hidden items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-label text-ink transition-colors duration-400 hover:border-primary/50 hover:text-primary sm:inline-flex"
            >
              Orçamento
              <ArrowUpRight
                size={12}
                className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* Mobile toggle — two rules that fold into an X */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-border md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="block h-px w-4 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="block h-px w-4 bg-ink"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[64] bg-background/97 backdrop-blur-2xl md:hidden"
          >
            <nav className="frame flex h-full flex-col justify-center gap-1 pb-20">
              {LINKS.concat({
                label: "Contato",
                href: "#contato",
                index: "05",
              }).map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.7, ease: EASE }}
                  className="group flex items-center gap-5 border-b border-border py-5"
                >
                  <span className="font-mono text-[10px] tabular-nums text-primary">
                    {link.index}
                  </span>
                  <span className="headline text-4xl text-ink transition-colors duration-300 group-hover:text-primary">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="ml-auto text-ink-ghost transition-colors group-hover:text-primary"
                  />
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
