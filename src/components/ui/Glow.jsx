import React from "react";

/**
 * A lightweight, blurred glow based on a radial gradient.
 * Width/height can be a number (pixels) or any valid CSS size string.
 * Shape options:
 *  - "circle" (default)
 *  - "oval" (uses the provided width/height as an ellipse)
 *  - "rect" (no border radius)
 */
export default function Glow({
  color = "rgba(255,255,255,0.5)",
  width = 700,
  height = 500,
  shape = "circle",
  radius = 0,
  blur = 60,
  stop = "60%",
  className = "",
}) {
  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    background: `radial-gradient(circle, ${color} 0%, transparent ${stop})`,
    filter: `blur(${blur}px)`,
    borderRadius:
      shape === "circle"
        ? "50%"
        : shape === "oval"
        ? "50% / 60%"
        : typeof radius === "number"
        ? `${radius}px`
        : radius,
  };

  return (
    <div className={`pointer-events-none subtle-glow ${className}`} style={style} />
  );
}
