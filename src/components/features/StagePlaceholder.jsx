"use client";
import { motion } from "framer-motion";
export default function StagePlaceholder({ text, show }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black text-white text-5xl font-bold"
      animate={{ opacity: show ? 1 : 0 }}
      initial={false}
      transition={{ duration: 0.6 }}
    >
      {text}
    </motion.div>
  );
}
