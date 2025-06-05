import { useEffect, useState, useRef } from "react";

export default function ScrollBar({ activeIndex, goToSection, sectionRefs = { current: [] } }) {
  const [visible, setVisible] = useState(false);
  const [activated, setActivated] = useState(false);
  const timeoutRef = useRef(null);

  const BAR_HEIGHT_PERCENT = 50;
  const BAR_WIDTH = "15px";
  const DOT_SIZE = "1.875rem";
  const BAR_LEFT_OFFSET = "10rem";

  const fadeInThenOut = () => {
    if (!activated) return;
    setVisible(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 1000);
  };

  useEffect(() => {
    const activationTimeout = setTimeout(() => setActivated(true), 3000);
    return () => clearTimeout(activationTimeout);
  }, []);

  useEffect(() => {
    fadeInThenOut();
  }, [activeIndex]);

  const total = sectionRefs?.current?.length ?? 6;
  const dotSpacing = 100 / (total - 1);

  return (
    <>
      {/* Invisible hover hitbox */}
      <div
        className="fixed top-1/2 -translate-y-1/2 z-40"
        style={{
          height: `${BAR_HEIGHT_PERCENT}vh`,
          left: BAR_LEFT_OFFSET,
          width: "4rem",
          transform: "translateX(-50%) translateY(-50%)",
        }}
        onMouseEnter={fadeInThenOut}
        onMouseMove={fadeInThenOut}
      />

      {/* Visible scroll bar */}
      <div
        className={`fixed top-1/2 z-50 flex items-center justify-center pointer-events-none ${
          visible
            ? "opacity-100 transition-opacity duration-500"
            : "opacity-0 transition-opacity duration-1000"
        }`}
        style={{
          height: `${BAR_HEIGHT_PERCENT}vh`,
          left: BAR_LEFT_OFFSET,
          transform: "translateY(-50%)",
        }}
      >
        <div
          className="relative rounded-full bg-gray-800 pointer-events-auto"
          style={{ width: BAR_WIDTH, height: "100%" }}
        >
          <div
            className="absolute left-0 rounded-full bg-white transition-all duration-300"
            style={{
              width: BAR_WIDTH,
              height: `calc(${(activeIndex / (total - 1)) * 100}% + calc(${DOT_SIZE} / 2))`,
            }}
          />
          {Array.from({ length: total }).map((_, i) => {
            const isSelected = activeIndex === i;
            return (
              <button
                key={i}
                onClick={() => goToSection(activeIndex, i)} // 🔁 no scrollIntoView
                className={`absolute left-1/2 -translate-x-1/2 rounded-full border-2 transition-all duration-300 ease-out z-10
                  ${
                    isSelected
                      ? "bg-white border-gray-500 shadow-md shadow-white/50"
                      : "bg-gray-300 border-gray-700 hover:scale-125"
                  }
                `}
                style={{
                  top: `calc(${i * dotSpacing}% - calc(${DOT_SIZE} / 2))`,
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
