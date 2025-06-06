"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Glow from "../ui/Glow";

export default function StageBanner({
  direction = 0,
  text,
  start = 0,
  end = 100,
  thickness = 50,
  show,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isVertical = isMobile;
  const lenKey = isVertical ? "height" : "width";
  const crossKey = isVertical ? "width" : "height";
  const crossSize = thickness;
  const textSize = isVertical
    ? `${(crossSize * 0.16).toFixed(2)}vw`
    : `${(crossSize * 0.06).toFixed(2)}vh`;
  const glowSize = crossSize * 14;

  const variants = {
    hidden: {
      x: isVertical ? 0 : direction === 0 ? -200 : 200,
      y: isVertical ? (direction === 0 ? -200 : 200) : 0,
      opacity: 0,
      [lenKey]: `${start}%`,
      [crossKey]: `${thickness}%`,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      [lenKey]: `${end}%`,
      [crossKey]: `${thickness}%`,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const style = isVertical
    ? {
        [crossKey]: `${thickness}%`,
        top: direction === 0 ? 0 : "auto",
        bottom: direction === 1 ? 0 : "auto",
        left: "25%",
        transform: "translateX(-50%)",
      }
    : {
        [crossKey]: `${thickness}%`,
        left: direction === 0 ? 0 : "auto",
        right: direction === 1 ? 0 : "auto",
        top: "25%",
        transform: "translateY(-50%)",
      };

  const radiusClass = isVertical
    ? direction === 0
      ? "rounded-b-3xl"
      : "rounded-t-3xl"
    : direction === 0
    ? "rounded-r-3xl"
    : "rounded-l-3xl";

  return (
    <motion.div
      className={`absolute flex items-center w-full h-full justify-center bg-black text-white font-bold overflow-hidden ${
        isVertical ? "mx-6 px-6" : "my-6 py-6"
      } ${radiusClass}`}
      style={{ ...style, 
        boxShadow: "0 0 20px rgba(255,255,255,0.15)",
        paddingTop: isVertical ? "10px" : "0px",
        paddingBottom: isVertical ? "10px" : "0px",
        paddingLeft: isVertical ? "0px" : "10px",
        paddingRight: isVertical ? "0px" : "10px",}}
      variants={variants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Glow color="white" width={glowSize} height={glowSize} />
      </div>
      <span
        className="relative z-10 text-center whitespace-nowrap leading-tight"
        style={{ fontSize: textSize }}
      >
        {text}
      </span>
    </motion.div>
  );
}
