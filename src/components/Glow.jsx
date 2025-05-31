import React from "react";

export default function Glow({ color = "white" }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <svg
        width="700"
        height="500"
        viewBox="0 0 500 500"
        className="absolute blur-[90px] opacity-20 animate-slowGlow scale-x-125 scale-y-75"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M250 100C350 80 400 -50 460 60C520 170 320 440 200 480C80 520 100 300 40 200C-20 100 150 120 250 100Z"
          fill={color}
        />
      </svg>
      <svg
        width="500"
        height="350"
        viewBox="0 0 500 500"
        className="absolute blur-[70px] opacity-10 translate-x-12 translate-y-6 animate-slowGlowReverse scale-x-125 scale-y-75"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M250 100C350 80 400 -50 460 60C520 170 320 440 200 480C80 520 100 300 40 200C-20 100 150 120 250 100Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
