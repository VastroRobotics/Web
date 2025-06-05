"use client";

import { useEffect, useRef, useState } from "react";
import { motion as Motion, useAnimation } from "framer-motion";
import ScrollIndicator from "../layout/ScrollIndicator";

const timelineEvents = [
  {
    id: "1",
    title: "Project Formation",
    date: "08/2024",
    description: "What started as an idea between friends in a dusty old engineering classroom quickly became the foundation for Virtual Astronaut. The research project, guided by Professor Rick Fleeter and backed by the Nelson Center, the Hazeltine Grant, and Research@Brown, quickly began taking shape.",
    color: "#FFFFFF",
    distance: 240,
  },
  {
    id: "2",
    title: "Initial Prototype",
    date: "10/2024",
    description: "With support in place and momentum building, the team built their first prototype: a rail-mounted robotic arm capable of basic grab-and-drop tasks. It was the first tangible step in transforming their research into a functional system—laying the groundwork for immersive VR control and full mobility.",
    color: "#FFFFFF",
    image: "/assets/images/timeline/prototype.png",
    distance: 360,
  },
  {
    id: "3",
    title: "NASA Partnership",
    date: "02/2025",
    description: "Backed by early success, the team formed a partnership with NASA through the Rhode Island Space Grant Consortium. Their generous financial support and strategic guidance marked a turning point—elevating the project from a student-led initiative to a platform with real potential for deployment in space and remote Earth environments.",
    color: "#FFFFFF",
    distance: 200,
  },
  {
    id: "4",
    title: "Quadruped Development",
    date: "03/2025",
    description: "The team began work on their most ambitious model yet: a fully mobile quadruped robot. Working around the clock in the workshop, they pushed to take the project’s capabilities to the next level with advanced mobility, LiDAR sensing, and VR-based precision control.",
    color: "#FFFFFF",
    image: "/placeholder.svg?height=150&width=240",
    distance: 380,
  },
  {
    id: "5",
    title: "Pitching & Presentation",
    date: "04/2025",
    description: "The team had the opportunity to present Vastro to the Brown University President’s Leadership Council and later at the NASA Rhode Island Space Grant Consortium. These moments marked a turning point as we began sharpening our business aspirations—developing and testing our go-to-market strategy, refining our value offering, and laying the groundwork for future growth.",
    color: "#FFFFFF",
    distance: 260,
  },
    {
    id: "6",
    title: "Demo Ready",
    date: "12/2025",
    description: "The team has their sights set on completing a fully operational quadruped model by the end of next semester. The focus: delivering a working demo and proof of concept showcasing immersive VR control, real-time LiDAR mapping, and reliable remote operation.",
    color: "#FFFFFF",
    distance: 260,
  },
    {
    id: "7",
    title: "Manufacturing & Scaling",
    date: "2026",
    description: "The team hopes to leverage this success to begin exploring scalable production methods—emphasising cost efficiency and our innovative 3D-printing-first approach as the backbone of a lean, adaptable manufacturing strategy.",
    color: "#FFFFFF",
    distance: 260,
  },
];

