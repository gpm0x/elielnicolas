import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";
import type { TiltOptions } from "vanilla-tilt";
import { useTilt } from "@/hooks/use-tilt";

/* ═══════════════════════════════════════════════════════════════════════════
   Shared building blocks for the portfolio.
   Everything here is deliberately small — the page's character comes from
   composition and rhythm, not from heavyweight components.
   ═════════════════════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reveal ───────────────────────────────────────────────────────────────
   Scroll-triggered entrance. Text rises out of a clipped band, which reads
   as typesetting rather than as a generic fade-in.                        */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Clip children to their box so the rise reads as a mask reveal. */
  mask?: boolean;
};

export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className = "",
  mask = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const still = useReducedMotion();

  return (
    <div ref={ref} className={mask ? `overflow-hidden ${className}` : className}>
      <motion.div
        initial={still ? false : { y, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ── SectionHeading ───────────────────────────────────────────────────────
   The recurring masthead: index number, mono kicker, and a display title
   split across a hairline. Gives every section the same editorial anchor. */

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  note?: ReactNode;
};

export const SectionHeading = ({
  index,
  kicker,
  title,
  note,
}: SectionHeadingProps) => (
  <header className="mb-14 md:mb-20">
    <Reveal>
      <div className="flex items-baseline gap-4 pb-5 border-b border-border">
        <span className="font-mono text-[11px] text-primary tabular-nums">
          {index}
        </span>
        <span className="eyebrow">{kicker}</span>
        <span className="ml-auto hidden sm:block h-px flex-1 max-w-[40%] bg-border" />
      </div>
    </Reveal>

    <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:items-end">
      {/* pb clears descenders — .headline runs a 0.85 line-height that would
          otherwise be cropped by the reveal's overflow clip. */}
      <Reveal mask delay={0.08} className="pb-[0.14em]">
        <h2 className="headline text-[clamp(2.25rem,6.2vw,4.75rem)]">{title}</h2>
      </Reveal>
      {note && (
        <Reveal delay={0.18}>
          <p className="deck lg:pb-2">{note}</p>
        </Reveal>
      )}
    </div>
  </header>
);

/* ── useSpotlight ─────────────────────────────────────────────────────────
   Writes cursor position into CSS custom properties so `.spotlight` can
   render a radial highlight without re-rendering React on every mousemove. */

export const useSpotlight = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
};

/* ── SpotlightPanel ───────────────────────────────────────────────────────
   A flat panel that lights up under the cursor.                           */

type SpotlightPanelProps = HTMLMotionProps<"div"> & { className?: string };

export const SpotlightPanel = ({
  className = "",
  children,
  ...rest
}: SpotlightPanelProps) => {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`panel spotlight overflow-hidden ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/* ── Tilt ─────────────────────────────────────────────────────────────────
   Plain wrapper that owns the tilt transform. It stays a plain div on
   purpose: vanilla-tilt writes `transform` inline, so it must never share an
   element with a motion component that is animating one.                   */

export const Tilt = ({
  children,
  className = "",
  options,
}: {
  children: ReactNode;
  className?: string;
  options?: TiltOptions;
}) => {
  const ref = useTilt<HTMLDivElement>(options);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

/* ── Marquee ──────────────────────────────────────────────────────────────
   Duplicated track scrolling at a constant rate; pauses on hover.         */

export const Marquee = ({
  items,
  speed = "normal",
}: {
  items: string[];
  speed?: "normal" | "fast";
}) => {
  const track = (
    <div
      className={`marquee-track ${
        speed === "fast" ? "animate-marquee-fast" : "animate-marquee"
      }`}
      aria-hidden="true"
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-label text-ink-faint"
        >
          <span className="h-1 w-1 rounded-full bg-primary/60" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee py-5">
      {track}
      {track}
    </div>
  );
};

/* ── StatusDot ────────────────────────────────────────────────────────────
   Availability indicator with an expanding halo.                          */

export const StatusDot = ({ tone = "accent" }: { tone?: "accent" | "primary" }) => (
  <span className="relative flex h-1.5 w-1.5 shrink-0">
    <span
      className={`absolute inset-0 rounded-full animate-pulse-ring ${
        tone === "accent" ? "bg-accent" : "bg-primary"
      }`}
    />
    <span
      className={`relative h-1.5 w-1.5 rounded-full ${
        tone === "accent" ? "bg-accent" : "bg-primary"
      }`}
    />
  </span>
);
