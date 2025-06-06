import { useState, useEffect } from "react";
import { breakpoints } from "../constants/breakpoints";

// Sort breakpoints once
const breakpointEntries = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]);

function getCurrentBreakpoint(width) {
  let current = "sm";
  for (const [name, minWidth] of breakpointEntries) {
    if (width >= minWidth) current = name;
  }
  return current;
}

export function useBreakpoint() {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const breakpoint = getCurrentBreakpoint(windowWidth);
  const isMobile = windowWidth < breakpoints.md;
  const isTablet = windowWidth >= breakpoints.md && windowWidth < breakpoints.lg;
  const isDesktop = windowWidth >= breakpoints.lg;

  return { breakpoint, isMobile, isTablet, isDesktop };
}