export default function Timeline({
  isActive,
  scrollDirection,
  onCanLeaveChange,
  centerFraction = 0.5,
}) {
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const isThrottled = useRef(false);
  const unlockTimeout = useRef(null);

  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const forwardThrottle = 600;
  const backwardThrottle = 400;

  const timelineWidth = timelineEvents.length * 400;
  const timelineHeight = 10;
  const nodeSize = timelineHeight * 3;
  const nodeOffset = nodeSize / 2;

  const shiftPerEvent = timelineWidth / (timelineEvents.length - 1);

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isActive) {
      const start = scrollDirection === "down" ? timelineEvents.length - 1 : 0;
      setActiveIndex(start);
      setCanScroll(false);
      onCanLeaveChange(false);
      isThrottled.current = true;

      clearTimeout(unlockTimeout.current);
      unlockTimeout.current = setTimeout(() => {
        setCanScroll(true);
        isThrottled.current = false;
      }, forwardThrottle);
    } else {
      setCanScroll(false);
      isThrottled.current = false;
      clearTimeout(unlockTimeout.current);
    }
  }, [isActive, scrollDirection]);

  useEffect(() => {
    if (!isActive || !canScroll) return;

    const handleWheel = (e) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const maxIndex = timelineEvents.length - 1;

      if (dir > 0 && activeIndex === maxIndex) {
        if (isThrottled.current) return;
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, forwardThrottle);
        onCanLeaveChange(true);
        return;
      }

      if (dir < 0 && activeIndex === 0) {
        onCanLeaveChange(true);
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (isThrottled.current) return;

      const nextIndex = Math.min(Math.max(activeIndex + dir, 0), maxIndex);
      if (nextIndex === activeIndex) return;

      isThrottled.current = true;
      const delay = dir > 0 ? forwardThrottle : backwardThrottle;

      setTimeout(() => {
        isThrottled.current = false;
      }, delay);

      onCanLeaveChange(false);
      setActiveIndex(nextIndex);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isActive, canScroll, activeIndex]);

  useEffect(() => {
    const fraction = viewport.width < 768 ? 0.20 : centerFraction;
    const center = viewport.width * fraction;
    controls.start({ x: center - nodeOffset - activeIndex * shiftPerEvent });

  }, [activeIndex, viewport.width, centerFraction]);

  const progress = activeIndex / (timelineEvents.length - 1);

  const centerOffset = activeIndex * shiftPerEvent - timelineWidth / 2;
  const scaleFactor = 1 - Math.min(0.25, Math.abs(centerOffset) / (timelineWidth / 2) * 0.25);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 p-6">
        <div className="relative w-full h-full overflow-hidden rounded-3xl bg-black shadow-[0_0_10px_2px_rgba(255,255,255,0.15)]">
          {/* Timeline Line */}
          <Motion.div
            className="absolute left-0 top-1/2 flex items-center"
            style={{
              width: `${timelineWidth}px`,
              transform: `translateY(-50%) scale(${scaleFactor})`,
              transformOrigin: "center center",
            }}
            animate={controls}
            transition={{ ease: "linear" }}
          >
            <div
              className="relative w-full"
              style={{
                height: `${timelineHeight}px`,
                backgroundColor: "#333",
                marginTop: `-${timelineHeight / 2}px`,
              }}
            >
              <Motion.div
                className="absolute top-0 left-0 h-full bg-white"
                animate={{ width: `${progress * 100}%` }}
                transition={{ ease: "easeOut", duration: 0.35 }}
                style={{ height: `${timelineHeight}px` }}
              />

              {timelineEvents.map((ev, idx) => {
                const isFuture = idx > activeIndex;
                const isCurrent = idx === activeIndex;
                const isPast = idx < activeIndex;
                const baseDistance = ev.distance || 300;
                const distance = Math.min(baseDistance, viewport.height * 0.35);

                const pos = `${(idx / (timelineEvents.length - 1)) * timelineWidth}px`;
                const color = ev.color;
                const isDown = idx % 2 !== 0;

                const baseDelay = 0.15;
                const lineDelay = baseDelay + 0.25;
                const topNodeDelay = lineDelay + 0.3;
                const titleDelay = topNodeDelay + 0.2;
                const textDelay = titleDelay + 0.15;
                const imageDelay = textDelay + 0.15;

                const reverseImageDelay = 0;
                const reverseTextDelay = 0.08;
                const reverseTitleDelay = 0.16;
                const reverseTopNodeDelay = 0.24;
                const reverseLineDelay = 0.32;

                return (
                  <div key={ev.id} className="absolute" style={{ left: pos, top: "50%", transform: "translateY(-50%)" }}>
                    <Motion.div
                      initial={{ scale: 0.55, backgroundColor: "#333333" }}
                      className="relative rounded-full"
                      style={{
                        top: "7px",
                        width: `${nodeSize}px`,
                        height: `${nodeSize}px`,
                        marginLeft: `-${nodeOffset}px`,
                        marginTop: `-${nodeOffset}px`,
                        zIndex: 5,
                      }}
                      animate={
                        (isPast || isCurrent)
                          ? { scale: 1, backgroundColor: "#121212", border: "4px solid " + color }
                          : { scale: 0.55, backgroundColor: "#333333", border: "none" }
                      }
                      transition={{
                        duration: 0.25,
                        delay: isFuture ? reverseLineDelay + 0.35 : baseDelay,
                      }}
                    />

                    <div className="absolute" style={{ left: 0, top: 0, width: "400px" }}>
                      <Motion.div
                        className="absolute bg-white"
                        initial={{ scaleY: 0, opacity: 0.4 }}
                        animate={isFuture ? { scaleY: 0, opacity: 0.4 } : { scaleY: 1, opacity: 1 }}
                        transition={{
                          duration: isFuture ? 0.15 : 0.2,
                          delay: isFuture ? reverseLineDelay : lineDelay,
                          ease: "easeOut",
                        }}
                        style={{
                          width: "4px",
                          height: distance,
                          backgroundColor: color,
                          top: isDown ? `${nodeOffset}px` : `-${distance}px`,
                          transformOrigin: isDown ? "top" : "bottom",
                          zIndex: 2,
                        }}
                      />

                      <Motion.div
                        className="absolute rounded-full"
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={isFuture ? { scale: 0.3, opacity: 0 } : { scale: 1.2, opacity: 1 }}
                        transition={{
                          duration: isFuture ? 0.15 : 0.2,
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                          delay: isFuture ? reverseTopNodeDelay : topNodeDelay,
                        }}
                        style={{
                          backgroundColor: color,
                          width: `${nodeSize}px`,
                          height: `${nodeSize}px`,
                          left: "-13px",
                          top: isDown ? `${distance}px` : `-${distance + nodeSize}px`,
                          zIndex: 3,
                          boxShadow: "0 0 15px 5px rgba(255,255,255,0.3)",
                        }}
                      />

<Motion.div
  className={`absolute flex flex-col${isDown ? "-reverse" : ""}`}
  initial={{ opacity: 0, x: -30 }}
  animate={isFuture ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
  transition={{
    duration: isFuture ? 0.15 : 0.2,
    delay: isFuture ? reverseTitleDelay : titleDelay,
    ease: "easeOut",
  }}
  style={{
    left: "60px",
    ...(isDown
      ? {
          bottom: `-${distance + nodeSize + 12}px`,
        }
      : {
          top: `-${distance + nodeSize}px`,
        }),
    width: "350px",
    maxWidth: "40vw"
  }}
>
  <div className={`m${isDown ? "t-4" : "b-2"}`}>
    <span className="text-xs sm:text-sm lg:text-md xl:text-md text-gray-400 mb-0.5">{ev.date}</span>
    <h3 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap" style={{ color }}>
  {ev.title}
</h3>
  </div>
  <Motion.p
    className={`text-sm text-gray-400 m${isDown ? "t-4" : "b-4"}`}
    initial={{ opacity: 0, y: -30 }}
    animate={isFuture ? { opacity: 0, y: isDown ? 30 : -30 } : { opacity: 1, y: 0 }}
    transition={{
      duration: isFuture ? 0.15 : 0.2,
      delay: isFuture ? reverseTextDelay : textDelay,
      ease: "easeOut",
    }}
  >
    {ev.description}
  </Motion.p>
  {ev.image && (
    <Motion.div
      className="rounded-md overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isFuture ? { opacity: 0 } : { opacity: 1 }}
      transition={{
        duration: isFuture ? 0.15 : 0.2,
        delay: isFuture ? reverseImageDelay : imageDelay,
        ease: "easeOut",
      }}
    >
      <img
        src={ev.image}
        alt={ev.title}
        width={240}
        style={{ maxWidth: "30vw", height: "auto" }}
        className="rounded-md object-cover"
      />
    </Motion.div>
  )}
</Motion.div>

                    </div>
                  </div>
                );
              })}
            </div>
          </Motion.div>

          {/* Side gradient overlays */}
          <div className="absolute top-0 left-0 h-full w-40 pointer-events-none z-20 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute top-0 right-0 h-full w-40 pointer-events-none z-20 bg-gradient-to-l from-black to-transparent" />

          {/* Scroll Indicator */}
          <div className="top-0 justify-center z-50">
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </div>  
  );
}
