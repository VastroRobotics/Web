import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  lazy,
  Suspense,
  useCallback
} from "react";
import InfoPoint from "../ui/InfoPoint";
import ScrollPrompt from "../layout/ScrollPrompt";
import LogoSplash from "../common/LogoSplash";
import AssetLoader from '../../utils/assetLoader';
import { useBreakpoint } from '../../hooks/useBreakpoint';

import BackEntrance from "../../assets/animations/back_entrance.webm";
import BackLoop from "../../assets/animations/back_loop.webm";
import FrontEntrance from "../../assets/animations/front_entrance.webm";
import FrontLoop from "../../assets/animations/front_loop.webm";

const LazyBackgroundEmblem = lazy(() => import('../BackgroundEmblem'));
const LazyGlow = lazy(() => import('../ui/Glow'));

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
    const [videoReady, setVideoReady] = useState(false);
    const [entranceLoaded, setEntranceLoaded] = useState({ back: false, front: false });
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { breakpoint, isMobile } = useBreakpoint();

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
    ];    const preloadVideos = useCallback(async () => {
      const criticalVideos = [
        { src: BackEntrance, type: 'video', priority: 3 },
        { src: FrontEntrance, type: 'video', priority: 3 }
      ];
      
      const secondaryVideos = [
        { src: BackLoop, type: 'video', priority: 2 },
        { src: FrontLoop, type: 'video', priority: 2 }
      ];

      // Set up progress tracking
      AssetLoader.setProgressCallback(setLoadingProgress);

      // Load critical videos first
      await AssetLoader.preloadAssets(criticalVideos);
      
      // Then load secondary videos
      AssetLoader.preloadAssets(secondaryVideos);
    }, []);

    useEffect(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/serviceWorker.js')
          .then(registration => {
            console.log('ServiceWorker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.error('ServiceWorker registration failed:', error);
          });
      }
      preloadVideos();

      // Cleanup
      return () => {
        AssetLoader.setProgressCallback(null);
      };
    }, [preloadVideos]);

    const setupVideo = useCallback((videoRef, src) => {
      if (!videoRef.current) return;

      if (AssetLoader.cache.has(src)) {
        AssetLoader.cache.get(src)
          .then(preloadedVideo => {
            videoRef.current.src = preloadedVideo.src;
            if (src.includes('entrance')) {
              setEntranceLoaded(prev => ({
                ...prev,
                [src.includes('back') ? 'back' : 'front']: true
              }));
            }
          });
      }
    }, []);

    useEffect(() => {
      setupVideo(backEntranceRef, BackEntrance);
      setupVideo(backLoopRef, BackLoop);
      setupVideo(frontEntranceRef, FrontEntrance);
      setupVideo(frontLoopRef, FrontLoop);
    }, [setupVideo]);    useEffect(() => {
      // Preload loop videos
      if (backLoopRef.current) {
        backLoopRef.current.load();
        backLoopRef.current.pause();
      }
      if (frontLoopRef.current) {
        frontLoopRef.current.load();
        frontLoopRef.current.pause();
      }

      const onBackEnd = () => {
        if (backLoopRef.current) {
          backLoopRef.current.currentTime = 0;
          const playPromise = backLoopRef.current.play();
          if (playPromise) {
            playPromise.then(() => setShowBackLoop(true)).catch(console.error);
          }
        }
      };

      const onFrontEnd = () => {
        if (frontLoopRef.current) {
          frontLoopRef.current.currentTime = 0;
          const playPromise = frontLoopRef.current.play();
          if (playPromise) {
            playPromise.then(() => setShowFrontLoop(true)).catch(console.error);
          }
        }
      };

      backEntranceRef.current?.addEventListener("ended", onBackEnd);
      frontEntranceRef.current?.addEventListener("ended", onFrontEnd);

      const timer = setTimeout(() => setLogoDone(true), 4500);
      return () => {
        backEntranceRef.current?.removeEventListener("ended", onBackEnd);
        frontEntranceRef.current?.removeEventListener("ended", onFrontEnd);
        clearTimeout(timer);
      };
    }, []);    useEffect(() => {
      if (entranceLoaded.back && entranceLoaded.front) {
        setVideoReady(true);
        // Start playing entrance videos when ready
        if (backEntranceRef.current) {
          backEntranceRef.current.play().catch(console.error);
        }
        if (frontEntranceRef.current) {
          frontEntranceRef.current.play().catch(console.error);
        }
      }
    }, [entranceLoaded]);

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
        onCanLeaveChange(true);
      }
    }, [isActive]);

    const videoClass =
      "absolute inset-0 w-full h-full object-fill pointer-events-none";

    return (
      <div className="relative w-full h-screen">
        <div className={`absolute inset-0 p-6 transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="relative w-full h-full overflow-hidden rounded-3xl bg-black shadow-[0_0_10px_2px_rgba(255,255,255,0.15)]">
            <div
              ref={ref}
              className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl"
            >
              <Suspense fallback={null}>
                <LazyBackgroundEmblem />
              </Suspense>
              <div className="absolute inset-0" style={{ perspective: 800 }}>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      ref={wrapperRef}
                      className="relative origin-center flex-none overflow-visible"
                    >
                      <div className="absolute inset-0 z-0">
                        <video
                          ref={backEntranceRef}
                          src={BackEntrance}
                          muted
                          autoPlay
                          playsInline
                          preload="auto"
                          onLoadedData={() =>
                            setEntranceLoaded(prev => ({ ...prev, back: true }))
                          }
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
                      </div>                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">                        <div className="flex items-center justify-center">
                          <Suspense fallback={null}>
                            <LogoSplash 
                              // Responsive splash text size
                              className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-bold text-white text-center drop-shadow-lg"
                              style={{
                                fontSize: isMobile ? 'clamp(2rem, 7vw, 3.5rem)' : 'clamp(3rem, 8vw, 6rem)'
                              }}
                            />
                          </Suspense>
                        </div>
                      </div>

                      <div className="absolute inset-0 z-30">
                        <video
                          ref={frontEntranceRef}
                          src={FrontEntrance}
                          muted
                          autoPlay
                          playsInline
                          preload="auto"
                          onLoadedData={() =>
                            setEntranceLoaded(prev => ({ ...prev, front: true }))
                          }
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

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-40 z-50 pointer-events-none">
                    <div className="relative w-[700px] h-[500px]">
                      <Suspense fallback={null}>
                        <LazyGlow color="black" />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsive scroll down button */}
              <div className="absolute bottom-18 left-1/2 -translate-x-1/2 z-50">
                {logoDone && (
                  <ScrollPrompt
                    onClick={goToNext}
                    className={isMobile ? 'w-14 h-14' : 'w-16 h-16'}
                    animateIn={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Home;
