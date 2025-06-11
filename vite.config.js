// file: vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/story-wt-vite/" : "/",
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"), // ⬅️ Ganti ke folder `public` di root
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "src/index.html"), // ⬅️ pastikan ini
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});

