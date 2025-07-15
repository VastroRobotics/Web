"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import StageBanner from "../layout/StageBanner.jsx";

const components = [StageBanner, StageBanner, StageBanner];

const baseParams = [
  { direction: 0, thickness: 50 },
  { direction: 1, thickness: 50 },
  { direction: 0, thickness: 50 },
];

const stages = [
  [
    {
      show: true,
      header: "VR-Controlled Quadruped Robots",
      text: "$75k Capabilities with a $2.5k Price Tag",
      start: 0,
      end: 80,
    },
    { show: false },
    { show: false },
  ],
  [
    { show: false },
    {
      show: true,
      header: "Mission",
      text: "Here at Vastro, our goal is to develop the next generation of robots, exploiting new and emerging technologies to deliver high performance, effective, and affordable solutions. Our quadruped robot utilizes virtual-reality immersion and haptic feedback controls to drive precision and LiDAR sensing to detect environmental conditions and relay 3D mapping information.",
      start: 0,
      end: 80, // 90
    },
    { show: false },
  ],
  [
    { show: false },
    { show: false },
    {
      show: true,
      header: "Application",
      text: "Our NASA-backed innovative design and software platform enables various use cases and applications in geological services, construction, power & energy, remote services, and in space exploration.",
      start: 0, // 30
      end: 80, // 100
    },
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
