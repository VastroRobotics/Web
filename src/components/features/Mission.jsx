"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import StagePlaceholder from "./StagePlaceholder";

const stages = [
  (props) => <StagePlaceholder {...props} number={1} />,
  (props) => <StagePlaceholder {...props} number={2} />,
  (props) => <StagePlaceholder {...props} number={3} />,
];

const throttleDuration = 700;

const Mission = forwardRef(function Mission(
  { isActive, scrollDirection, onCanLeaveChange },
  ref
) {
  const [index, setIndex] = useState(0);
  const animating = useRef(false);
  const last = stages.length - 1;

  useEffect(() => {
    if (!isActive) return;
    const start = scrollDirection === "up" ? last : 0;
    setIndex(start);
    onCanLeaveChange(false);
  }, [isActive, scrollDirection, last]);

  useEffect(() => {
    if (!isActive) return;
    const onWheel = (e) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = index + dir;

      if (animating.current) {
        e.preventDefault();
        return;
      }

      if (next < 0 || next > last) {
        onCanLeaveChange(true);
        return;
      }

      e.preventDefault();
      animating.current = true;
      onCanLeaveChange(false);
      setIndex(next);
      setTimeout(() => {
        animating.current = false;
      }, throttleDuration);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isActive, index, last]);

  const Stage = stages[index];

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <Stage key={index} />
      </AnimatePresence>
    </div>
  );
});

export default Mission;
