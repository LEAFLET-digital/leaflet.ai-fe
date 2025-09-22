import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  server: {
    watch: {
      ignored: ["**/node_modules/**", "**/.git/**"],
    },
  },
  optimizeDeps: {
    include: ["@mui/material", "@mui/icons-material"],
    exclude: ["@mui/icons-material/esm/*"],
  },
});
