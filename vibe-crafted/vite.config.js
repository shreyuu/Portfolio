import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built site works from any sub-path (GitHub Pages,
// preview deploys, opening dist/index.html directly, etc.).
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
