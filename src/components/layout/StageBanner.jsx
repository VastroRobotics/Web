"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Glow from "../ui/Glow";

export default function StageBanner({
  direction = 0,
  header,
  text,
  start = 0,
  end = 100,
  thickness = 50,
  show,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const lenKey = isMobile ? "height" : "width";
  const crossKey = isMobile ? "width" : "height";
  const variants = {
    hidden: {
      x: direction === 0 ? -200 : 200,
      opacity: 0,
      [lenKey]: `${start}%`,
      [crossKey]: `${thickness}%`,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    visible: {
      x: 0,
      opacity: 1,
      [lenKey]: `${end}%`,
      [crossKey]: `${thickness}%`,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const style = isMobile
    ? {
        [crossKey]: `${thickness}%`,
        left: direction === 0 ? 0 : "auto",
        right: direction === 1 ? 0 : "auto",
        top: 0,
      }
    : {
        [crossKey]: `${thickness}%`,
        top: "50%",
        transform: "translateY(-50%)",
        left: direction === 0 ? 0 : "auto",
        right: direction === 1 ? 0 : "auto",
        minWidth: "80vw"
      };

  return (
    <motion.div
      className={`absolute flex items-center justify-center bg-black text-white font-bold px-6 overflow-hidden my-6 ${
        direction === 0 ? "rounded-r-3xl" : "rounded-l-3xl"
      }`}
      style={{ ...style, boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)" }}
      variants={variants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Glow color="black" />
      </div>
      <div mission-text-box="absolute inset-0 flex flex-col items-center justify-center px-6 ">
        <span className="relative mb-5 text-left whitespace-normal leading-tight text-lg md:text-4xl font-bold block max-w-full">
          {header}
        </span>
        <span className="relative z-10 mt-5 text-left whitespace-normal leading-tight text-lg md:text-2xl font-thin block max-w-ful">
          {text}
        </span>
      </div>
    </motion.div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import Glow from "../ui/Glow";

// export default function StageBanner({
//   direction = 0,
//   header,
//   text,
//   start = 0,
//   end = 100,
//   thickness = 50,
//   show,
// }) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const update = () => setIsMobile(window.innerWidth < 768);
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   const lenKey = isMobile ? "height" : "width";
//   const crossKey = isMobile ? "width" : "height";
//   const variants = {
//     hidden: {
//       x: direction === 0 ? -200 : 200,
//       opacity: 0,
//       [lenKey]: `${start}%`,
//       [crossKey]: `${thickness}%`,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//     visible: {
//       x: 0,
//       opacity: 1,
//       [lenKey]: `${end}%`,
//       [crossKey]: `${thickness}%`,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };

//   const style = isMobile
//     ? {
//         [crossKey]: `${thickness}%`,
//         left: direction === 0 ? 0 : "auto",
//         right: direction === 1 ? 0 : "auto",
//         top: 0,
//       }
//     : {
//         [crossKey]: `${thickness}%`,
//         top: "50%",
//         transform: "translateY(-50%)",
//         left: direction === 0 ? 0 : "auto",
//         right: direction === 1 ? 0 : "auto",
//       };

//   return (
//     <motion.div
//       className={`absolute flex items-center justify-center bg-black text-white font-bold px-6 overflow-hidden my-6 border-1 border-white ${
//         direction === 0 ? "rounded-r-3xl" : "rounded-l-3xl"
//       }`}
//       style={{ ...style, boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)" }}
//       variants={variants}
//       initial="hidden"
//       animate={show ? "visible" : "hidden"}
//     >
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <Glow color="black" />
//       </div>
//       <div mission-text-box="absolute inset-0 flex flex-col items-center justify-center px-6 ">
//         <span h1="relative z-10 mb-5 text-center whitespace-nowrap leading-tight text-5xl md:text-6xl font-extrabold block max-w-full">
//           {header}
//         </span>
//         <span className="relative z-10 mt-5 text-center whitespace-nowrap leading-tight text-lg md:text-2xl font-medium block max-w-full">
//           {text}
//         </span>
//       </div>
//     </motion.div>
//   );
// }
