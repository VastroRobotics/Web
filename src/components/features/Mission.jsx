"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import StageBanner from "../layout/StageBanner.jsx";
import Chart from "../ui/Chart.jsx";
import ComparisonTable from "../ui/ComparisonTable.jsx";

const components = [StageBanner, StageBanner];

const baseParams = [
  { direction: 0, thickness: 50 },
  { direction: 1, thickness: 50 },
];

const bannerOne = (
  <>
    VR-controlled quadruped robots
    <br />$75k capability for $2.5k
  </>
);

const bannerTwo = (
  <>
    Making remote access
    <br />more accessible
  </>
);

const specs = [
  { label: "WEIGHT", left: "32 kg", right: "4 kg" },
  { label: "PAYLOAD", left: "14 kg", right: "1 kg" },
  { label: "CONTROL", left: "Tablet", right: "VR" },
  { label: "HAPTICS", left: "No", right: "Yes" },
  { label: "LIDAR", left: "Yes", right: "Yes" },
  { label: "CAMERA", left: "Standard", right: "360°" },
  { label: "CHASSIS", left: "Cast", right: "3-D Printed" },
];

const stages = [
  {
    banners: [
      { show: true, text: bannerOne, start: 0, end: 90 },
      { show: false },
    ],
    showCharts: false,
    showTable: false,
  },
  {
    banners: [
      { show: true, text: bannerOne, start: 90, end: 70 },
      { show: false },
    ],
    showCharts: true,
    showTable: false,
  },
  {
    banners: [
      { show: true, text: bannerOne, start: 70, end: 0 },
      { show: true, text: bannerTwo, start: 0, end: 90 },
    ],
    showCharts: false,
    showTable: false,
  },
  {
    banners: [
      { show: false },
      { show: true, text: bannerTwo, start: 90, end: 60 },
    ],
    showCharts: false,
    showTable: true,
  },
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
      {stage.banners.map((params, i) => {
        const Component = components[i];
        return (
          <Component key={`${i}-${index}`} {...baseParams[i]} {...params} />
        );
      })}

      {stage.showCharts && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col lg:flex-col md:flex-row gap-10 justify-center items-center w-full">
            <Chart title="VASTRO" targetAmount={2500} targetPercent={2.5} barColor="#ffffff" />
            <Chart title="Competitors" targetAmount={75000} targetPercent={70} barColor="#ffffff" />
          </div>
        </div>
      )}

      {stage.showTable && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ComparisonTable data={specs} labelLeft="Spot" labelRight="Vastro" />
        </div>
      )}
    </div>
  );
});

export default Mission;
