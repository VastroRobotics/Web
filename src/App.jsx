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
      if (alwaysCanLeavePages.includes(activeIndex)) {
        console.log("=========== Forced Second Stiff arm")
        setCanLeave(true);
      }
      setScrollDirection(dir);
      let next = activeIndex + (dir === "down" ? 1 : -1);
      if (next < 0 || next >= sections.length) return;

      setActiveIndex(next);

      // Prevent user getting stuck on Mission (1) and Timeline (3)
      console.log("Next: " + next)
      if (next !== 1 && next !== 3) {
        setCanLeave(true);
        console.log("setCanLeave(true) preventative — from [App]");
      }
    },
  });

  // Function called in Sections with scrollable elements. It forces the page to scroll immediately
  function triggerPageScroll(direction) {
    setScrollDirection(direction);
    let next = activeIndex + (direction === "down" ? 1 : -1);
    if (next < 0 || next >= sections.length) return;

    console.log("Triggering scroll to page", next);
    setActiveIndex(next);
  }
  
  function updateCanLeave(value) {
    console.log("Updating Can Leave--> " + value + "ActiveIndex: " + activeIndex + " |  ");

    if (alwaysCanLeavePages.includes(activeIndex)) {
      console.log("Bypassed canLeave");
      setCanLeave(true);
      return;
    }
    console.log("ActiveIndex: " + activeIndex + " |  ")
    setCanLeave(value);
  }


  // const handleScroll = (e) => {
  //   if (isThrottled.current || !canLeave) return;

  //   const delta = e.deltaY;
  //   const dir = delta > 0 ? "down" : "up";
  //   setScrollDirection(dir);

  //   let next = activeIndex + (dir === "down" ? 1 : -1);
  //   const total = sections.length;

  //   if (next < 0 || next >= total) return;

  //   setActiveIndex(next);
  //   isThrottled.current = true;

  //   setTimeout(() => {
  //     isThrottled.current = false;
  //     // Prevent user getting stuck on pages by ensuring canLeave is set to true in all cases but Mission and Timeline
  //     if (next != 1 && next != 3) {
  //       setCanLeave(true);
  //     }
  //   }, 800); // debounce duration
  // };

  // const jumpToSection = (index) => {
  //   setActiveIndex(index);
  // };


  // useEffect(() => {
  //   window.addEventListener("wheel", handleScroll, { passive: false });
  //   window.addEventListener("touchstart", handleTouchStart, { passive: true });
  //   window.addEventListener("touchend", handleTouchEnd, { passive: true });
  //   return () => {
  //     window.removeEventListener("wheel", handleScroll);
  //     window.removeEventListener("touchstart", handleTouchStart);
  //     window.removeEventListener("touchend", handleTouchEnd);
  //   };
  // }, [canLeave, activeIndex]);

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
