import { useState, useEffect } from "react";
import { breakpoints } from "../constants/breakpoints";

// Get sorted breakpoints for easier comparison
const breakpointEntries = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]);

function getBreakpoint(width) {
  let current = "sm";
  for (const [name, minWidth] of breakpointEntries) {
    if (width >= minWidth) current = name;
  }
  return current;
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const onResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Generate booleans for each breakpoint
  const isMobile = window.innerWidth < breakpoints.md;
  const isTablet = window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
  const isDesktop = window.innerWidth >= breakpoints.lg;

  return {
    breakpoint, // e.g., 'sm', 'md', 'lg', etc.
    isMobile,
    isTablet,
    isDesktop,
  };
}
