"use client";

import { motion } from "framer-motion";
import Glow from "../ui/Glow";
import useIsMobile from "../../hooks/useIsMobile.jsx";

export default function StageBanner({
  direction = 0,
  text,
  start = 0,
  end = 100,
  thickness = 50,
  show,
}) {
  const isMobile = useIsMobile(768);

  const isVertical = isMobile;
  const lenKey = isVertical ? "height" : "width";
  const crossKey = isVertical ? "width" : "height";
  const crossSize = thickness;
  const textSize = isVertical
    ? `${(crossSize * 0.16).toFixed(2)}vw`
    : `${(crossSize * 0.06).toFixed(2)}vh`;
  const glowSize = crossSize * 14;

  const transition = { duration: 0.8, ease: "easeOut" };

  const style = {
    [crossKey]: `${thickness}%`,
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
      className={`flex items-center justify-center bg-black text-white font-bold overflow-hidden flex-shrink-0 ${
        isVertical ? "mx-6 px-6" : "my-6 py-6"
      } ${radiusClass}`}
      initial={{ [lenKey]: `${start}%`, opacity: 1 }}
      animate={{ [lenKey]: show ? `${end}%` : `${start}%`, opacity: 1 }}
      transition={transition}
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
