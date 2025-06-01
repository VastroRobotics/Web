"use client";

import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

export default function ScrollPrompt({ onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 2 }} 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.05 }}
      className="absolute bottom-15 left-1/2 transform -translate-x-1/2 z-50"
      onClick={onClick}
    >
      <motion.div
        className="w-18 h-18 rounded-full bg-white flex items-center justify-center shadow-[0_0_12px_5px_rgba(255,255,255,0.3)]"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 0, 0, 5, 0, 5, 0] }}
          transition={{
            delay: 4.5, 
            duration: 1.5,  
            times: [0, 0.2, 0.4, 0.6, 0.7, 0.9, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2.5,
          }}
          className="flex items-center justify-center"
        >
          <FaArrowDown
            className="w-7 h-7"  
            style={{ color: "#141414" }}
          />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
