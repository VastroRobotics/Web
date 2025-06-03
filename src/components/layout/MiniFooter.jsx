"use client";

import { Instagram, Linkedin, Mail } from "lucide-react";
import Logo from "../../assets/branding/vastro_full_logo.svg";
import ScrollPrompt from "./ScrollPrompt";

export default function MiniFooter({ onScrollTop }) {
  return (
    <div className="text-white space-y-4">
      {/* Logo and email */}
      <div className="flex flex-col items-start space-y-1">
        <img src={Logo} alt="Vastro logo" className="h-12 w-auto" />
        <div className="flex items-center text-secondary">
          <Mail className="w-4 h-4 mr-2" />
          <span>info@vastro.org</span>
        </div>
      </div>

      {/* Social icons and scroll to top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="https://linkedin.com/company/vastro" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://instagram.com/vastro" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        <ScrollPrompt direction="up" onClick={onScrollTop} className="relative" />
      </div>

      {/* Credits */}
      <div className="text-xs text-gray-400 flex flex-col items-start leading-tight">
        <span>© Vastro Robotics 2025</span>
        <span>All rights reserved. Terms &amp; Conditions.</span>
      </div>
    </div>
  );
}
