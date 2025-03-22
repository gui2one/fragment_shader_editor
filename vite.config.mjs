// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        // collection: resolve(__dirname, "collection.html"),
        // favorites: resolve(__dirname, "favorites.html"),
      },
    },
    outDir: "dist/fragment_editor",
  },

  base: "/fragment_editor/",
});
