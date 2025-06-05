"use client";

import { useState, lazy, Suspense } from "react";
import Home from "./components/features/Home";
import SectionWrapper from "./components/layout/SectionWrapper";
import Loading from "./components/common/Loading";
import ErrorBoundary from "./components/common/ErrorBoundary";


// Lazy load all sections except Home
const Mission = lazy(() => import("./components/features/Mission"));
const About = lazy(() => import("./components/features/About"));
const Team = lazy(() => import("./components/features/Team"));
const Timeline = lazy(() => import("./components/features/Timeline"));
const Footer = lazy(() => import("./components/features/Footer"));

const sections = [Home, Mission, About, Team, Timeline, Footer];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [movementDirection, setMovementDirection] = useState("down");

  const goToSection = (currentIndex, targetIndex) => {
    if (
      targetIndex < 0 ||
      targetIndex >= sections.length ||
      currentIndex === targetIndex
    ) {
      return;
    }
    setMovementDirection(targetIndex > currentIndex ? "up" : "down");
    setActiveIndex(targetIndex);
  };


  return (
    <div className="w-full h-screen overflow-hidden relative">
      {sections.map((Section, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            pointerEvents: i === activeIndex ? "auto" : "none",
            zIndex: i === activeIndex ? 10 : 0,
            display: Math.abs(i - activeIndex) > 1 ? 'none' : 'block'
          }}
        >
          <ErrorBoundary>
            <SectionWrapper
              isActive={i === activeIndex}
              movementDirection={movementDirection}
              isFirst={i === 0}
            >
              <Suspense fallback={i === 0 ? null : <Loading />}>
                <Section
                  isActive={i === activeIndex}
                  movementDirection={movementDirection}
                  activeIndex={activeIndex}
                  goToSection={goToSection}
                />
              </Suspense>
            </SectionWrapper>
          </ErrorBoundary>
        </div>
      ))}
    </div>
  );
}
