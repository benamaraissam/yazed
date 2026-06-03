import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    // Sandbox traffic arrives from Traefik with the dynamic
    // sb-<id>.apps.<domain> Host header; Vite would otherwise reject it.
    allowedHosts: true,
    watch: { usePolling: true },
    // /api/* in the iframe hits Vite → forwarded here to FastAPI on :8000
    proxy: {
      "/api": { target: "http://127.0.0.1:8000", changeOrigin: true },
    },
  },
});
