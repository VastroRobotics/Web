"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StageBanner({
  direction = 0,
  text,
  start = 0,
  end = 100,
  show,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const lenKey = isMobile ? "height" : "width";
  const init = {
    x: direction === 0 ? -200 : 200,
    opacity: 0,
    [lenKey]: `${start}%`,
  };
  const anim = {
    x: 0,
    opacity: show ? 1 : 0,
    [lenKey]: `${end}%`,
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const style = isMobile
    ? { width: "100%", left: 0, top: 0 }
    : {
        height: "50vh",
        top: "50%",
        transform: "translateY(-50%)",
        left: direction === 0 ? 0 : "auto",
        right: direction === 1 ? 0 : "auto",
      };

  return (
    <motion.div
      className="absolute flex items-center justify-center bg-black text-white font-bold p-4 overflow-hidden"
      style={style}
      initial={init}
      animate={anim}
    >
      <span className="text-center text-3xl">{text}</span>
    </motion.div>
  );
}
