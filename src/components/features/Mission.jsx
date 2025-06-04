"use client";

import { forwardRef, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Glow from "../ui/Glow";
import Chart from "../ui/Chart";
import ComparisonTable from "../ui/ComparisonTable";

const specs = [
  { label: "WEIGHT", left: "32 kg", right: "4 kg" },
  { label: "PAYLOAD", left: "14 kg", right: "1 kg" },
  { label: "CONTROL", left: "Tablet", right: "VR" },
  { label: "HAPTICS", left: "No", right: "Yes" },
  { label: "LIDAR", left: "Yes", right: "Yes" },
  { label: "CAMERA", left: "Standard", right: "360°" },
  { label: "CHASSIS", left: "Cast", right: "3-D Printed" },
];

const variants = {
  glow: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, delay: 1 } },
  },
  banner: {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  },
  chart: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  },
  bannerRight: {
    hidden: { x: 200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  },
};

const HeroScroll = forwardRef((_, ref) => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="py-6 space-y-10">
      {/* First Section: Left Banner + Charts */}
      <div ref={ref} className="w-full flex flex-col lg:flex-row items-center px-0">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants.banner}
          className="bg-black w-full lg:w-[70%] flex flex-col items-center justify-center relative rounded-r-3xl px-20 py-24 my-6"
          style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
        >
          <motion.div
            variants={variants.glow}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Glow
              color="rgba(255,255,255,0.4)"
              width={600}
              height={400}
              shape="rect"
              radius={120}
              blur={40}
              stop="45%"
            />
          </motion.div>

          <motion.div
            className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]"
            initial="hidden"
            animate={inView ? "visible" : "hidden"} 
          >   
            VR‑controlled quadruped robots<br />
            $75k capability for $2.5k
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full lg:w-[30%] flex flex-col justify-center items-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants.chart}
        >
          <div className="flex flex-col lg:flex-col md:flex-row gap-10 justify-center items-center w-full">
            <Chart title="VASTRO" targetAmount={2500} targetPercent={2.5} barColor="#ffffff" />
            <Chart title="Competitors" targetAmount={75000} targetPercent={70} barColor="#ffffff" />
          </div>
        </motion.div> 
      </div>

      {/* Second Section: Table Left + Right Banner */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center px-0">
      <motion.div 
        className="w-full lg:w-[40%] flex justify-center items-center px-6 py-0"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants.chart}
      >
        <div className="w-full mx-15">
          <ComparisonTable
            data={specs}
            labelLeft="SpotMini"
            labelRight="VASTRO"
          />
        </div>
      </motion.div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants.bannerRight}
          className="bg-black w-full lg:w-[60%] flex flex-col items-center justify-center relative rounded-l-3xl px-20 py-32"
          style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
        >
          <motion.div
            variants={variants.glow}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Glow
              color="rgba(255,255,255,0.4)"
              width={600}
              height={400}
              shape="rect"
              radius={120}
              blur={40}
              stop="45%"
            />
          </motion.div>

          <motion.div
            className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            Making remote access<br />
            more accessible
          </motion.div>
        </motion.div>
      </div>
    </div   >
  );
});

export default HeroScroll;
