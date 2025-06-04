"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Glow from "../ui/Glow";
import Chart from "../ui/Chart";
import ComparisonTable from "../ui/ComparisonTable";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const specs = [
  { label: "WEIGHT", left: "32 kg", right: "4 kg" },
  { label: "PAYLOAD", left: "14 kg", right: "1 kg" },
  { label: "CONTROL", left: "Tablet", right: "VR" },
  { label: "HAPTICS", left: "No", right: "Yes" },
  { label: "LIDAR", left: "Yes", right: "Yes" },
  { label: "CAMERA", left: "Standard", right: "360°" },
  { label: "CHASSIS", left: "Cast", right: "3-D Printed" },
];

const HeroScroll = forwardRef(({ isActive, onCanLeaveChange }, ref) => {
  const { isDesktop } = useBreakpoint();
  const [stage, setStage] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const isThrottled = useRef(false);

  const maxStage = 5;
  const forwardDelay = 700;
  const backwardDelay = 500;

  useEffect(() => {
    if (!isDesktop) return;
    if (isActive) {
      setStage(0);
      onCanLeaveChange(false);
      setCanScroll(false);
      isThrottled.current = true;
      const t = setTimeout(() => {
        setCanScroll(true);
        isThrottled.current = false;
      }, forwardDelay);
      return () => clearTimeout(t);
    } else {
      setCanScroll(false);
      isThrottled.current = false;
    }
  }, [isActive, isDesktop]);

  useEffect(() => {
    if (!isActive || !canScroll || !isDesktop) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isThrottled.current) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(stage + dir, maxStage));
      if (next === stage) return;

      isThrottled.current = true;
      const delay = dir > 0 ? forwardDelay : backwardDelay;

      setTimeout(() => {
        isThrottled.current = false;
        if (next === maxStage) onCanLeaveChange(true);
      }, delay);

      if (dir < 0) onCanLeaveChange(false);
      setStage(next);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isActive, canScroll, stage, isDesktop]);

  // Fallback simple layout on mobile or tablet
  if (!isDesktop) {
    return (
      <div className="py-6 space-y-10" ref={ref}>
        <div className="w-full flex flex-col lg:flex-row items-center px-0">
          <div className="bg-black w-full lg:w-[70%] flex flex-col items-center justify-center relative rounded-r-3xl px-20 py-24 my-6" style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Glow color="white" />
            </div>
            <div className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]">
              VR‑controlled quadruped robots<br />
              $75k capability for $2.5k
            </div>
          </div>
          <div className="w-full lg:w-[30%] flex flex-col justify-center items-center">
            <div className="flex flex-col lg:flex-col md:flex-row gap-10 justify-center items-center w-full">
              <Chart title="VASTRO" targetAmount={2500} targetPercent={2.5} barColor="#ffffff" />
              <Chart title="Competitors" targetAmount={75000} targetPercent={70} barColor="#ffffff" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row items-center px-0">
          <div className="w-full lg:w-[40%] flex justify-center items-center px-6 py-0">
            <div className="w-full mx-15">
              <ComparisonTable data={specs} labelLeft="SpotMini" labelRight="VASTRO" />
            </div>
          </div>
          <div className="bg-black w-full lg:w-[60%] flex flex-col items-center justify-center relative rounded-l-3xl px-20 py-32" style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Glow color="white" />
            </div>
            <div className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]">
              Making remote access<br />
              more accessible
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop animated version
  const topBannerWidth = stage === 1 ? "90%" : "70%";
  const topChartsVisible = stage >= 2;
  const topOffset = stage >= 3 ? "10%" : "50%";
  const topTranslate = stage >= 3 ? "0%" : "-50%";

  const bottomBannerWidth = stage < 5 ? "100%" : "60%";
  const bottomChartsVisible = stage >= 5;

  return (
    <div className="w-full h-full relative" ref={ref}>
      <motion.div
        className="absolute left-0 right-0 flex items-center justify-start space-x-8"
        style={{ top: topOffset, transform: `translateY(${topTranslate})` }}
        animate={{ opacity: stage >= 1 ? 1 : 0, x: stage >= 1 ? 0 : "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="bg-black flex flex-col items-center justify-center relative rounded-r-3xl px-20 py-24"
          style={{ width: topBannerWidth, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Glow color="white" />
          </div>
          <div className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]">
            VR‑controlled quadruped robots<br />
            $75k capability for $2.5k
          </div>
        </motion.div>
        <AnimatePresence>
          {topChartsVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-[30%] flex flex-col justify-center items-center"
            >
              <div className="flex flex-col lg:flex-col md:flex-row gap-10 justify-center items-center w-full">
                <Chart title="VASTRO" targetAmount={2500} targetPercent={2.5} barColor="#ffffff" />
                <Chart title="Competitors" targetAmount={75000} targetPercent={70} barColor="#ffffff" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 flex flex-col-reverse lg:flex-row items-center px-0"
        animate={{ opacity: stage >= 4 ? 1 : 0, x: stage >= 4 ? 0 : "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ top: "55%" }}
      >
        <AnimatePresence>
          {bottomChartsVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full lg:w-[40%] flex justify-center items-center px-6 py-0"
            >
              <div className="w-full mx-15">
                <ComparisonTable data={specs} labelLeft="SpotMini" labelRight="VASTRO" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="bg-black flex flex-col items-center justify-center relative rounded-l-3xl px-20 py-32"
          style={{ width: bottomBannerWidth, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Glow color="white" />
          </div>
          <div className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]">
            Making remote access<br />
            more accessible
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default HeroScroll;
