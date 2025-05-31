"use client";

import { useEffect, useRef, useState } from "react";
import ScrollBar from "./components/ScrollBar";
import Home from "./sections/Home";
import Mission from "./sections/Mission";
import About from "./sections/About";
import Team from "./sections/Team";
import Timeline from "./sections/Timeline";
import SectionWrapper from "./components/SectionWrapper";

const sections = [Home, Mission,  About, Team, Timeline];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [canLeave, setCanLeave] = useState(true);
  const isThrottled = useRef(false);

  const handleScroll = (e) => {
    if (isThrottled.current || !canLeave) return;
  
    const delta = e.deltaY;
    const dir = delta > 0 ? "down" : "up";
    setScrollDirection(dir);
  
    let next = activeIndex + (dir === "down" ? 1 : -1);
    const total = sections.length;
  
    if (next < 0 || next >= total) return;
  
    setActiveIndex(next);
    isThrottled.current = true;
  
    setTimeout(() => {
      isThrottled.current = false;
    }, 800); // debounce duration
  };
  

  const jumpToSection = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [canLeave, activeIndex]);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <ScrollBar
        activeIndex={activeIndex}
        setActiveIndex={jumpToSection}
        sectionRefs={{}} // optional if needed
      />
      {sections.map((Section, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            pointerEvents: i === activeIndex ? "auto" : "none",
            zIndex: i === activeIndex ? 10 : 0,
          }}
        >
          <SectionWrapper
            isActive={i === activeIndex}
            scrollDirection={scrollDirection}
          >
            <Section
              isActive={i === activeIndex}
              scrollDirection={scrollDirection}
              onCanLeaveChange={setCanLeave}
              goToNext={() =>
                setActiveIndex((prev) =>
                  Math.min(prev + 1, sections.length - 1)
                )
              }
            />
          </SectionWrapper>
        </div>
      ))}
    </div>
  );
}
