import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse follower with springs
  const sprintConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, sprintConfig);
  const cursorY = useSpring(mouseY, sprintConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest("[data-hover='true']") !== null
      );
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-primary mix-blend-difference pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 2.5 : 1,
        }}
      />
      {/* Outer subtle ring */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full border border-primary opacity-20 pointer-events-none z-[99998]"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 3.5 : 1.5,
        }}
      />
    </>
  );
};

export default CustomCursor;
