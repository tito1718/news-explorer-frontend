import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  return {
    base: mode === "production" ? env.VITE_BASE_PATH || "/news-explorer/" : "/",
    plugins: [react()],
  };
});
