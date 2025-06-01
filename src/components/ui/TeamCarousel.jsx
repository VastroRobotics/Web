"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

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
		role: "Frontend Developer",
		image: AlexImage,
		bio: "Alex specializes in creating intuitive user interfaces with React and Next.js.",
	},
	{
		id: 2,
		name: "Andrew",
		role: "Backend Developer",
		image: AndrewImage,
		bio: "Andrew is focused on building scalable backend systems.",
	},
	{
		id: 3,
		name: "Ines",
		role: "UX Designer",
		image: InesImage,
		bio: "Ines is passionate about user-centric design, focusing on usability and accessibility.",
	},
	{
		id: 4,
		name: "Jesalina",
		role: "Full Stack Developer",
		image: JesalinaImage,
		bio: "Jesalina bridges frontend and backend, working on end-to-end solutions.",
	},
	{
		id: 5,
		name: "Josh",
		role: "Project Manager",
		image: JoshImage,
		bio: "Josh coordinates team efforts, ensuring smooth project\ndelivery and milestones.",
	},
	{
		id: 6,
		name: "Lucas",
		role: "Data Scientist",
		image: LucasImage,
		bio: "Lucas analyzes complex data to derive insights for strategic decision-making.",
	},
	{
		id: 7,
		name: "Rick",
		role: "DevOps Engineer",
		image: RickImage,
		bio: "Rick manages infrastructure and automates deployment pipelines.",
	},
	{
		id: 8,
		name: "Ryan",
		role: "Product Strategist",
		image: RyanImage,
		bio: "Ryan shapes product roadmaps and identifies opportunities for growth.",
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
		setTimeout(() => {
			setRotationOffset((prev) => (prev + 4) % teamMembers.length);
			setActiveIndex(0); // Now default to first item on rotation
			setIsRotating(false);
		}, 400);
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
									duration: 0.5,
									ease: [0.23, 1, 0.32, 1],
									layout: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
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
										<img
											src={member.image || "/placeholder.svg"}
											alt={member.name}
											className={`w-full h-full object-cover ${
												!isActive ? "filter grayscale" : ""
											}`}
											loading="lazy"
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
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
										)}

										{!isActive && (
											<div className="absolute inset-0 flex items-end justify-center pb-20">
												<div className="rotate-[-90deg] origin-center whitespace-nowrap text-3xl font-bold text-white tracking-wide">
													{member.name}
												</div>
											</div>
										)}

										{/* Text Box (fixed size) */}
										<AnimatePresence>
											{isActive && (
												<motion.div
													className="absolute bottom-0 left-0 p-6 w-full h-[160px] overflow-hidden"
													initial={{ opacity: 0, y: 30 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: 30 }}
													transition={{ duration: 0.3, ease: "easeOut" }}
												>
													<motion.div
														className="flex flex-col justify-between h-full"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														exit={{ opacity: 0, y: 20 }}
														transition={{ duration: 0.3, ease: "easeOut" }}
													>
														<h3 className="text-3xl font-bold text-white">
															{member.name}
														</h3>
														<p className="text-xl font-semibold text-gray-200">
															{member.role}
														</p>
														<p className="text-base text-gray-400">
															{member.bio}
														</p>
													</motion.div>
												</motion.div>
											)}
										</AnimatePresence>
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
