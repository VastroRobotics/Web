import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr(), tailwindcss()],
//   server: {
//     port: 8080,
//     hmr: true,
//   },
// });

// vite.config.js
export default defineConfig({
  base: "/Web/",
  plugins: [react(), svgr(), tailwindcss()],
});
