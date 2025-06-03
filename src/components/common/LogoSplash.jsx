import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Logo from "../../assets/branding/text_only_white.svg"; // Adjust path as needed

const LogoSplash = () => {
  const controls = useAnimation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sequence = async () => {
        await controls.start({
          opacity: [0, 1, 0.1, 0.9, 0.3, 1, 0.4, 1],
          filter: [
            "brightness(0.1) blur(5px) saturate(0.2)",
            "brightness(2) blur(2px) saturate(2)",
            "brightness(0.4) blur(4px) saturate(0.5)",
            "brightness(1.8) blur(0px) saturate(1.5)",
            "brightness(0.7) blur(3px) saturate(0.8)",
            "brightness(2.2) blur(1px) saturate(2)",
            "brightness(0.5) blur(4px) saturate(0.7)",
            "brightness(1.3) blur(0.5px) saturate(1.2)",
          ],
          transition: {
            duration: 3.2,
            ease: "easeInOut",
            times: [0, 0.1, 0.25, 0.4, 0.6, 0.75, 0.9, 1],
          },
        });

        controls.start({
          opacity: 1,
          filter:
            "brightness(1.4) drop-shadow(0 0 25px rgba(255,255,255,0.5)) drop-shadow(0 0 50px rgba(255,255,255,0.25)) saturate(1.1)",
          transition: { duration: 0.6, ease: "easeOut" },
        });
      };

      sequence();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [controls]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.img
        src={Logo}
        alt="Startup Logo"
        animate={controls}
        initial={{ opacity: 0, filter: "brightness(0) blur(6px) saturate(0)" }}
        className="w-[100vw] lg:w-[80vw] xl:w-[60vw] mx-auto"
      />
    </div>
  );
};

export default LogoSplash;
