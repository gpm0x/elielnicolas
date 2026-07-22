import { useEffect, useRef } from "react";
import VanillaTilt, { type TiltOptions } from "vanilla-tilt";

/* ── useTilt ──────────────────────────────────────────────────────────────
   Parallax tilt on hover. Deliberately restrained: the page already carries
   a lot of motion, so the defaults here are a few degrees on a long ease —
   depth you feel before you notice it.

   Opted out entirely on coarse pointers (no hover to drive it, and the
   gyroscope reading would fight the scroll) and under reduced-motion.      */

type TiltElement = HTMLElement & { vanillaTilt?: { destroy: () => void } };

const DEFAULTS: TiltOptions = {
  max: 8,
  speed: 900,
  perspective: 1400,
  scale: 1,
  // Matches the page's editorial ease — see EASE in primitives.tsx
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  glare: false,
  gyroscope: false,
};

export const useTilt = <T extends HTMLElement>(options: TiltOptions = {}) => {
  const ref = useRef<T>(null);
  // Read once per init; the object identity of `options` isn't stable across
  // renders and re-initialising on every render would drop the listeners.
  const optionsRef = useRef(options);

  useEffect(() => {
    const el = ref.current as TiltElement | null;
    if (!el) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (still || coarse) return;

    VanillaTilt.init(el, { ...DEFAULTS, ...optionsRef.current });

    return () => el.vanillaTilt?.destroy();
  }, []);

  return ref;
};
