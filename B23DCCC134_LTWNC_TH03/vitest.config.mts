import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      include: [
        "src/lib/permissions.ts",
        "src/lib/post-validate.ts",
        "src/lib/format.ts",
        "src/components/PostForm.tsx"
      ]
    }
  }
});
