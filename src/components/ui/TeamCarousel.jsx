"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Linkedin, Mail } from "lucide-react";

import AlexImage from "../../assets/media/team/Alex.png";
import AndrewImage from "../../assets/media/team/Andrew.jpeg";
import InesImage from "../../assets/media/team/Ines.jpeg";
import JesalinaImage from "../../assets/media/team/Jesalina.jpeg";
import JoshImage from "../../assets/media/team/Josh.jpeg";
import LucasImage from "../../assets/media/team/Lucas.jpeg";
import RickImage from "../../assets/media/team/Rick.jpg";
import RyanImage from "../../assets/media/team/Ryan.jpeg";
import ZachImage from "../../assets/media/team/Zach.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Andrew Mombay",
    role: "Co-Founder & CEO",
    image: AndrewImage,
    linkedin: "https://www.linkedin.com/in/andrew-mombay",
    email: "a.mombay@vastro.org",
    bio: "Andrew Mombay is a junior pursuing a B.S. in Mechanical Engineering and a B.A. in Business Economics. As CEO and co-founder of Vastro, he led the company from a classroom concept to a functioning telepresence-robotics platform, driving strategic partnerships, investor relations, and overall corporate vision.",
  },
  {
    id: 2,
    name: "Jesalina Phan",
    role: "Co-Founder & Chief Technology Officer",
    image: JesalinaImage,
    linkedin: "https://www.linkedin.com/in/jesalina-phan/",
    email: "j.phan@vastro.org",
    bio: "Jesalina Phan is a junior pursuing a B.S. in Computer Engineering and Entrepreneurship. As CTO, she architects and oversees both hardware and software integration—managing power electronics, embedded systems, and firmware development—to ensure Vastro’s solutions meet rigorous performance and reliability standards.",
  },

  {
    id: 3,
    name: "Josh Krakauer",
    role: "Design Lead",
    image: JoshImage,
    linkedin: "https://www.linkedin.com/in/josh-krakauer-b51a5523b",
    email: "j.krakauer@vastro.org",
    bio: "Josh Krakauer is a senior earning a B.S. in Mechanical Engineering. He leads mechanical design and CAD development, translating customer requirements into manufacturable assemblies and ensuring that every robotic component meets engineering, cost, and usability targets.",
  },
  {
    id: 4,
    name: "Lucas Kover Wolf",
    role: "Infrastructure & Networking Lead",
    image: LucasImage,
    linkedin: "https://www.linkedin.com/in/lucas-kover-wolf/",
    email: "info@vastro.org",
    bio: "Lucas Kover Wolf is a sophomore studying Applied Mathematics and Computer Science. Lucas coordinates our software infrastructure, integrating networking protocols, backend services, and robotic actuation layers. His work ensures system interoperability and high-availability operation across Vastro’s end-to-end technology stack.",
  },
  {
    id: 5,
    name: "Alexander Thaep",
    role: "Software Lead",
    image: AlexImage,
    email: "info@vastro.org",
    bio: "Alexander Thaep is a junior in Applied Mathematics and Computer Science. He spearheads the development of our immersive VR control environment and haptic-feedback interfaces, delivering the core software that enables intuitive, real-time teleoperation of our robotic systems.",
  },
  {
    id: 6,
    name: "Ines Saltiel",
    role: "Head of R&D",
    image: InesImage,
    linkedin: "https://www.linkedin.com/in/ines-saltiel",
    email: "i.saltiel@vastro.org",
    bio: "Ines Saltiel is a sophomore studying Design Engineering. As R&D Lead, she conducts user research, prototype testing, and performance analysis to refine both hardware and software, accelerating Vastro’s path to a market-ready product.",
  },

  {
    id: 7,
    name: "Ryan Duong",
    role: "Virtual Reality Integration Lead",
    image: RyanImage,
    linkedin: "https://www.linkedin.com/in/ryanduongct",
    email: "info@vastro.org",
    bio: "Ryan is a sophomore pursuing a B.S. in Applied Mathematics and Computer Science. Ryan’s work ensures that operators engage with Vastro’s telepresence robots through a seamless, responsive, and highly immersive virtual experience.",
  },
  {
    id: 8,
    name: "Zach Stellato",
    role: "Perception & Sensor Systems Lead",
    image: ZachImage,
    linkedin: "www.linkedin.com/in/zach-stellato-7862a1296",
    email: "info@vastro.org",
    bio: "Zach Stellato is a junior pursuing a B.S. in Computer Science at Brown University. Zach develops the signal-processing pipelines and perception algorithms that enable reliable obstacle detection, mapping, and environment modeling—ensuring our telepresence robots navigate complex and dynamic settings with precision.",
  },
  {
    id: 9,
    name: "Rick Fleeter",
    role: "Adviser",
    image: RickImage,
    linkedin: "https://it.linkedin.com/in/rick-fleeter-5272432a3",
    email: "info@vastro.org",
    bio: "Dr. Rick Fleeter is a pioneer in aerospace engineering and small satellite innovation. With over 20 successful missions and a groundbreaking aerospace company behind him, he brings invaluable guidance, mentorship, and industry expertise to shape our technical and strategic direction.",
  },
];

