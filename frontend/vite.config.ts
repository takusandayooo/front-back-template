import path from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      backend: path.resolve(import.meta.dirname, "../backend"),
      common: path.resolve(import.meta.dirname, "../common"),
    },
  },
  server: {
    proxy: {
      "/users": "http://localhost:8787",
    },
  },
});
