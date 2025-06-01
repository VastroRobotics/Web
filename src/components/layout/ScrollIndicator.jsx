import { useEffect, useRef, useState } from "react";
import ScrollVideo from "../../assets/animations/scroll.webm";

const ScrollIndicator = () => {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(true); // control visibility based on screen shape

  useEffect(() => {
    const checkScreenShape = () => {
      setShow(window.innerWidth >= window.innerHeight);
    };

    checkScreenShape();
    window.addEventListener("resize", checkScreenShape);
    return () => window.removeEventListener("resize", checkScreenShape);
  }, []);

  useEffect(() => {
    if (!show) return;
    const video = videoRef.current;
    const initialDelay = setTimeout(() => {
      loopPlay();
    }, 10000); // Start after 10s

    function loopPlay() {
      if (!video) return;
      video.pause();
      video.currentTime = 0;

      setTimeout(() => {
        setVisible(true);
        setTimeout(() => {
          video.playbackRate = 0.5;
          video.play();

          const onEnd = () => {
            setVisible(false);
            setTimeout(() => {
              loopPlay();
            }, 2000);
          };

          video.addEventListener("ended", onEnd, { once: true });
        }, 500);
      }, 100);
    }

    return () => clearTimeout(initialDelay);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center space-x-2">
        <video
          ref={videoRef}
          src={ScrollVideo}
          muted
          playsInline
          className="w-12 h-auto"
        />
        <span className="text-white text-sm tracking-widest select-none">
          Scroll
        </span>
      </div>
    </div>
  );
};

export default ScrollIndicator;