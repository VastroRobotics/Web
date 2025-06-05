"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamCarousel from "../ui/TeamCarousel";

export default function Team({ isActive, scrollDirection, onCanLeaveChange }) {

  useEffect(() => {
    if (isActive) {
      onCanLeaveChange(true);
    }
  }, [isActive]);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="team"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: scrollDirection === "down" ? -40 : 40 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full bg-black text-white overflow-hidden flex items-center justify-center"
        >
          <TeamCarousel />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
