import { AnimatePresence, motion } from "framer-motion";

export default function SectionWrapper({ isActive, scrollDirection, children }) {
  return (
    <AnimatePresence mode="sync">
      {isActive && (
        <motion.div
          key="section"
          custom={scrollDirection}
          variants={{
            initial: (dir) => ({
              opacity: 0,
              y: dir === "down" ? 250 : -250,
              scale: 0.85,
              rotateX: dir === "down" ? -25 : 25,
            }),
            animate: {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
              },
            },
            exit: (dir) => ({
              opacity: 0,
              y: dir === "down" ? -250 : 250,
              scale: 0.85,
              rotateX: dir === "down" ? 25 : -25,
              transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
              },
            }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          style={{
            perspective: 1000,
            transformOrigin: scrollDirection === "down" ? "top center" : "bottom center",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
