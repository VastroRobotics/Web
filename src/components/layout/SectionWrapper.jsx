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
              opacity: 0.95,
              y: dir === "down" ? "100%" : "-100%",
              z: -100,
              scale: 0.9,
              rotateX: dir === "down" ? -20 : 20,
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
              opacity: 0.95,
              y: dir === "down" ? "-100%" : "100%",
              z: -100,
              scale: 0.9,
              rotateX: dir === "down" ? 20 : -20,
              transition: {
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
            transformOrigin: scrollDirection === "down" ? "top center" : "bottom center",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
