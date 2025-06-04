import { AnimatePresence, motion } from "framer-motion";

export default function SectionWrapper({ isActive, scrollDirection, children }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="section"
          initial={{
            opacity: 0,
            y: scrollDirection === "down" ? 100 : -100,
            scale: 0.96,
          }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{
            opacity: [1, 1, 0],
            y:
              scrollDirection === "down"
                ? [0, 30, -200, -600]
                : [0, -30, 200, 600],
            scale: [1, 0.98, 0.9, 0.8],
            rotateX:
              scrollDirection === "down" ? [0, -10, -20, -45] : [0, 10, 20, 45],
          }}
          transition={{ duration: 1.6, times: [0, 0.15, 0.5, 1], ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ perspective: 1200 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
