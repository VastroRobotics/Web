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
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 p-6">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl bg-black shadow-[0_0_10px_2px_rgba(255,255,255,0.15)]">
          <TeamCarousel />
        </div>
      </div>
    </div>
  );
}
