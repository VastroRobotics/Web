import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SectionWrapper({
  isActive,
  scrollDirection,
  isFirst = false,
  children,
}) {
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
          custom={scrollDirection}
          variants={{
            initial: (dir) => ({
              y: dir === "down" ? "100%" : "-100%",
            }),
            animate: {
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
            exit: (dir) => ({
              y: dir === "down" ? "-100%" : "100%",
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }),
          }}
          initial={initialVariant}
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          style={{
            overflow: "hidden",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
