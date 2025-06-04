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
    }, 2000);

    function loopPlay() {
      if (!video) return;
      video.pause();
      video.currentTime = 0;

      setTimeout(() => {
        setVisible(true);
        setTimeout(() => {
          video.playbackRate = 0.8;
          video.play();

          const onEnd = () => {
            setVisible(false);
            setTimeout(() => {
              loopPlay();
            }, 4000);
          };

          video.addEventListener("ended", onEnd, { once: true });
        }, 500);
      }, 100);
    }

    return () => initialDelay;
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-2000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center space-x-1">
        <video
          ref={videoRef}
          src={ScrollVideo}
          muted
          playsInline
          className="h-8 w-auto"
        />
        <span
          className="text-gray-400 text-md select-none"
        >
          Scroll
        </span>
      </div>
    </div>
  );
};

export default ScrollIndicator;