"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import AnimatedBanner from "../ui/AnimatedBanner";
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

const Mission = forwardRef(({ isActive, onCanLeaveChange }, ref) => {
  const { isDesktop } = useBreakpoint();
  const [stage, setStage] = useState(0);
  const isThrottled = useRef(false);
  const bannerControlsTop = useAnimation();
  const bannerControlsBottom = useAnimation();
  const [showCharts, setShowCharts] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const maxStage = 2;
  const throttleDelay = 1500;

  useEffect(() => {
    if (!isDesktop) return;

    if (stage >= 1) {
      if (stage === 1) {
        setShowCharts(false);
        bannerControlsTop.set({ x: "-100%", width: "100%" });
        bannerControlsTop
          .start({ x: 0, width: "100%", transition: { duration: 1.2, ease: "easeOut" } })
          .then(() => {
            setTimeout(() => {
              bannerControlsTop.start({ width: "70%", transition: { duration: 1.0, ease: "easeOut" } });
              setShowCharts(true);
            }, 300);
          });
      }
    } else {
      bannerControlsTop.set({ x: "-100%", width: "100%" });
      setShowCharts(false);
    }

    if (stage >= 2) {
      if (stage === 2) {
        setShowTable(false);
        bannerControlsBottom.set({ x: "100%", width: "100%" });
        bannerControlsBottom
          .start({ x: 0, width: "100%", transition: { duration: 1.2, ease: "easeOut" } })
          .then(() => {
            setTimeout(() => {
              bannerControlsBottom.start({ width: "60%", transition: { duration: 1.0, ease: "easeOut" } });
              setShowTable(true);
            }, 300);
          });
      }
    } else {
      bannerControlsBottom.set({ x: "100%", width: "100%" });
      setShowTable(false);
    }
  }, [stage, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    if (isActive) {
      setStage(0);
      onCanLeaveChange(true);
      isThrottled.current = false;
    } else {
      isThrottled.current = false;
    }
  }, [isActive, isDesktop]);

  useEffect(() => {
    if (!isActive || !isDesktop) return;

    const handleWheel = (e) => {
      const dir = e.deltaY > 0 ? 1 : -1;

      if (dir < 0 && stage === 0) {
        onCanLeaveChange(true);
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (isThrottled.current) return;

      const next = Math.max(0, Math.min(stage + dir, maxStage));
      if (next === stage) return;

      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
        if (next === maxStage) onCanLeaveChange(true);
      }, throttleDelay);

      onCanLeaveChange(false);
      setStage(next);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isActive, stage, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    if (stage === 0 || stage === maxStage) {
      onCanLeaveChange(true);
    } else {
      onCanLeaveChange(false);
    }
  }, [stage, isDesktop]);

  // Fallback layout on mobile/tablet
  if (!isDesktop) {
    return (
      <div className="py-6 space-y-10" ref={ref}>
        <div className="w-full flex flex-col lg:flex-row items-center px-0">
          <AnimatedBanner
            text={"VR‑controlled quadruped robots\n$75k capability for $2.5k"}
            direction="left"
          />
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
          <AnimatedBanner
            text={"Making remote access\nmore accessible"}
            direction="right"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden" ref={ref}>
      {/* Top Row */}
      <motion.div
        className="absolute left-0 right-0 flex items-center justify-center px-6"
        animate={{ height: stage >= 2 ? "50%" : "100%", top: 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <AnimatePresence>
            {stage >= 1 && (
              <motion.div
                key="top-banner-wrapper"
                className="flex justify-start"
                style={{ width: "100%" }}
                initial={false}
                animate={bannerControlsTop}
              >
                <AnimatedBanner
                  text={"VR‑controlled quadruped robots\n$75k capability for $2.5k"}
                  direction="left"
                  className="w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showCharts && (
              <motion.div
                key="charts"
                className="w-[30%] flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex flex-col lg:flex-col md:flex-row gap-10 justify-center items-center w-full">
                  <Chart title="VASTRO" targetAmount={2500} targetPercent={2.5} barColor="#ffffff" />
                  <Chart title="Competitors" targetAmount={75000} targetPercent={70} barColor="#ffffff" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom Row */}
      <motion.div
        className="absolute left-0 right-0 flex flex-col-reverse lg:flex-row items-center px-6"
        animate={{ height: stage >= 2 ? "50%" : "0%", bottom: 0, opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {showTable && (
            <motion.div
              key="table"
              className="w-full lg:w-[40%] flex justify-center items-center px-6 py-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-full mx-15">
                <ComparisonTable data={specs} labelLeft="SpotMini" labelRight="VASTRO" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              key="bottom-banner-wrapper"
              className="flex justify-end"
              style={{ width: "100%" }}
              initial={false}
              animate={bannerControlsBottom}
            >
              <AnimatedBanner
                text={"Making remote access\nmore accessible"}
                direction="right"
                className="w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});

export default Mission;
