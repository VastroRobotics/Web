import { useEffect, useRef } from "react";

export default function useScrollNavigation({
  isActive = true,
  currPage = 0,
  canScroll = true,
  throttleDuration = 800,
  allowHorizontal = true,
  onScroll,
}) {
  const isThrottled = useRef(false);
  const touchStart = useRef({ x: null, y: null });
  const alwaysCanLeavePages = [0, 2, 4]; // e.g., Home (0), Team (2), Footer (4)

  useEffect(() => {
    if (!isActive) return;
    if (alwaysCanLeavePages.includes(currPage)) {
        console.log("============ Forced Scroll in scrollNav")
        canScroll = true;
    }
    console.log("If just forced, should be " + canScroll);

    const triggerScroll = (direction) => {
      if (!canScroll || isThrottled.current) return;
      isThrottled.current = true;
      onScroll(direction);
      setTimeout(() => {
        isThrottled.current = false;
      }, throttleDuration);
    };

    const handleWheel = (e) => {
      const direction = e.deltaY > 0 ? "down" : "up";
      e.preventDefault();
      triggerScroll(direction);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e) => {
        console.log("000000000000000000000000000000000000000")
      const touch = e.changedTouches[0];
      const dx = touchStart.current.x - touch.clientX;
      const dy = touchStart.current.y - touch.clientY;

      if (Math.abs(dx) < 50 && Math.abs(dy) < 50) return;

      let direction;
      if (Math.abs(dy) > Math.abs(dx)) {
        direction = dy > 0 ? "down" : "up";
      } else if (allowHorizontal) {
        direction = dx > 0 ? "down" : "up"; // swipe left = down
      }

      if (direction) triggerScroll(direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isActive, canScroll, onScroll, throttleDuration, allowHorizontal]);
}
