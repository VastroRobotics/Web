"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Linkedin, Mail } from "lucide-react";

// Import images
import AlexImage from "../../assets/media/team/Alex.png";
import AndrewImage from "../../assets/media/team/Andrew.jpeg";
import InesImage from "../../assets/media/team/Ines.jpeg";
import JesalinaImage from "../../assets/media/team/Jesalina.jpeg";
import JoshImage from "../../assets/media/team/Josh.jpeg";
import LucasImage from "../../assets/media/team/Lucas.jpeg";
import RickImage from "../../assets/media/team/Rick.jpg";
import RyanImage from "../../assets/media/team/Ryan.jpeg";

const teamMembers = [
  {
    id: 1,
    name: "Jesalina Phan",
    role: "Co-Founder",
    image: JesalinaImage,
    linkedin: "#",
    email: "jesalina.p@vastro.org",
    bio: "Jesalina is a junior studying Computer Engineering and Entrepreneurship. With a knack for interfacing both software development and developing hardware & electrical systems, Jesalina works to ensure our solution has all of its power and electrical needs met.",
  },
  {
    id: 2,
    name: "Andrew Mombay",
    role: "Founder & CEO",
    image: AndrewImage,
    linkedin: "https://www.linkedin.com/in/andrew-mombay",
    email: "andrew.m@vastro.org",
    bio: "Andrew is a junior studying Mechanical Engineering and Business Economics. With an interest in start-ups, he assisted significantly in building the project from the ground up and scaling the venture to where it is today.",
  },
  {
    id: 3,
    name: "Josh Krakauer",
    role: "Design Lead",
    image: JoshImage,
    linkedin: "https://www.linkedin.com/in/josh-krakauer-b51a5523b",
    email: "josh.k@vastro.org",
    bio: "Josh is a current junior studying Mechanical Engineering. Josh’s aptitude for designing mechanical systems and utilizing his skills in CAD, Josh contributes significantly to our overall design to meet all users needs.",
  },
  {
    id: 4,
    name: "Lucas Kover Wolf",
    role: "Software",
    image: LucasImage,
    linkedin: "#",
    email: "lucas.k@vastro.org",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    name: "Ines Saltiel",
    role: "Head of R&D",
    image: InesImage,
    linkedin: "https://www.linkedin.com/in/ines-saltiel",
    email: "ines.s@vastro.org",
    bio: "Ines is a current freshman studying Design Engineering. With her skills as a researcher and communications, Ines delivers high-impact research to help the team continue to refine our hardware & software systems to bring our product to the market.",
  },
  {
    id: 6,
    name: "Alexander Thaep",
    role: "Software",
    image: AlexImage,
    linkedin: "#",
    email: "alexander.t@vastro.org",
    bio: "Alexander is a junior studying Applied Mathematics and Computer Science. Alexander’s work behind the scenes to develop our virtual-reality immersion software and implementation of haptic feedback controls has been key for our continued success in developing an immersive control system for our users.",
  },
  {
    id: 7,
    name: "Ryan Duong",
    role: "Software",
    image: RyanImage,
    linkedin: "https://www.linkedin.com/in/ryanduongct",
    email: "ryan.d@vastro.org",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 8,
    name: "Rick Fleeter",
    role: "Adviser",
    image: RickImage,
    linkedin: "https://it.linkedin.com/in/rick-fleeter-5272432a3",
    email: "rick.f@vastro.org",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];


export default function TeamCarousel() {
        const [activeIndex, setActiveIndex] = useState(1); // Default to 2nd on load
        const [rotationOffset, setRotationOffset] = useState(0);
        const [isRotating, setIsRotating] = useState(false);
        const [lastInteraction, setLastInteraction] = useState(Date.now());
        const [infoVisible, setInfoVisible] = useState(false);
        const carouselRef = useRef(null);

       useEffect(() => {
               const interval = setInterval(() => {
                       if (Date.now() - lastInteraction > 18000 && !isRotating) {
                               rotateCarousel();
                       }
               }, 8000);
               return () => clearInterval(interval);
       }, [lastInteraction, isRotating]);

       useEffect(() => {
               setInfoVisible(false);
               const timeout = setTimeout(() => setInfoVisible(true), 240);
               return () => clearTimeout(timeout);
       }, [activeIndex]);

       const rotateCarousel = () => {
               if (isRotating) return;
               setIsRotating(true);
               setRotationOffset((prev) => (prev + 4) % teamMembers.length);
               setActiveIndex(0); // Now default to first item on rotation
               setTimeout(() => {
                       setIsRotating(false);
               }, 500);
       };

	const getVisibleMembers = () => {
		const result = [];
		for (let i = 0; i < 5; i++) {
			const index = (rotationOffset + i) % teamMembers.length;
			result.push({
				...teamMembers[index],
				visibleIndex: i,
			});
		}
		return result;
	};

	const visibleMembers = getVisibleMembers();

        return (
                <div
                        className="relative w-full overflow-hidden h-[420px] sm:h-[480px] md:h-[520px] lg:h-[600px]"
                        onMouseMove={() => setLastInteraction(Date.now())}
                >
			<AnimatePresence mode="popLayout">
                                <div
                                        ref={carouselRef}
                                        className="flex justify-end gap-3 h-full w-full absolute"
                                >
					{visibleMembers.map((member, index) => {
						const isRightmost = index === 4;
						const isActive = index === activeIndex;

						return (
                                                        <motion.div
                                                                key={`${member.id}-${member.visibleIndex}`}
                                                                className="relative cursor-pointer h-full flex-none"
                                                                style={{
                                                                        zIndex: isActive ? 10 : 1,
                                                                        aspectRatio: isActive ? "150 / 600" : "60 / 550",
                                                                }}
								initial={{ opacity: 1, x: 50 }}
                                                                animate={{
                                                                        opacity: 1,
                                                                        x: 0,
                                                                        scale: isActive ? 1 : 0.8,
                                                                        marginLeft: isActive ? "8px" : "0px",
                                                                        marginRight: isActive ? "8px" : "0px",
                                                                }}
								exit={{ x: -50, opacity: 0 }}
                                                               transition={{
                                                                       duration: 0.6,
                                                                       ease: [0.23, 1, 0.32, 1],
                                                                       layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                                                               }}
								onMouseEnter={() =>
									!isRightmost && !isRotating && setActiveIndex(index)
								}
								layout
							>
								<div
									className={`w-full rounded-b-xl overflow-hidden h-full`}
								>
									<div className="relative w-full h-full">
                                                                                <motion.img
                                                                               src={member.image || "/placeholder.svg"}
                                                                               alt={member.name}
                                                                               className={`w-full h-full object-cover ${
                                                                               !isActive ? "filter grayscale" : ""
                                                                               }`}
                                                                               loading="lazy"
                                                                               animate={{ scale: isActive ? 1.12 : 1 }}
                                                                               transition={{ duration: 0.5, ease: "easeOut" }}
                                                                               />

										{/* Static black overlay with bouncing arrow */}
                                        {isRightmost && (
                                                <div
                                                        className="absolute inset-0 bg-black/70 flex items-center justify-center cursor-pointer z-10"
                                                        onClick={(e) => {
                                                        e.stopPropagation();
                                                        rotateCarousel();
                                                        setLastInteraction(Date.now());
                                                        }}
                                                >
                                                        <motion.div
                                                        initial={{ x: 0 }}
                                                        animate={{ x: [0, 8, 0, 8, 0] }}
                                                        transition={{
                                                        delay: 4.5,
                                                        duration: 1.5,
                                                        times: [0, 0.25, 0.5, 0.75, 1],
                                                        ease: "easeInOut",
                                                        repeat: Infinity,
                                                        repeatDelay: 2.5,
                                                        }}
                                                        >
                                                        <ChevronRight className="w-10 h-10 text-white" />
                                                        </motion.div>
                                                </div>
                                        )}

										{!isRightmost && (
                                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
										)}

										{!isActive && (
                                       <div className="absolute inset-0 flex items-end justify-center pb-20">
                                       <div className="rotate-[-90deg] origin-center whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
													{member.name.split(" ")[0]}
												</div>
											</div>
										)}

                                       {/* Info Box */}
                                        <motion.div
                                                className="absolute bottom-0 left-0 w-full aspect-[4/2] pointer-events-none overflow-hidden"
                                                initial="hidden"
                                                animate={isActive && infoVisible ? "visible" : "hidden"}
                                                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                                <div className="absolute inset-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent space-y-2 pointer-events-auto">
                                                        <h3 className="font-bold text-white whitespace-nowrap text-xl sm:text-2xl md:text-3xl lg:text-3xl">
                                                                {member.name}
                                                        </h3>
                                                        <div className="flex items-center font-semibold text-gray-200 space-x-2 text-sm sm:text-base md:text-lg lg:text-xl">
                                                                <span>{member.role}</span>
                                                                <div className="flex items-center space-x-1 pl-3 text-gray-400">
                                                                        <a
                                                                                href={member.email}
                                                                                aria-label="Email"
                                                                                className="p-1 text-gray-400 hover:text-white"
                                                                        >
                                                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                                                        </a>
                                                                        <a
                                                                                href={member.linkedin}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                aria-label="LinkedIn"
                                                                                className="p-1 text-gray-400 hover:text-white"
                                                                        >
                                                                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                                                        </a>
                                                                </div>
                                                        </div>
                                                        <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-400 whitespace-pre-line">
                                                                {member.bio}
                                                        </p>
                                                </div>
                                        </motion.div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</AnimatePresence>
		</div>
	);
}
