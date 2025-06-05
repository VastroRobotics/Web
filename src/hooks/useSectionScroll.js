import { useEffect, useRef } from "react";

export default function useSectionScroll({ activeIndex, goToSection, canLeave }) {
  const ref = useRef(null);
  const throttled = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = (e) => {
      if (throttled.current || !canLeave) return;
      const next = activeIndex + (e.deltaY > 0 ? 1 : -1);
      goToSection(activeIndex, next);
      throttled.current = true;
      setTimeout(() => {
        throttled.current = false;
      }, 800);
    };

    el.addEventListener("wheel", handle, { passive: false });
    return () => el.removeEventListener("wheel", handle);
  }, [activeIndex, goToSection, canLeave]);

  return ref;
}
