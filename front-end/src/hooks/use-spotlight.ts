import { useCallback, useRef } from "react";

/**
 * Tracks the cursor inside an element and writes its position to the `--mx` /
 * `--my` custom properties. The `.spotlight` class reads them to draw a radial
 * highlight, so the effect costs no React re-renders on mousemove.
 */
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
