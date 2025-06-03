"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
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

const finalStage = 5;
const forwardThrottle = 700;
const backwardThrottle = 400;

const HeroScroll = forwardRef(({ isActive, onCanLeaveChange }, ref) => {
  const { isDesktop } = useBreakpoint();

  const [stage, setStage] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const isThrottled = useRef(false);
  const unlockTimeout = useRef(null);

  const leftControls = useAnimation();
  const chartControls = useAnimation();
  const rightControls = useAnimation();
  const tableControls = useAnimation();

  useEffect(() => {
    if (!isDesktop) {
      if (isActive) onCanLeaveChange(true);
      return;
    }

    if (isActive) {
      setStage(0);
      setCanScroll(false);
      onCanLeaveChange(false);
      isThrottled.current = true;
      clearTimeout(unlockTimeout.current);
      unlockTimeout.current = setTimeout(() => {
        setCanScroll(true);
        isThrottled.current = false;
      }, forwardThrottle);
    } else {
      setCanScroll(false);
      isThrottled.current = false;
      clearTimeout(unlockTimeout.current);
    }
  }, [isActive, isDesktop]);

  useEffect(() => {
    if (!isDesktop || !isActive || !canScroll) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isThrottled.current) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(stage + dir, finalStage));
      if (next === stage) return;

      isThrottled.current = true;
      const delay = dir > 0 ? forwardThrottle : backwardThrottle;

      setTimeout(() => {
        isThrottled.current = false;
        if (next === finalStage) onCanLeaveChange(true);
      }, delay);

      if (dir < 0) onCanLeaveChange(false);
      setStage(next);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isActive, canScroll, stage, isDesktop]);

  useEffect(() => {
    const leftStates = [
      { x: "100%", opacity: 0, scale: 1 },
      { x: "15%", opacity: 1, scale: 1.2 },
      { x: "0%", opacity: 1, scale: 1.2 },
      { x: "0%", opacity: 1, scale: 1 },
      { x: "0%", opacity: 1, scale: 1 },
      { x: "0%", opacity: 1, scale: 1 },
    ];

    const chartStates = [
      { opacity: 0, scale: 1.3 },
      { opacity: 0, scale: 1.3 },
      { opacity: 1, scale: 1.3 },
      { opacity: 1, scale: 1 },
      { opacity: 1, scale: 1 },
      { opacity: 1, scale: 1 },
    ];

    const rightStates = [
      { x: "100%", opacity: 0, width: isDesktop ? "60%" : "100%" },
      { x: "100%", opacity: 0, width: isDesktop ? "60%" : "100%" },
      { x: "100%", opacity: 0, width: isDesktop ? "60%" : "100%" },
      { x: "100%", opacity: 0, width: isDesktop ? "60%" : "100%" },
      { x: 0, opacity: 1, width: isDesktop ? "100%" : "100%" },
      { x: 0, opacity: 1, width: isDesktop ? "60%" : "100%" },
    ];

    const tableStates = [
      { opacity: 0, x: -20 },
      { opacity: 0, x: -20 },
      { opacity: 0, x: -20 },
      { opacity: 0, x: -20 },
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0 },
    ];

    leftControls.start({ ...leftStates[stage], transition: { duration: 0.6, ease: "easeOut" } });
    chartControls.start({ ...chartStates[stage], transition: { duration: 0.6, ease: "easeOut" } });
    rightControls.start({ ...rightStates[stage], transition: { duration: 0.6, ease: "easeOut" } });
    tableControls.start({ ...tableStates[stage], transition: { duration: 0.6, ease: "easeOut" } });
  }, [stage, isDesktop, leftControls, chartControls, rightControls, tableControls]);

  return (
    <div className="w-full h-screen flex flex-col justify-center space-y-10 overflow-hidden py-6">
      <div ref={ref} className="w-full flex flex-col lg:flex-row items-center px-0 relative">
        <motion.div
          className="bg-black flex flex-col items-center justify-center relative rounded-r-3xl px-20 py-24 my-6"
          style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)", width: isDesktop ? "70%" : "100%" }}
          animate={leftControls}
          initial={false}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Glow color="white" />
          </div>
          <div className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]">
            VR‑controlled quadruped robots<br />$75k capability for $2.5k
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center items-center"
          style={{ width: isDesktop ? "30%" : "100%" }}
          animate={chartControls}
          initial={false}
        >
          <div className="flex flex-col lg:flex-col md:flex-row gap-10 justify-center items-center w-full">
            <Chart title="VASTRO" targetAmount={2500} targetPercent={2.5} barColor="#ffffff" />
            <Chart title="Competitors" targetAmount={75000} targetPercent={70} barColor="#ffffff" />
          </div>
        </motion.div>
      </div>

      <div className="w-full flex flex-col-reverse lg:flex-row items-center px-0 relative">
        <motion.div
          className="flex justify-center items-center px-6 py-0"
          style={{ width: isDesktop ? "40%" : "100%" }}
          animate={tableControls}
          initial={false}
        >
          <div className="w-full mx-15">
            <ComparisonTable data={specs} labelLeft="SpotMini" labelRight="VASTRO" />
          </div>
        </motion.div>

        <motion.div
          className="bg-black flex flex-col items-center justify-center relative rounded-l-3xl px-20 py-32"
          style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
          animate={rightControls}
          initial={false}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Glow color="white" />
          </div>

          <div className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]">
            Making remote access<br />more accessible
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default HeroScroll;
