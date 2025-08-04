"use client";

import { useEffect, useRef, useState, lazy, Suspense, act } from "react";
import useScrollNavigation from "./hooks/useScrollNavigation";

// Load preloaded assets
import AssetPreloader from "./components/common/AssetPreloader";
import backEntrance from "./assets/animations/back_entrance.webm";
import frontEntrance from "./assets/animations/front_entrance.webm";

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
const alwaysCanLeavePages = [0, 2, 4]; // e.g., Home (0), Team (2), Footer (4)


export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [canLeave, setCanLeave] = useState(true);
  const isThrottled = useRef(false);

  useScrollNavigation({
    canScroll: canLeave,
    currPage: activeIndex,
    throttleDuration: 800,
    allowHorizontal: false,
    touchOnly: false,
    onScroll: (dir) => {
      console.log("Active index: " + activeIndex);
      //if (alwaysCanLeavePages.includes(activeIndex)) { setCanLeave(true); }
      if (isThrottled.current) return;
      setScrollDirection(dir);
      let next = activeIndex + (dir === "down" ? 1 : -1);
      if (next < 0 || next >= sections.length) return;

      isThrottled.current = true;
      setActiveIndex(next);
      console.log("Switch activeIndex from Reg to " + next);
      setTimeout(() => {
        isThrottled.current = false;
        console.log("Unthrottled");
      }, 800);
    },
  });

  // Function called in Sections with scrollable elements. It forces the page to scroll immediately
  function triggerPageScroll(direction) {
    if (isThrottled.current) return;
    setScrollDirection(direction);
    let next = activeIndex + (direction === "down" ? 1 : -1);
    if (next < 0 || next >= sections.length) return;
      
    isThrottled.current = true;
    setActiveIndex(next);
    console.log("Switch activeIndex from triggerPageScroll to " + next);
    setTimeout(() => {
      isThrottled.current = false;
      console.log("Unthrottled");
    }, 800);
  }
  
  function updateCanLeave(value) {
    // if (alwaysCanLeavePages.includes(activeIndex)) {
    //   setCanLeave(true); // Should always be true on specific pages
    //   console.log("Stopped a false set of CanLeave from App.jsx")
    // } else {
    setCanLeave(value);
    // }
  }

  return (
    <>
      <AssetPreloader assets={[backEntrance, frontEntrance]} priority={3} />
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
                    onCanLeaveChange={updateCanLeave}
                    triggerPageScroll={triggerPageScroll}
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
    </>
  );
}
