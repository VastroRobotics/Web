"use client";

import { Instagram, Linkedin, Mail } from "lucide-react";
import Logo from "../../assets/branding/vastro_full_logo.svg";
import ScrollPrompt from "../layout/ScrollPrompt";

export default function MiniFooter({ onScrollTop }) {
  return (
    <div className="absolute top-1/2 left-1/2 w-full max-w-lg px-6 transform -translate-x-1/2 -translate-y-1/2">
      <div className="space-y-8 text-grey-400">
        {/* Logo and email */}
        <div className="flex flex-col items-start space-y-2">
          <img src={Logo} alt="Vastro logo" className="h-14 w-auto" />
          <div className="flex items-center text-gray-400 text-base">
            <Mail className="w-5 h-5 mr-2" />
            <span>info@vastro.org</span>
          </div>
        </div>

        {/* Social icons and scroll to top */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="https://linkedin.com/company/vastro" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://instagram.com/vastro" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          <ScrollPrompt direction="up" onClick={onScrollTop} className="w-10 h-10 relative" />
        </div>

        {/* Credits */}
        <div className="text-sm text-gray-400 flex flex-col items-start leading-tight">
          <span>© Vastro Robotics 2025</span>
          <span>All rights reserved. Terms &amp; Conditions.</span>
        </div>
      </div>
    </div>
  );
}
