import { AnimatePresence, motion } from "framer-motion";

export default function SectionWrapper({ isActive, scrollDirection, children }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="section"
          custom={scrollDirection}
          variants={{
            initial: (dir) => ({
              opacity: 0,
              y: dir === "down" ? 150 : -150,
              scale: 0.9,
              rotateX: dir === "down" ? -15 : 15,
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
              y: dir === "down" ? -150 : 150,
              scale: 0.9,
              rotateX: dir === "down" ? 15 : -15,
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
          style={{ perspective: 1000 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
