"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function InfoPoint({
  id,
  node,
  text,
  title,
  description,
  direction,
  isActive,
  onHover,
  onLeave,
}) {
  const containerRef = useRef(null);
  const [line, setLine] = useState(null);
  const [pulsing, setPulsing] = useState(false);
  const [show, setShow] = useState(false);

  // 👉 No responsive scaling – all dimensions are now fixed
  const NODE_SIZE = 35;      // px
  const NODE_BORDER = 5;     // px
  const LINE_OFFSET = 7;     // px distance between node edge and start of the line
  const CARD_WIDTH = 250;    // px
  const TITLE_FONT = 18;     // px
  const DESC_FONT = 15;      // px

  useEffect(() => {
    const delay = 200 + Math.random() * 500;
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, []);

  // ⬇️ Line generation (runs once when "isActive" toggles)
  useEffect(() => {
    if (!isActive || !containerRef.current) return setLine(null);

    const rect = containerRef.current.getBoundingClientRect();
    const nodeX = (parseFloat(node.x) / 100) * rect.width;
    const nodeY = (parseFloat(node.y) / 100) * rect.height;
    const textX = (parseFloat(text.x) / 100) * rect.width;
    const textY = (parseFloat(text.y) / 100) * rect.height;
    const angle = Math.atan2(textY - nodeY, textX - nodeX);

    setLine(
      <motion.line
        x1={nodeX + Math.cos(angle) * LINE_OFFSET}
        y1={nodeY + Math.sin(angle) * LINE_OFFSET}
        x2={textX}
        y2={textY}
        stroke="white"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))" }}
      />
    );
  }, [isActive, node, text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1500);
    }, Math.random() * 6000 + 2000);
    return () => clearTimeout(timer);
  }, [pulsing]);

  const variants = {
    left: { hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    top: { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    bottom: { hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    "top-left": { hidden: { x: 15, y: 15, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } },
    "top-right": { hidden: { x: -15, y: 15, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } },
    "bottom-left": { hidden: { x: 15, y: -15, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } },
    "bottom-right": { hidden: { x: -15, y: -15, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } },
  }[direction] || { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  const borderStyles = {
    left: { borderRight: "2px solid rgba(255,255,255,0.7)" },
    right: { borderLeft: "2px solid rgba(255,255,255,0.7)" },
    top: { borderBottom: "2px solid rgba(255,255,255,0.7)" },
    bottom: { borderTop: "2px solid rgba(255,255,255,0.7)" },
    "top-left": { borderRight: "2px solid rgba(255,255,255,0.7)", borderBottom: "2px solid rgba(255,255,255,0.7)" },
    "top-right": { borderLeft: "2px solid rgba(255,255,255,0.7)", borderBottom: "2px solid rgba(255,255,255,0.7)" },
    "bottom-left": { borderRight: "2px solid rgba(255,255,255,0.7)", borderTop: "2px solid rgba(255,255,255,0.7)" },
    "bottom-right": { borderLeft: "2px solid rgba(255,255,255,0.7)", borderTop: "2px solid rgba(255,255,255,0.7)" },
  }[direction] || {};

  if (!show) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0, scale: 1.2, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Node */}
      <div
        className="absolute z-10 cursor-pointer pointer-events-auto"
        style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
        onMouseEnter={() => onHover(id)}
        onMouseLeave={onLeave}
      >
        <motion.div
          className="relative rounded-full border-4"
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: NODE_SIZE,
            height: NODE_SIZE,
            borderWidth: NODE_BORDER,
            backgroundColor: "transparent",
            boxShadow: isActive
              ? `0 0 15px 3px rgba(255,255,255,0.7)`
              : `0 0 8px 2px rgba(255,255,255,0.3)`,
          }}
        />
        {(pulsing || isActive) && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Line and TextBox */}
      <AnimatePresence>
        {isActive && (
          <>
            <svg className="absolute inset-0 z-0 w-full h-full pointer-events-none">{line}</svg>
            <motion.div
              className="absolute z-20 pointer-events-none"
              style={{
                left: text.x,
                top: text.y,
                transform: "translate(-50%, -50%)",
                width: CARD_WIDTH,
              }}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.25 }}
            >
              <div
                className="relative overflow-hidden backdrop-blur-md p-3"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  ...borderStyles,
                }}
              >
                <h3
                  className="font-mono text-[20px] font-bold uppercase tracking-wider text-white leading-none"
                  style={{ fontSize: `${TITLE_FONT}px` }}
                >
                  {title}
                </h3>
                <p
                  className="text-[16px] leading-tight text-gray-300 mt-0.5"
                  style={{ fontSize: `${DESC_FONT}px` }}
                >
                  {description}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
