import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function SectionWrapper({ isActive, movementDirection, isFirst = false, children }) {
  const hasMounted = useRef(false);

  const initialVariant = isFirst && !hasMounted.current ? false : "initial";

  if (isActive && !hasMounted.current) {
    hasMounted.current = true;
  }

  return (
    <AnimatePresence mode="sync">
      {isActive && (
        <motion.div
          key="section"
          custom={movementDirection}
          variants={{
            initial: (dir) => ({
              opacity: 1,
              y: dir === "up" ? "100%" : "-100%",
              z: -150,
              scale: 0.9,
              rotateX: dir === "up" ? -15 : 15,
            }),
            animate: {
              opacity: 1,
              y: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              transition: {
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
            exit: (dir) => ({
              opacity: 1,
              y: dir === "up" ? "-100%" : "100%",
              z: -150,
              scale: 0.9,
              rotateX: dir === "up" ? 15 : -15,
              transition: {
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }),
          }}
          initial={initialVariant}
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
            transformOrigin: movementDirection === "up" ? "top center" : "bottom center",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
