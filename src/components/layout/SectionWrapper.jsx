import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function SectionWrapper({
  isActive,
  scrollDirection,
  skipInitialAnimation = false,
  children,
}) {
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    if (isActive && !hasEnteredRef.current) {
      hasEnteredRef.current = true;
    }
  }, [isActive]);

  const initialProps =
    skipInitialAnimation && !hasEnteredRef.current
      ? false
      : { opacity: 0, y: scrollDirection === "down" ? 60 : -60 };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="section"
          initial={initialProps}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: scrollDirection === "down" ? -60 : 60 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1], // slow ease out
          }}
          className="absolute inset-0"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
