import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import wasm from "vite-plugin-wasm";

const config: UserConfig = {
  plugins: [wasm(), sveltekit()],
  // https://github.com/rerun-io/rerun/issues/6815
  optimizeDeps: {
    exclude: process.env.NODE_ENV === "production" ? [] : ["@rerun-io/web-viewer"],
  },
};

if ("REPOSITORY" in process.env) {
  config.base = `/${process.env.REPOSITORY}/`;
}

export default config;

