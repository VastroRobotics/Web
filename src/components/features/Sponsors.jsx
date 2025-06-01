import React from "react";
import sponsor1 from "../assets/images/sponsors/sponsor1.png";
import sponsor2 from "../assets/images/sponsors/sponsor2.png";
import sponsor3 from "../assets/images/sponsors/sponsor3.png";
import sponsor4 from "../assets/images/sponsors/sponsor4.png";

export default function SponsorSection() {
  const sponsors = [sponsor1, sponsor2, sponsor3, sponsor4];

  return (
    <section className="relative w-full">
      <div className="relative w-full flex flex-col justify-center py-12 px-12">
        <h1 className="text-3xl font-bold">Supporters</h1>
        <p className="text-base max-w-2xl mb-12">
          Vastro is proudly supported by a network of innovative partners and organizations
          who believe in our vision. Their backing helps us push boundaries, create impact,
          and build the future of robotics and AI.
        </p>
        <div className="w-full flex justify-center">
          <div className="w-[75%] flex justify-between items-center flex-wrap gap-y-12">
            {sponsors.slice(0, 3).map((src, index) => (
              <div key={index} className="flex justify-center w-1/4">
                <img
                  src={src}
                  alt={`Sponsor ${index + 1}`}
                  className="h-48 w-auto object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
