"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import StageBanner from "./StageBanner.jsx";

const components = [StageBanner, StageBanner, StageBanner];

const baseParams = [
  { direction: 0, thickness: 50 },
  { direction: 1, thickness: 50 },
  { direction: 0, thickness: 50 },
];

const stages = [
  [
    { show: true, text: "Banner 1", start: 20, end: 80 },
    { show: false },
    { show: false },
  ],
  [
    { show: false },
    { show: true, text: "Custom Stage", start: 40, end: 90 },
    { show: false },
  ],
  [
    { show: false },
    { show: false },
    { show: true, text: "Final Stage", start: 30, end: 100 },
  ],
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
  }, [isActive, scrollDirection, last, onCanLeaveChange]);

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
  }, [isActive, index, last, onCanLeaveChange]);

  const stage = stages[index];

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      {stage.map((params, i) => {
        const Component = components[i];
        return <Component key={i} {...baseParams[i]} {...params} />;
      })}
    </div>
  );
});

export default Mission;