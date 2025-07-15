"use client";

import { Instagram, Linkedin, Mail } from "lucide-react";
import LogoIcon from "../../assets/branding/icon_only_white.svg";
import LogoText from "../../assets/branding/text_only_white.svg";
import ScrollPrompt from "../layout/ScrollPrompt";

export default function MiniFooter({ onScrollTop }) {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 p-6">
        <div className="relative w-full h-full overflow-hidden rounded-3xl bg-black shadow-[0_0_10px_2px_rgba(255,255,255,0.15)]">
          <div className="absolute top-1/2 left-1/2 px-18 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-grey-400">
              {/* Main Row */}
              <div className="flex flex-row items-end">
                {/* Logo Icon */}
                <img src={LogoIcon} alt="Logo" className="h-17 w-auto mb-1" />

                {/* Right Section: Row of (Text+Email) and Icons */}
                <div className="flex flex-row items-stretch">
                  {/* Column: Logo Text + Email */}
                  <div className="flex flex-col justify-between ml-6 mr-5">
                    <img
                      src={LogoText}
                      alt="VASTRO"
                      className="h-9 w-auto mb-1"
                    />
                    <a
                      href="mailto:info@vastro.org"
                      className="flex items-center text-gray-400 text-base hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <span>info@vastro.org</span>
                    </a>
                  </div>

                  {/* Column: Social Icons */}
                  <div className="flex flex-col justify-between text-gray-400">
                    <a
                      href="https://instagram.com/vastro.robotics"
                      aria-label="Instagram"
                      className="hover:text-white transition-colors"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://linkedin.com/company/virtual-astronaut"
                      aria-label="LinkedIn"
                      className="hover:text-white transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Scroll to top */}
              <div className="flex justify-center items-center my-25">
                <ScrollPrompt
                  direction="up"
                  onClick={onScrollTop}
                  className="w-14 h-14"
                />
              </div>

              {/* Footer Credits */}
              <div className="text-sm text-gray-400 flex flex-col items-start leading-tight ml-4 whitespace-nowrap">
                <span>© Vastro Robotics 2025. All rights reserved.</span>
                <span>Terms &amp; Conditions.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
