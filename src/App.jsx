"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import ScrollBar from "./components/layout/ScrollBar";
import Home from "./components/features/Home";
import SectionWrapper from "./components/layout/SectionWrapper";
import Loading from "./components/common/Loading";
import ErrorBoundary from "./components/common/ErrorBoundary";


// Lazy load all sections except Home
const Mission = lazy(() => import("./components/features/Mission"));
const Team = lazy(() => import("./components/features/Team"));
const Timeline = lazy(() => import("./components/features/Timeline"));
const Footer = lazy(() => import("./components/features/Footer"));

const sections = [Home, Mission, Team, Timeline, Footer];

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
      // Prevent user getting stuck on Home and Team pages by ensuring canLeave is set to true
      if (next == 0 || next == 2) {
        setCanLeave(true);
      }
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
      {sections.map((Section, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            pointerEvents: i === activeIndex ? "auto" : "none",
            zIndex: i === activeIndex ? 10 : 0,
          }}
        >
          <ErrorBoundary>
            <SectionWrapper
              isActive={i === activeIndex}
              scrollDirection={scrollDirection}
            >
              <Suspense fallback={i === 0 ? null : <Loading />}>
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
              </Suspense>
            </SectionWrapper>
          </ErrorBoundary>
        </div>
      ))}
    </div>
  );
}
