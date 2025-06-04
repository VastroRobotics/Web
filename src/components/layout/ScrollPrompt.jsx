"use client";

import { motion } from "framer-motion";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const defaultSize =
  "absolute bottom-15 left-1/2 transform -translate-x-1/2 z-50 w-14 h-14 sm:w-15 sm:h-15 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20";

export default function ScrollPrompt({ onClick, direction = "down", className = "" }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 2 }} 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.05 }}
      className={`${className || defaultSize} relative`}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-[0_0_12px_5px_rgba(255,255,255,0.3)]"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: direction === "up" ? [0, 0, 0, -5, 0, -5, 0] : [0, 0, 0, 5, 0, 5, 0] }}
          transition={{
            delay: 4.5,
            duration: 1.5,
            times: [0, 0.2, 0.4, 0.6, 0.7, 0.9, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2.5,
          }}
          className="flex items-center justify-center w-2/5 h-2/5"
        >
          {direction === "up" ? (
            <FaArrowUp className="w-full h-full" style={{ color: "#141414" }} />
          ) : (
            <FaArrowDown className="w-full h-full" style={{ color: "#141414" }} />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
