"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamCarousel from "../ui/TeamCarousel";

export default function Team({ isActive, scrollDirection, onCanLeaveChange }) {
  useEffect(() => {
    if (isActive) {
      onCanLeaveChange(true); // Always allow leaving
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
          <main className="min-h-screen flex items-center justify-center">
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-16 w-full flex flex-col xl:flex-row items-center xl:justify-center gap-8">
              {/* Left side - Text content */}
              <div className="w-full xl:w-1/2 flex flex-col items-center xl:items-start text-center xl:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Team</h2>

                <div className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md mb-6" />

                <p className="text-lg text-gray-300 mb-4">
                  We are a small team of Brown University students passionate about creating innovative solutions.
                </p>
              </div>

              {/* Right side - Team carousel */}
              <div className="w-full xl:w-1/2 flex justify-center">
                <TeamCarousel />
              </div>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
