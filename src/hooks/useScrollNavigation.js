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

  const canScrollRef = useRef(canScroll);
  const onScrollRef = useRef(onScroll);
  
  const alwaysCanLeavePages = [0, 2, 4];
  const shouldForceScroll = alwaysCanLeavePages.includes(currPage);

  useEffect(() => {
    canScrollRef.current = canScroll;
    onScrollRef.current = onScroll;
  }, [canScroll, onScroll]);


  useEffect(() => {
    if (!isActive) return;

    const triggerScroll = (direction) => {
      if ((!shouldForceScroll && !canScrollRef.current) || isThrottled.current)
        return;
      isThrottled.current = true;
      console.log('Throttling')
      onScrollRef.current?.(direction);
      setTimeout(() => {
        isThrottled.current = false;
        console.log("Unthrottled")
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
      const touch = e.changedTouches[0];
      const dx = touchStart.current.x - touch.clientX;
      const dy = touchStart.current.y - touch.clientY;

      if (Math.abs(dx) < 50 && Math.abs(dy) < 50) return;

      let direction;
      if (Math.abs(dy) > Math.abs(dx)) {
        direction = dy > 0 ? "down" : "up";
      } else if (allowHorizontal) {
        direction = dx > 0 ? "down" : "up";
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
  }, [isActive, currPage, allowHorizontal, throttleDuration]);
}
