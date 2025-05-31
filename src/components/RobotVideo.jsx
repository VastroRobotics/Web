import { useRef, useEffect, useState } from "react";
import Entrance from "../assets/robot_entrance.webm";
import Ambient from "../assets/robot_loop_only.webm";

const RobotVideo = () => {
  const entranceRef = useRef(null);
  const loopRef = useRef(null);
  const [showLoop, setShowLoop] = useState(false);

  useEffect(() => {
    const entrance = entranceRef.current;
    const loop = loopRef.current;

    if (entrance) {
      entrance.play();
      entrance.addEventListener("ended", () => {
        setShowLoop(true);
        if (loop) {
          loop.currentTime = 0;
          loop.play();
        }
      });
    }
    return () => {
      entrance?.removeEventListener("ended", () => {});
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {!showLoop && (
        <video
          ref={entranceRef}
          src={Entrance}
          muted
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {showLoop && (
        <video
          ref={loopRef}
          src={Ambient}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default RobotVideo;