"use client";

import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import BackgroundEmblem from "../components/BackgroundEmblem";
import LogoSplash from "../components/LogoSplash";
import InfoPoint from "../components/InfoPoint";
import Glow from "../components/Glow";
import ScrollPrompt from "../components/ScrollPrompt";

import BackEntrance from "../assets/videos/hero/back_entrance.webm";
import BackLoop from "../assets/videos/hero/back_loop.webm";
import FrontEntrance from "../assets/videos/hero/front_entrance.webm";
import FrontLoop from "../assets/videos/hero/front_loop.webm";

const Home = forwardRef(
  ({ isActive, scrollDirection, onCanLeaveChange, goToNext }, ref) => {
    const backEntranceRef = useRef(null);
    const backLoopRef = useRef(null);
    const frontEntranceRef = useRef(null);
    const frontLoopRef = useRef(null);
    const wrapperRef = useRef(null);

    const [nat, setNat] = useState({ w: 1920, h: 1080 });
    const [showBackLoop, setShowBackLoop] = useState(false);
    const [showFrontLoop, setShowFrontLoop] = useState(false);
    const [activePointId, setActivePointId] = useState(null);
    const [logoDone, setLogoDone] = useState(false);

    const vh = typeof window !== "undefined" ? window.innerHeight : 0;

    const infoPoints = [
      {
        id: "LiDAR Mapping",
        node: { x: "42.5%", y: "18.5%" },
        text: { x: "40%", y: "30%" },
        title: "Feature 1",
        description: "Feature 1 description.",
        direction: "top-right",
      },
      {
        id: "point2",
        node: { x: "64%", y: "24%" },
        text: { x: "80%", y: "10%" },
        title: "Feature 2",
        description: "Feature 2 description.",
        direction: "right",
      },
    ];

    useEffect(() => {
      backLoopRef.current?.load();
      frontLoopRef.current?.load();
      backLoopRef.current?.pause();
      frontLoopRef.current?.pause();

      const onBackEnd = () => {
        setShowBackLoop(true);
        backLoopRef.current?.play();
      };
      const onFrontEnd = () => {
        setShowFrontLoop(true);
        frontLoopRef.current?.play();
      };

      backEntranceRef.current?.addEventListener("ended", onBackEnd);
      frontEntranceRef.current?.addEventListener("ended", onFrontEnd);

      const timer = setTimeout(() => setLogoDone(true), 4500);
      return () => {
        backEntranceRef.current?.removeEventListener("ended", onBackEnd);
        frontEntranceRef.current?.removeEventListener("ended", onFrontEnd);
        clearTimeout(timer);
      };
    }, []);

    useEffect(() => {
      const loaded = () =>
        setNat({
          w: frontLoopRef.current.videoWidth,
          h: frontLoopRef.current.videoHeight,
        });
      frontLoopRef.current?.addEventListener("loadedmetadata", loaded);
      return () =>
        frontLoopRef.current?.removeEventListener("loadedmetadata", loaded);
    }, []);

    useLayoutEffect(() => {
      const update = () => {
        if (!wrapperRef.current) return;
        const scale = window.innerHeight / nat.h;
        wrapperRef.current.style.width = `${nat.w}px`;
        wrapperRef.current.style.height = `${nat.h}px`;
        wrapperRef.current.style.transform = `scale(${scale})`;
      };
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, [nat]);

    useEffect(() => {
      if (isActive) {
        onCanLeaveChange(true); // always allow scroll away
      }
    }, [isActive]);

    const videoClass =
      "absolute inset-0 w-full h-full object-fill pointer-events-none";

    return (
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 p-6">
          <div className="relative w-full h-full overflow-hidden rounded-3xl bg-black shadow-[0_0_10px_2px_rgba(255,255,255,0.15)]">
            <div
              ref={ref}
              className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl"
            >
              <BackgroundEmblem />

              {/* perspective wrapper */}
              <div className="absolute inset-0" style={{ perspective: 800 }}>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      ref={wrapperRef}
                      className="relative origin-center flex-none overflow-visible"
                    >
                      {/* BACK videos */}
                      <div className="absolute inset-0 z-0">
                        <video
                          ref={backEntranceRef}
                          src={BackEntrance}
                          muted
                          autoPlay
                          playsInline
                          preload="auto"
                          className={videoClass}
                          style={{ opacity: showBackLoop ? 0 : 1 }}
                        />
                        <video
                          ref={backLoopRef}
                          src={BackLoop}
                          muted
                          playsInline
                          preload="auto"
                          className={videoClass}
                          style={{ opacity: showBackLoop ? 1 : 0 }}
                        />
                      </div>

                      {/* Logo */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <div className="flex items-center justify-center">
                          <LogoSplash />
                        </div>
                      </div>

                      {/* FRONT videos + overlay nodes */}
                      <div className="absolute inset-0 z-30">
                        <video
                          ref={frontEntranceRef}
                          src={FrontEntrance}
                          muted
                          autoPlay
                          playsInline
                          preload="auto"
                          className={videoClass}
                          style={{ opacity: showFrontLoop ? 0 : 1 }}
                        />
                        <video
                          ref={frontLoopRef}
                          src={FrontLoop}
                          muted
                          playsInline
                          preload="auto"
                          className={videoClass}
                          style={{ opacity: showFrontLoop ? 1 : 0 }}
                        />

                        {showFrontLoop && logoDone && (
                          <div className="absolute inset-0 pointer-events-none">
                            {infoPoints.map((p) => (
                              <InfoPoint
                                key={p.id}
                                {...p}
                                isActive={activePointId === p.id}
                                onHover={setActivePointId}
                                onLeave={() => setActivePointId(null)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-40 z-50 pointer-events-none">
                    <div className="relative w-[700px] h-[500px]">
                      <Glow color="black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll prompt */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
                {logoDone && <ScrollPrompt onClick={goToNext} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Home;
