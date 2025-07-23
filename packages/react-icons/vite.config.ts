import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      insertTypesEntry: true,
      outDir: "dist",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactIcons",
      formats: ["es", "cjs"],
      fileName: (format, entry) =>
        format === "es" ? `${entry}.mjs` : `${entry}.cjs`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        exports: "named",
        preserveModules: true,
        preserveModulesRoot: "src",
        dir: "dist",
      },
    },
    cssCodeSplit: false,
  },
});
