import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: [],
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        preserveModules: true,
        exports: "named",
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name.replace(/\.vue$/, "") + ".js";
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "_main.css") return "css/index.css";
          return assetInfo.name || "";
        },
        globals: { vue: "Vue" },
      },
    },
  },
});
