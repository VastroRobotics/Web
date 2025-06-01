import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import logoUrl from "../../assets/branding/vastro_full_logo.svg";
import glowLeft from "../../assets/effects/glow_left.png";
import glowRight from "../../assets/effects/glow_right.png";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white py-32 overflow-hidden">
      {/* Textured bottom corner glows */}
      <img
        src={glowLeft}
        alt="Bottom left glow"
        className="absolute bottom-0 left-0 w-80 h-80 object-contain opacity-20 pointer-events-none select-none"
      />
      <img
        src={glowRight}
        alt="Bottom right glow"
        className="absolute bottom-0 right-0 w-80 h-80 object-contain opacity-20 pointer-events-none select-none"
      />

      {/* Logo and email */}
      <div className="container mx-auto flex flex-col items-center justify-center relative z-10 mt-12">
        <img src={logoUrl} alt="Vastro logo" className="mb-2 h-16 w-auto" />
        <p className="text-sm">info@vastro.org</p>
      </div>

      {/* Website credit */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-xs opacity-70 z-10">
        Website by Lucas Kover Wolf
      </div>

      {/* Social bar */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="flex space-x-4 bg-gray-800 bg-opacity-75 rounded-full px-4 py-2 items-center">
          <a href="https://instagram.com/vastro" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://linkedin.com/company/vastro" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
