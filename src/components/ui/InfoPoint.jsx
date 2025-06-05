"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function InfoPoint({
  id,
  node,
  title,
  description,
  isActive,
  onHover,
  onLeave,
}) {
  const containerRef = useRef(null);
  const [pulsing, setPulsing] = useState(false);
  const [show, setShow] = useState(false);

  // 👉 No responsive scaling – all dimensions are now fixed
  const NODE_SIZE = 35;      // px
  const NODE_BORDER = 5;     // px
  const CARD_WIDTH = 250;    // px
  const TITLE_FONT = 18;     // px
  const DESC_FONT = 15;      // px
  const OFFSET = 12;         // px distance between node and box

  useEffect(() => {
    const delay = 200 + Math.random() * 500;
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1500);
    }, Math.random() * 6000 + 2000);
    return () => clearTimeout(timer);
  }, [pulsing]);

  const [boxStyle, setBoxStyle] = useState({});

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nodeX = (parseFloat(node.x) / 100) * rect.width;
    const nodeY = (parseFloat(node.y) / 100) * rect.height;
    const horizontal = nodeX < rect.width / 2 ? 'right' : 'left';
    const vertical = nodeY < rect.height / 2 ? 'bottom' : 'top';

    const percentX = horizontal === 'left' ? -100 : 0;
    const percentY = vertical === 'top' ? -100 : 0;
    const offsetX = horizontal === 'left' ? -OFFSET : OFFSET;
    const offsetY = vertical === 'top' ? -OFFSET : OFFSET;

    setBoxStyle({
      left: node.x,
      top: node.y,
      transform: `translate(${percentX}%, ${percentY}%) translate(${offsetX}px, ${offsetY}px)`,
      width: CARD_WIDTH,
    });
  }, [node, show]);


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

      {/* Info Box */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={boxStyle}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="relative overflow-hidden backdrop-blur-md p-3"
              style={{ background: "rgba(0,0,0,0.5)", border: "2px solid rgba(255,255,255,0.7)" }}
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
        )}
      </AnimatePresence>
    </motion.div>
  );
}