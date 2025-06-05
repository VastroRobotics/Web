"use client";

import { useState } from "react";
import VastroLogo from "../../assets/branding/vastro_full_logo.svg";
import useEdgeSectionScroll from "../../hooks/useEdgeSectionScroll";

export default function VastroMultipage({ activeIndex, goToSection }) {
  const [activePage, setActivePage] = useState("mission");
  const [transitioning, setTransitioning] = useState(false);
  const [glowVisible, setGlowVisible] = useState(true);

  const atStart = activePage === "mission";
  const atEnd = activePage === "customizable";
  const scrollRef = useEdgeSectionScroll({ activeIndex, goToSection, atStart, atEnd });

  const pages = ["mission", "affordable", "intuitive", "customizable"];

  const handleTransition = (nextPage) => {
    if (nextPage !== activePage) {
      setGlowVisible(false);
      setTransitioning(true);
      setTimeout(() => {
        setActivePage(nextPage);
        setTimeout(() => {
          setGlowVisible(true);
          setTransitioning(false);
        }, 400);
      }, 300);
    }
  };

  const handleArrow = () => {
    const current = pages.indexOf(activePage);
    const next = (current + 1) % pages.length;
    handleTransition(pages[next]);
  };

  const sectionStyle = (key) => {
    const base = "absolute w-full transition-all duration-300";
    if (key === activePage && !transitioning) return `${base} opacity-100 translate-x-0`;
    if (key === activePage && transitioning) return `${base} opacity-0 -translate-x-10`;
    return `${base} opacity-0 translate-x-10 hidden`;
  };

  const textStyle = "text-[clamp(0.95rem,1vw+0.5rem,1.25rem)] text-gray-400 leading-relaxed mb-4 break-words";
  const headingStyle = "text-[clamp(1.5rem,2vw+1rem,3rem)] text-white font-bold h-1/5 flex items-end";
  const slashStyle = "text-[clamp(1.75rem,2.25vw+1rem,3.25rem)] leading-none";
  const navBtnStyle = "px-2 py-1 focus:outline-none transition-colors text-[clamp(0.75rem,0.8vw+0.3rem,1rem)]";

  const renderSection = (key, title, paragraphs, glowDecor) => (
    <div key={key} className={sectionStyle(key)}>
      <div className="w-full max-w-[80%] lg:max-w-[50%] h-full flex flex-col">
        {/* Title and slash aligned */}
        <h2 className={headingStyle}>
          <span className="flex items-center gap-2">
            {title}
            <span className={slashStyle}>/</span>
          </span>
        </h2>

        {/* Text content with gradient scrollbar */}
        <div className="relative h-3/5">
          <div className="scroll-container h-full overflow-y-auto pr-2">
            {paragraphs.map((t, i) => (
              <p key={i} className={textStyle}>
                {t}
              </p>
            ))}
          </div>

          <style jsx>{`
            .scroll-container {
              scrollbar-width: thin;
              scrollbar-color: rgba(180, 180, 180, 0.4) transparent;
              -webkit-mask-image: linear-gradient(to bottom, black 0% 90%, transparent 100%);
              mask-image: linear-gradient(to bottom, black 0% 90%, transparent 100%);
              -webkit-mask-size: 100% 100%;
              mask-size: 100% 100%;
              -webkit-mask-repeat: no-repeat;
              mask-repeat: no-repeat;
            }

            .scroll-container::-webkit-scrollbar {
              width: 4px;
              background: transparent;
            }

            .scroll-container::-webkit-scrollbar-thumb {
              background-color: rgba(180, 180, 180, 0.4);
              border-radius: 2px;
              min-height: 20px;
            }

            .scroll-container::-webkit-scrollbar-button {
              display: none;
              height: 0;
              width: 0;
            }

            .scroll-container::-webkit-scrollbar-track {
              background: transparent;
            }
          `}</style>
        </div>
      </div>

      <div className={`transition-opacity duration-700 ${glowVisible ? "opacity-100" : "opacity-0"}`}>
        {glowDecor}
      </div>
    </div>
  );

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-h-screen p-4 sm:p-6 md:p-8 rounded-3xl bg-black shadow-[0_0_10px_2px_rgba(255,255,255,0.15)] overflow-hidden"
      style={{ height: "50vh" }}
      ref={scrollRef}
    >
      <div className="flex-1 relative h-full">
        {renderSection("mission", "Mission", [
          "At VASTRO, we believe the world needs more accessible, telepresence-enabled robotic systems—especially in industries where human risk is high.",
          "Our quadruped robot is designed for remote, high-risk applications ranging from substation inspection to planetary exploration. We focus on affordability, modularity, and safety at scale.",
        ], (
          <>
            <div className="absolute right-[30%] top-[-10%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute right-[5%] top-[20%] w-80 h-72 bg-purple-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute right-[20%] top-[50%] w-72 h-80 bg-cyan-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          </>
        ))}

        {renderSection("affordable", "Affordable", [
          "Advanced robotics shouldn’t break the bank. We’ve built VASTRO with cost in mind using streamlined manufacturing and open standards.",
          "By focusing on modular architecture, our robots offer enterprise performance at a fraction of the cost—making advanced mobility more accessible.",
        ], (
          <>
            <div className="absolute right-[5%] top-[-5%] w-72 h-80 bg-blue-500/15 rotate-45 blur-3xl -z-10 pointer-events-none" />
            <div className="absolute right-[15%] top-[50%] w-64 h-64 bg-cyan-500/15 blur-3xl -z-10 pointer-events-none" />
          </>
        ))}

        {renderSection("intuitive", "Intuitive", [
          "Technology is only powerful when it's usable. Our control interfaces are clear, responsive, and learnable in minutes—even for non-experts.",
          "With real-time feedback, smart defaults, and smooth UX, VASTRO empowers users to focus on their mission—not the controls.",
        ], (
          <>
            <div className="absolute right-[0%] top-[40%] w-80 h-96 bg-purple-500/15 -rotate-15 blur-3xl -z-10 pointer-events-none" />
            <div className="absolute right-[10%] top-[-15%] w-64 h-72 bg-cyan-400/15 blur-3xl -z-10 pointer-events-none" />
          </>
        ))}

        {renderSection("customizable", "Customizable", [
          "No two missions are alike. VASTRO is designed to be customized—sensors, legs, payloads, compute, you name it.",
          "Our platform adapts to any task, from urban inspection to hazardous material handling to education. It’s your robot—make it yours.",
        ], (
          <>
            <div className="absolute right-[0%] top-[0%] w-72 h-80 bg-cyan-500/15 rotate-20 blur-3xl -z-10 pointer-events-none" />
            <div className="absolute right-[10%] top-[50%] w-80 h-64 bg-purple-400/15 blur-3xl -z-10 pointer-events-none" />
          </>
        ))}
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-1/5 flex items-center z-20 justify-between overflow-hidden whitespace-nowrap">
        <div className="flex items-center flex-nowrap gap-4 w-full">
          <button onClick={() => handleTransition("mission")} className="focus:outline-none">
            <img
              src={VastroLogo}
              alt="VASTRO Logo"
              className={`w-28 sm:w-32 md:w-36 object-contain transition-all ${
                activePage === "mission"
                  ? "opacity-100 logo-glow"
                  : "opacity-50 brightness-50 grayscale"
              }`}
            />
          </button>
          <span className="text-gray-400 text-[clamp(0.7rem,0.8vw+0.3rem,0.95rem)] pt-1">is</span>
          <div className="flex items-center gap-2">
            {pages.slice(1).map((page, i) => (
              <div key={page} className="flex items-center">
                <button
                  onClick={() => handleTransition(page)}
                  className={`${navBtnStyle} ${
                    activePage === page
                      ? "text-white font-medium button-glow"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
                {i < 2 && (
                  <span className="text-white mx-2 font-semibold text-[clamp(0.9rem,1vw+0.3rem,1.2rem)]">/</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleArrow}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 group focus:outline-none"
        aria-label="Next section"
      >
        <svg
          width="40"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400 group-hover:text-white transition-colors"
        >
          <path
            d="M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-900/50 to-transparent pointer-events-none" />
    </div>
  );
}
