import React from "react";
  import Logo from "../assets/branding/icon_only_gray.svg";

  const BackgroundEmblem = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <img
          src={Logo}
          alt="Background Emblem"
          className="h-[110vh] max-w-[1500px]"
        />
      </div>
    );
  };

  export default BackgroundEmblem;

