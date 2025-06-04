"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import StagePlaceholder from "./StagePlaceholder";

const components = [
  (props) => <StagePlaceholder {...props} text="Stage 1" />,
  (props) => <StagePlaceholder {...props} text="Stage 2" />,
  (props) => <StagePlaceholder {...props} text="Stage 3" />,
];

const stages = [
  [
    [1, true],
    [2, false],
    [3, false],
  ],
  [
    [1, false],
    [2, true],
    [3, false],
  ],
  [
    [1, false],
    [2, false],
    [3, true],
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
      {stage.map(([num, show]) => {
        const Component = components[num - 1];
        return <Component key={num} show={show} />;
      })}
    </div>
  );
});

export default Mission;
