"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Linkedin } from "lucide-react";

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
                name: "Alex",
                role: "Software",
                image: AlexImage,
                linkedin: "#",
                bio: "Alexander is a junior studying Applied Mathematics and Computer Science. Alexander’s work behind the scenes to develop our virtual-reality immersion software and implementation of haptic feedback controls has been key for our continued success in developing an immersive control system for our users.",
        },
        {
                id: 2,
                name: "Andrew",
                role: "Founder & CEO",
                image: AndrewImage,
                linkedin: "#",
                bio: "Andrew is a junior studying Mechanical Engineering and Business Economics. With an interest in start-ups, he assisted significantly in building the project from the ground up and scaling the venture to where it is today.",
        },
        {
                id: 3,
                name: "Ines",
                role: "Head of R&D",
                image: InesImage,
                linkedin: "#",
                bio: "Ines is a current freshman studying Design Engineering. With her skills as a researcher and communications, Ines delivers high-impact research to help the team continue to refine our hardware & software systems to bring our product to the market.",
        },
        {
                id: 4,
                name: "Jesalina",
                role: "Co-Founder",
                image: JesalinaImage,
                linkedin: "#",
                bio: "Jesalina is a junior studying Computer Engineering and Entrepreneurship. With a knack for interfacing both software development and developing hardware & electrical systems, Jesalina works to ensure our solution has all of its power and electrical needs met.",
        },
        {
                id: 5,
                name: "Josh",
                role: "Design Lead",
                image: JoshImage,
                linkedin: "#",
                bio: "Josh is a current junior studying Mechanical Engineering. Josh’s aptitude for designing mechanical systems and utilizing his skills in CAD, Josh contributes significantly to our overall design to meet all users needs.",
        },
        {
                id: 6,
                name: "Lucas",
                role: "Software",
                image: LucasImage,
                linkedin: "#",
                bio: "Placeholder.",
        },
        {
                id: 7,
                name: "Rick",
                role: "Adviser",
                image: RickImage,
                linkedin: "#",
                bio: "Placeholder.",
        },
        {
                id: 8,
                name: "Ryan",
                role: "Software",
                image: RyanImage,
                linkedin: "#",
                bio: "Placeholder.",
        },
];

export default function TeamCarousel() {
	const [activeIndex, setActiveIndex] = useState(1); // Default to 2nd on load
	const [rotationOffset, setRotationOffset] = useState(0);
	const [isRotating, setIsRotating] = useState(false);
	const [lastInteraction, setLastInteraction] = useState(Date.now());
	const carouselRef = useRef(null);

	useEffect(() => {
		const interval = setInterval(() => {
			if (Date.now() - lastInteraction > 18000 && !isRotating) {
				rotateCarousel();
			}
		}, 8000);
		return () => clearInterval(interval);
	}, [lastInteraction, isRotating]);

       const rotateCarousel = () => {
               if (isRotating) return;
               setIsRotating(true);
               setRotationOffset((prev) => (prev + 4) % teamMembers.length);
               setActiveIndex(0); // Now default to first item on rotation
               setTimeout(() => {
                       setIsRotating(false);
               }, 1000);
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
			className="relative h-[600px] w-full overflow-hidden"
			onMouseMove={() => setLastInteraction(Date.now())}
		>
			<AnimatePresence mode="popLayout">
				<div
					ref={carouselRef}
					className="flex justify-end gap-3 h-[550px] w-full absolute"
				>
					{visibleMembers.map((member, index) => {
						const isRightmost = index === 4;
						const isActive = index === activeIndex;

						return (
							<motion.div
								key={`${member.id}-${member.visibleIndex}`}
								className={`relative cursor-pointer ${
									isActive ? "h-[600px]" : "h-[550px]"
								}`}
								style={{
									zIndex: isActive ? 10 : 1,
								}}
								initial={{ opacity: 1, x: 50 }}
								animate={{
									opacity: 1,
									x: 0,
									flex: isActive ? "1 0 150px" : "0 0 60px",
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
                                                                               animate={{ scale: isActive ? 1.05 : 1 }}
                                                                               transition={{ duration: 0.4, ease: "easeOut" }}
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
												<div className="rotate-[-90deg] origin-center whitespace-nowrap text-3xl font-bold text-white tracking-wide">
													{member.name}
												</div>
											</div>
										)}

                                       {/* Text Box */}
                                        <motion.div
                                                className="absolute bottom-0 left-0 p-6 w-full pointer-events-none bg-gradient-to-t from-black/90 via-black/70 to-transparent"
                                                initial={false}
                                                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                                <div className="flex flex-col space-y-2">
                                                        <h3 className="text-3xl font-bold text-white">
                                                                {member.name}
                                                        </h3>
                                                        <div className="flex items-center text-xl font-semibold text-gray-200 space-x-2">
                                                                <span>{member.role}</span>
                                                                <a
                                                                        href={member.linkedin}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        aria-label="LinkedIn"
                                                                        className="hover:text-white p-1"
                                                                >
                                                                        <Linkedin className="w-5 h-5 ml-1" />
                                                                </a>
                                                        </div>
                                                        <p className="text-base text-gray-400">
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
