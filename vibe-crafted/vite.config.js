import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Relative base so the built site works from any sub-path (GitHub Pages,
// preview deploys, opening dist/index.html directly, etc.).
export default defineConfig({
  base: "./",
  plugins: [react()],
  // `@/…` → src, matching jsconfig.json so shadcn/React Bits imports resolve.
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  test: {
    environment: "jsdom",
  },
});
