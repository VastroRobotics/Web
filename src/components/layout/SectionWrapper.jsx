import { AnimatePresence, motion } from "framer-motion";

export default function SectionWrapper({ isActive, scrollDirection, children }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="section"
          initial={{ opacity: 0, y: 60 }}
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
