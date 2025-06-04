"use client";

import { Instagram, Linkedin, Mail } from "lucide-react";
import LogoIcon from "../../assets/branding/icon_only_white.svg";
import LogoText from "../../assets/branding/text_only_white.svg";
import ScrollPrompt from "../layout/ScrollPrompt";

export default function MiniFooter({ onScrollTop }) {
  return (
    <div className="absolute top-1/2 left-1/2 px-18 transform -translate-x-1/2 -translate-y-1/2">
      <div className="text-grey-400">
        {/* Logo and email */}
        <div className="flex flex-row items-center">
          <img src={LogoIcon} alt="Logo" className="h-19 w-auto" />
          <div className="flex flex-col items-start ml-5 mt-6 space-y-1">
            <img src={LogoText} alt="VASTRO" className="h-9 w-auto" />
            <a
              href="mailto:info@vastro.org"
              className="flex items-center text-gray-400 text-base hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span>info@vastro.org</span>
            </a>
          </div>
        </div>

        {/* Social icons and scroll to top */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 text-gray-400 mt-3 ml-4">
            <a
              href="https://linkedin.com/company/virtual-astronaut"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/vastro"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center mt-16 mb-22">
          <ScrollPrompt direction="up" onClick={onScrollTop} className="w-12 h-12" />
        </div>

        {/* Credits */}
        <div className="text-sm text-gray-400 flex flex-col items-start leading-tight ml-4 whitespace-nowrap">
          <span>© Vastro Robotics 2025</span>
          <span>All rights reserved. Terms &amp; Conditions.</span>
        </div>
      </div>
    </div>
  );
}
