import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeInUp({ children, distance = 20, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
