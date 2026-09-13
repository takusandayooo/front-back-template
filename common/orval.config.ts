import { defineConfig } from "orval";

export default defineConfig({
  "front-back-template": {
    input: "./openapi.json",
    output: {
      mode: "tags-split",
      client: "react-query",
      target: "./generate",
      mock: {
        indexMockFiles: true,
        generators: [
          { type: "msw", useExamples: true },
          { type: "faker", useExamples: true },
        ],
      },
      biome: true,
      override: {
        mutator: {
          path: "./axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
  },
});