export default function TeamCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [infoVisible, setInfoVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [itemGap, setItemGap] = useState(12);
  const carouselRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [containerHeight, setContainerHeight] = useState(600);

  const computeVisible = () => {
    const screenWidth = window.innerWidth - 48;
    const scale = screenWidth < 777 ? screenWidth / 710 : 1;
    setScaleFactor(scale);

    const open = 465 * scale;
    const closed = Math.max(30, 60 * scale);
    const minGap = 12 * scale;
    const maxGap = 18 * scale;

    const height =
      screenWidth < 777 ? Math.max(600, window.innerHeight) * 0.6 : 600;
    setContainerHeight(height);

    let width = screenWidth;
    let count = 1;
    let remaining = width - open;

    while (remaining >= closed + minGap && count < teamMembers.length) {
      count++;
      remaining -= closed + minGap;
    }

    let gap = Math.min(
      Math.max(minGap, minGap + remaining / Math.max(1, count - 1)),
      maxGap
    );

    return { count, gap };
  };
  const rotateCarousel = useCallback(() => {
    // Don't rotate if carousel already animating or all members are visible
    if (isRotating || visibleCount >= teamMembers.length) return;
    setIsRotating(true);
    // Advance by the number of visible cards so each "page" of members is unique
    setRotationOffset((prev) => prev + visibleCount - 1);
    setActiveIndex(0); // Default to first item on rotation
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  }, [isRotating, visibleCount]);

  useEffect(() => {
    const update = () => {
      const { count, gap } = computeVisible();
      setVisibleCount(count);
      setItemGap(gap);
      setActiveIndex(count > 1 ? Math.floor((count + 1) / 2) : 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        Date.now() - lastInteraction > 18000 &&
        !isRotating &&
        visibleCount < teamMembers.length
      ) {
        rotateCarousel();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [lastInteraction, isRotating, rotateCarousel, visibleCount]);

  useEffect(() => {
    setInfoVisible(false);
    const timeout = setTimeout(() => setInfoVisible(true), 240);
    return () => clearTimeout(timeout);
  }, [activeIndex]);
  const getVisibleMembers = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (rotationOffset + i) % teamMembers.length;
      result.push({
        ...teamMembers[index],
        visibleIndex: i,
      });
    }
    return result;
  };

  const visibleMembers = getVisibleMembers();
  const itemHeightInactive = containerHeight - 50 * scaleFactor;

  return (
    <div
      className="flex justify-center w-full overflow-hidden"
      style={{ height: `${containerHeight}px` }}
      onMouseMove={() => setLastInteraction(Date.now())}
    >
      <AnimatePresence mode="popLayout">
        <div
          ref={carouselRef}
          className="flex w-fit"
          style={{ gap: `${itemGap}px`, height: `${itemHeightInactive}px` }}
        >
          {visibleMembers.map((member, index) => {
            const isRightmost =
              visibleCount < teamMembers.length && index === visibleCount - 1;
            const isActive = index === activeIndex;

            return (
              <Motion.div
                key={`${member.id}-${member.visibleIndex}`}
                className="relative cursor-pointer"
                style={{
                  zIndex: isActive ? 10 : 1,
                  height: `${
                    isActive ? containerHeight : itemHeightInactive
                  }px`,
                }}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  width: `${isActive ? 465 * scaleFactor : 60 * scaleFactor}px`,
                  flex: "0 0 auto",
                  marginLeft: isActive ? `${8 * scaleFactor}px` : "0px",
                  marginRight: isActive ? `${8 * scaleFactor}px` : "0px",
                }}
                exit={{ opacity: 0, y: -40 }}
                transition={{
                  opacity: {
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  },
                  y: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  },
                  scale: {
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  },
                  width: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }, // no delay
                  layout: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }, // no delay
                }}
                onMouseEnter={() =>
                  !isRightmost && !isRotating && setActiveIndex(index)
                }
                layout
              >
                <div
                  className="w-full overflow-hidden h-full"
                  style={{
                    borderRadius: `${Math.max(6, 12 * scaleFactor)}px`,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Motion.img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className={`w-full h-full object-cover ${
                        !isActive ? "filter grayscale" : ""
                      }`}
                      loading="lazy"
                      animate={{ scale: isActive ? 1.12 : 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Static black overlay with bouncing arrow */}
                    {isRightmost && (
                      <div
                        className="absolute inset-0 bg-black/70 flex items-center justify-center cursor-pointer z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          rotateCarousel();
                          setLastInteraction(Date.now());
                        }}
                      >
                        <Motion.div
                          initial={{ x: 0 }}
                          animate={{ x: [0, 8, 0, 8, 0] }}
                          transition={{
                            delay: 4.5,
                            duration: 1.5,
                            times: [0, 0.25, 0.5, 0.75, 1],
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 2.5,
                          }}
                        >
                          <ChevronRight
                            className="text-white"
                            style={{
                              width: `${40 * scaleFactor}px`,
                              height: `${40 * scaleFactor}px`,
                            }}
                          />
                        </Motion.div>
                      </div>
                    )}

                    {!isRightmost && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    )}

                    {!isActive && (
                      <div
                        className="absolute inset-0 flex items-end justify-center"
                        style={{ paddingBottom: `${80 * scaleFactor}px` }}
                      >
                        <div
                          className="rotate-[-90deg] origin-center whitespace-nowrap font-bold text-white tracking-wide"
                          style={{ fontSize: `${30 * scaleFactor}px` }}
                        >
                          {member.name.split(" ")[0]}
                        </div>
                      </div>
                    )}

                    {/* Info Box */}
                    <Motion.div
                      className={`absolute bottom-0 left-0 w-full h-[clamp(80px,30vh,250px)] pointer-events-none overflow-hidden`}
                      initial="hidden"
                      animate={isActive && infoVisible ? "visible" : "hidden"}
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/50 to-transparent pointer-events-auto flex flex-col justify-end"
                        style={{
                          padding: `${24 * scaleFactor}px`,
                          gap: `${8 * scaleFactor}px`,
                        }}
                      >
                        <h3 className="font-bold text-white whitespace-nowrap text-[clamp(15px,3.4vw,24px)]">
                          {member.name}
                        </h3>
                        <div
                          className="flex items-center font-semibold text-gray-200 text-[clamp(12.5px,2.6vw,18px)]"
                          style={{ gap: `${Math.max(4, 8 * scaleFactor)}px` }}
                        >
                          <span>{member.role}</span>
                          <div
                            className="flex items-center text-gray-400"
                            style={{
                              paddingLeft: `${Math.max(6, 12 * scaleFactor)}px`,
                              gap: `${Math.max(2, 4 * scaleFactor)}px`,
                            }}
                          >
                            <a
                              href={member.email}
                              aria-label="Email"
                              className="text-gray-400 hover:text-white"
                              style={{ padding: `${4 * scaleFactor}px` }}
                            >
                              <Mail
                                className="text-gray-400"
                                style={{
                                  width: `${Math.max(15, 20 * scaleFactor)}px`,
                                  height: `${20 * scaleFactor}px`,
                                }}
                              />
                            </a>
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn"
                              className="text-gray-400 hover:text-white"
                              style={{ padding: `${4 * scaleFactor}px` }}
                            >
                              <Linkedin
                                className="text-gray-400"
                                style={{
                                  width: `${Math.max(15, 20 * scaleFactor)}px`,
                                  height: `${20 * scaleFactor}px`,
                                }}
                              />
                            </a>
                          </div>
                        </div>
                        <p
                          className={`text-gray-400 whitespace-pre-line text-[clamp(11px,2.3vw,16px)]`}
                        >
                          {member.bio}
                        </p>
                      </div>
                    </Motion.div>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
}
