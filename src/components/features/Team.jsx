"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamCarousel from "../ui/TeamCarousel";
import useIsMobile from "../../hooks/useIsMobile";

export default function Team({ isActive, scrollDirection, onCanLeaveChange }) {
  const isMobile = useIsMobile();

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
          className="w-full h-full bg-black text-white overflow-hidden"
        >
          <main className="min-h-screen flex items-center justify-center py-5">
            {/* Unified container */}

                <div className="flex flex-col-reverse items-center sm:max-w-[80%]">
                  <div className="w-full flex flex-col text-left ml-10">
                    <h2 className="text-2xl font-bold mb-2">Team</h2>
                    <p className="text-lg text-gray-300">
                      We are a small team of Brown University students passionate about 
                      creating innovative solutions.
                    </p>
                  </div>
                  <div className="flex justify-center w-full">
                    <TeamCarousel />
                  </div>
                </div>

          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
