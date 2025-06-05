import { useEffect, useRef } from "react";

export default function useEdgeSectionScroll({ activeIndex, goToSection, atStart, atEnd }) {
  const ref = useRef(null);
  const throttled = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = (e) => {
      if (throttled.current) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      if (dir > 0 && atEnd) {
        e.preventDefault();
        goToSection(activeIndex, activeIndex + 1);
      } else if (dir < 0 && atStart) {
        e.preventDefault();
        goToSection(activeIndex, activeIndex - 1);
      } else {
        return;
      }
      throttled.current = true;
      setTimeout(() => {
        throttled.current = false;
      }, 800);
    };

    el.addEventListener("wheel", handle, { passive: false });
    return () => el.removeEventListener("wheel", handle);
  }, [activeIndex, goToSection, atStart, atEnd]);

  return ref;
}
