// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // --- Backgrounds ---
        'surface-main': "#121212",      // Main dark background
        'surface-deep': "#000000",     // Pure black, deepest background
        'surface-accent': "#131313",   // For emblems/shapes/accents
        'surface-card': "#2A2A2A",     // Card/component body on main
        'surface-card-alt': "#333333", // Card/component body on deep
        // --- Text ---
        'primary': "#ffffff",   // Primary text, glows
        'secondary': "#9ca3af", // Secondary text (gray-400)
        // --- Utility ---
        'border-subtle': "rgba(255,255,255,0.3)", // Subtle border
      },
    },
  },
  plugins: [],
};
