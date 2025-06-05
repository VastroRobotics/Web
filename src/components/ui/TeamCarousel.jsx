"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Linkedin, Mail } from "lucide-react";

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
    linkedin: "https://www.linkedin.com/in/jesalina-phan/",
    email: "j.phan@vastro.org",
    bio: "Jesalina is a junior studying Computer Engineering and Entrepreneurship. With a knack for interfacing both software development and developing hardware & electrical systems, Jesalina works to ensure our solution has all of its power and electrical needs met.",
  },
  {
    id: 2,
    name: "Andrew Mombay",
    role: "Founder & CEO",
    image: AndrewImage,
    linkedin: "https://www.linkedin.com/in/andrew-mombay",
    email: "a.mombay@vastro.org",
    bio: "Andrew is a junior studying Mechanical Engineering and Business Economics. With an interest in start-ups, he assisted significantly in building the project from the ground up and scaling the venture to where it is today.",
  },
  {
    id: 3,
    name: "Josh Krakauer",
    role: "Design Lead",
    image: JoshImage,
    linkedin: "https://www.linkedin.com/in/josh-krakauer-b51a5523b",
    email: "j.krakauer@vastro.org",
    bio: "Josh is a current junior studying Mechanical Engineering. Josh’s aptitude for designing mechanical systems and utilizing his skills in CAD, Josh contributes significantly to our overall design to meet all users needs.",
  },
  {
    id: 4,
    name: "Lucas Kover Wolf",
    role: "Software",
    image: LucasImage,
    linkedin: "https://www.linkedin.com/in/lucas-kover-wolf/",
    email: "info@vastro.org",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    name: "Ines Saltiel",
    role: "Head of R&D",
    image: InesImage,
    linkedin: "https://www.linkedin.com/in/ines-saltiel",
    email: "i.saltiel@vastro.org",
    bio: "Ines is a current freshman studying Design Engineering. With her skills as a researcher and communications, Ines delivers high-impact research to help the team continue to refine our hardware & software systems to bring our product to the market.",
  },
  {
    id: 6,
    name: "Alexander Thaep",
    role: "Software",
    image: AlexImage,
    email: "info@vastro.org",
    bio: "Alexander is a junior studying Applied Mathematics and Computer Science. Alexander’s work behind the scenes to develop our virtual-reality immersion software and implementation of haptic feedback controls has been key for our continued success in developing an immersive control system for our users.",
  },
  {
    id: 7,
    name: "Ryan Duong",
    role: "Software",
    image: RyanImage,
    linkedin: "https://www.linkedin.com/in/ryanduongct",
    email: "info@vastro.org",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 8,
    name: "Rick Fleeter",
    role: "Adviser",
    image: RickImage,
    linkedin: "https://it.linkedin.com/in/rick-fleeter-5272432a3",
    email: "info@vastro.org",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];


