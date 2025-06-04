"use client";
import { motion } from "framer-motion";

export default function StagePlaceholder({ number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black text-white text-5xl font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      Stage {number}
    </motion.div>
  );
}
