"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Chart({ 
  title = "Default", 
  targetAmount = 100, 
  targetPercent = 1000, 
  barColor = "#ffffff" 
}) {
  const [amount, setAmount] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const targetStrokeOffset = circumference * (1 - targetPercent / 100);

  useEffect(() => {
    if (!inView) return;

    controls.start({
      strokeDashoffset: targetStrokeOffset,
      transition: { duration: 2, ease: "easeInOut" },
    });

    const duration = 2000;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      setAmount(Math.floor(progress * targetAmount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, controls, targetStrokeOffset, targetAmount]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center space-y-3">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={barColor} floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#ffffff"
            strokeWidth="8"
            fill="none"
            opacity="0.1"
          />

          {/* Animated Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke={barColor}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={controls}
            style={{ filter: "url(#glow)" }}
          />
        </svg>

        {/* Title and Amount inside the circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm text-gray-400 font-semibold mb-0.25">{title}</span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl font-bold text-white"
          >
            {`$${amount.toLocaleString()}`}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