export default function TeamCarousel() {
        const [activeIndex, setActiveIndex] = useState(1); 
        const [rotationOffset, setRotationOffset] = useState(0);
        const [isRotating, setIsRotating] = useState(false);
        const [lastInteraction, setLastInteraction] = useState(Date.now());
        const [infoVisible, setInfoVisible] = useState(false);
        const [visibleCount, setVisibleCount] = useState(5);
        const [itemGap, setItemGap] = useState(12);
        const carouselRef = useRef(null);
        const [scaleFactor, setScaleFactor] = useState(1);
        const [containerHeight, setContainerHeight] = useState(600);
       
        const computeVisible = () => {

                const screenWidth = window.innerWidth - 48;
                const scale = screenWidth < 777 ? screenWidth/710 : 1;
                setScaleFactor(scale);
                console.log(scale)



                const open = 465 * scale;
                const closed = Math.max(30, 60 * scale);
                const minGap = 12 * scale;
                const maxGap = 18 * scale;

                const height = screenWidth < 777 ? Math.max(600, window.innerHeight) * 0.6 : 600;
                setContainerHeight(height);

                let width = screenWidth;
                let count = 1;
                let remaining = width - open;

                while (remaining >= closed + minGap && count < teamMembers.length) {
                count++;
                remaining -= closed + minGap;
                }

                let gap = Math.min(Math.max(minGap, minGap + remaining / Math.max(1, count - 1)), maxGap);

        return { count, gap };
        };
        const rotateCarousel = useCallback(() => {
                // Don't rotate if carousel already animating or all members are visible
                if (isRotating || visibleCount >= teamMembers.length) return;
                setIsRotating(true);
                // Advance by the number of visible cards so each "page" of members is unique
                setRotationOffset(
                        (prev) => (prev + visibleCount) % teamMembers.length
                );
                setActiveIndex(0); // Default to first item on rotation
                setTimeout(() => {
                        setIsRotating(false);
                }, 500);
       }, [isRotating, visibleCount]);


       useEffect(() => {
               const update = () => {
                       const { count, gap } = computeVisible();
                       setVisibleCount(count);
                       setItemGap(gap);
                       setActiveIndex(count > 1 ? Math.floor((count + 1) / 2) : 0);
               };
               update();
               window.addEventListener('resize', update);
               return () => window.removeEventListener('resize', update);
       }, []);

       useEffect(() => {
               const interval = setInterval(() => {
                       if (
                               Date.now() - lastInteraction > 18000 &&
                               !isRotating &&
                               visibleCount < teamMembers.length
                       ) {
                               rotateCarousel();
                       }
               }, 8000);
               return () => clearInterval(interval);
       }, [lastInteraction, isRotating, rotateCarousel, visibleCount]);

       useEffect(() => {
               setInfoVisible(false);
               const timeout = setTimeout(() => setInfoVisible(true), 240);
               return () => clearTimeout(timeout);
       }, [activeIndex]);
       const getVisibleMembers = () => {
                const result = [];
                for (let i = 0; i < visibleCount; i++) {
                        const index = (rotationOffset + i) % teamMembers.length;
                        result.push({
                                ...teamMembers[index],
                                visibleIndex: i,
                        });
                }
                return result;
        };

        const visibleMembers = getVisibleMembers();
        const itemHeightInactive = containerHeight - 50 * scaleFactor;

        return (
                <div
                        className="flex justify-center w-full overflow-hidden"
                        style={{ height: `${containerHeight}px` }}
                        onMouseMove={() => setLastInteraction(Date.now())}
                >
			<AnimatePresence mode="popLayout">
                                <div
                                        ref={carouselRef}
                                        className="flex w-fit"
                                        style={{ gap: `${itemGap}px`, height: `${itemHeightInactive}px` }}
                                >
                                        {visibleMembers.map((member, index) => {
                                                const isRightmost = visibleCount < teamMembers.length && index === visibleCount - 1;
                                                const isActive = index === activeIndex;

                                                return (
                                                        <Motion.div
                                                                key={`${member.id}-${member.visibleIndex}`}
                                                                className="relative cursor-pointer"
                                                                style={{
                                                                        zIndex: isActive ? 10 : 1,
                                                                        height: `${isActive ? containerHeight : itemHeightInactive}px`,
                                                                }}
                                                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                                                animate={{
                                                                        opacity: 1,
                                                                        y: 0,
                                                                        scale: 1,
                                                                        width: `${isActive ? 465 * scaleFactor : 60 * scaleFactor}px`,
                                                                        flex: "0 0 auto",
                                                                        marginLeft: isActive ? `${8 * scaleFactor}px` : "0px",
                                                                        marginRight: isActive ? `${8 * scaleFactor}px` : "0px",
                                                                }}
                                                                exit={{ opacity: 0, y: -40 }}
                                                               transition={{
                                                                       duration: 0.6,
                                                                       ease: [0.23, 1, 0.32, 1],
                                                                       delay: index * 0.08,
                                                                       layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                                                               }}
								onMouseEnter={() =>
									!isRightmost && !isRotating && setActiveIndex(index)
								}
								layout
							>
                                                                <div
                                                                        className="w-full overflow-hidden h-full"
                                                                        style={{
                                                                                borderRadius: `${Math.max(6, 12 * scaleFactor)}px`,
                                                                        }}
                                                                >
									<div className="relative w-full h-full">
<Motion.img
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
                                                        <Motion.div
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
                                                        <ChevronRight className="text-white" style={{ width: `${40 * scaleFactor}px`, height: `${40 * scaleFactor}px` }} />
                                                        </Motion.div>
                                                </div>
                                        )}

										{!isRightmost && (
                                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
										)}

										{!isActive && (
                                                                               <div className="absolute inset-0 flex items-end justify-center" style={{ paddingBottom: `${80 * scaleFactor}px` }}>
                                                                               <div className="rotate-[-90deg] origin-center whitespace-nowrap font-bold text-white tracking-wide" style={{ fontSize: `${30 * scaleFactor}px` }}>
                                                                               {member.name.split(" ")[0]}
                                                                               </div>
                                                                               </div>
										)}

                                       {/* Info Box */}
                                        <Motion.div
                                                className={`absolute bottom-0 left-0 w-full h-[clamp(80px,30vh,250px)] pointer-events-none overflow-hidden`}
                                                initial="hidden"
                                                animate={isActive && infoVisible ? "visible" : "hidden"}
                                                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                                <div
                                                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/50 to-transparent pointer-events-auto flex flex-col justify-end"
                                                        style={{ padding: `${24 * scaleFactor}px`, gap: `${8 * scaleFactor}px` }}
                                                >
                                                        <h3 className="font-bold text-white whitespace-nowrap text-[clamp(15px,3.4vw,24px)]">
                                                                {member.name}
                                                        </h3>
                                                        <div
                                                                className="flex items-center font-semibold text-gray-200 text-[clamp(12.5px,2.6vw,18px)]"
                                                                style={{gap: `${Math.max(4, 8 * scaleFactor)}px` }}
                                                        >
                                                                <span>{member.role}</span>
                                                                <div
                                                                        className="flex items-center text-gray-400"
                                                                        style={{ paddingLeft: `${Math.max(6, 12 * scaleFactor)}px`, gap: `${Math.max(2, 4 * scaleFactor)}px` }}
                                                                >
                                                                        <a
                                                                        href={member.email}
                                                                        aria-label="Email"
                                                                        className="text-gray-400 hover:text-white"
                                                                        style={{ padding: `${4 * scaleFactor}px` }}
                                                                        >
                                                                        <Mail className="text-gray-400" style={{ width: `${Math.max(15, 20 * scaleFactor)}px`, height: `${20 * scaleFactor}px` }} />
                                                                        </a>
                                                                        <a
                                                                        href={member.linkedin}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        aria-label="LinkedIn"
                                                                        className="text-gray-400 hover:text-white"
                                                                        style={{ padding: `${4 * scaleFactor}px` }}
                                                                        >
                                                                        <Linkedin className="text-gray-400" style={{ width: `${Math.max(15, 20 * scaleFactor)}px`, height: `${20 * scaleFactor}px` }} />
                                                                        </a>
                                                                </div>
                                                        </div>
                                                        <p
                                                        className={`text-gray-400 whitespace-pre-line text-[clamp(11px,2.3vw,16px)]`}
                                                        >
                                                                {member.bio}
                                                        </p>
                                                </div>
</Motion.div>
									</div>
								</div>
                                        </Motion.div>
						);
					})}
				</div>
			</AnimatePresence>
		</div>
	);
}
