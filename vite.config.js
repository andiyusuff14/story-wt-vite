import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/story-wt-vite/", // WAJIB untuk GitHub Pages subfolder
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "src", "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
