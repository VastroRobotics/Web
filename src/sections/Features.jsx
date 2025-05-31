"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SpecificationItem {
  label: string
  value: string
}

interface PageContent {
  title: string
  description: string
  specifications: SpecificationItem[]
}

export default function StarshipPage() {
  const pages: PageContent[] = [
    {
      title: "STARSHIP",
      description:
        "Starship is the fully reusable spacecraft and second stage of the Starship system. The vehicle comes in several different configurations, offers an integrated payload section and is capable of carrying crew and cargo to Earth orbit, the Moon, Mars and beyond. Starship is also capable of point-to-point transport on Earth, enabling travel to anywhere in the world in one hour or less.",
      specifications: [
        { label: "HEIGHT", value: "52 m / 171 ft" },
        { label: "DIAMETER", value: "9 m / 29.5 ft" },
        { label: "PROPELLANT CAPACITY", value: "1,500 t / 3.3 Mlb" },
        { label: "THRUST", value: "1,500 tf / 3.3Mlbf" },
        { label: "PAYLOAD CAPACITY", value: "100 - 150 t" },
      ],
    },
    {
      title: "SUPER HEAVY",
      description:
        "Super Heavy is the first stage, or booster, of the Starship system. After launching Starship, Super Heavy returns to Earth and lands near the launch site or on offshore platforms for rapid reuse.",
      specifications: [
        { label: "HEIGHT", value: "69 m / 226 ft" },
        { label: "DIAMETER", value: "9 m / 29.5 ft" },
        { label: "PROPELLANT CAPACITY", value: "3,400 t / 7.5 Mlb" },
        { label: "THRUST", value: "7,590 tf / 16.7 Mlbf" },
      ],
    },
    {
      title: "RAPTOR ENGINE",
      description:
        "Raptor is a reusable methalox staged-combustion engine that powers the Starship system. Multiple Raptor engines at the base of both the Super Heavy booster and Starship vehicle provide thrust for liftoff and flight.",
      specifications: [
        { label: "PROPELLANT", value: "Liquid Oxygen & Liquid Methane" },
        { label: "THRUST (SEA LEVEL)", value: "185 tf / 410 klbf" },
        { label: "THRUST (VACUUM)", value: "200 tf / 440 klbf" },
        { label: "SPECIFIC IMPULSE", value: "330s (sea level) / 350s (vacuum)" },
      ],
    },
    {
      title: "STARBASE",
      description:
        "Starbase is SpaceX's launch site and production facility located at Boca Chica, Texas. This is where Starship prototypes are built, tested, and launched for orbital test flights.",
      specifications: [
        { label: "LOCATION", value: "Boca Chica, Texas" },
        { label: "FACILITIES", value: "Production, Testing, Launch" },
        { label: "LAUNCH MOUNT HEIGHT", value: "146 m / 479 ft" },
        { label: "ORBITAL LAUNCH ATTEMPTS", value: "Multiple since 2023" },
      ],
    },
  ]

  const [currentPage, setCurrentPage] = useState(0)

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length)
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length)
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="space-y-12 md:space-y-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">{pages[currentPage].title}</h1>

          <p className="text-base md:text-lg leading-relaxed max-w-2xl">{pages[currentPage].description}</p>

          <div className="space-y-4">
            {pages[currentPage].specifications.map((spec, index) => (
              <div key={index} className="border-b border-gray-800 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{spec.label}</span>
                  <span className="text-right font-medium">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8 flex justify-between items-center px-4 md:px-8">
        <button
          onClick={goToPrevPage}
          className="p-2 hover:bg-gray-900 rounded-full transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="flex space-x-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-2 h-2 rounded-full ${currentPage === index ? "bg-white" : "bg-gray-700"}`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNextPage}
          className="p-2 hover:bg-gray-900 rounded-full transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}
