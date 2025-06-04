import { motion } from "framer-motion";
import Glow from "./Glow";

export default function AnimatedBanner({
  text = "",
  direction = "right",
  className = "",
}) {
  const lines = text.split("\n");
  const variants = {
    hidden: {
      x: direction === "left" ? "-100%" : "100%",
    },
    visible: {
      x: 0,
    },
  };

  return (
    <motion.div
      className={`bg-black flex flex-col items-center justify-center relative px-20 py-24 rounded-3xl ${className}`}
      style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Glow color="white" />
      </div>
      <div className="relative z-10 text-center font-bold text-white whitespace-nowrap text-[3vw] leading-[1.1]">
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i !== lines.length - 1 && <br />}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
