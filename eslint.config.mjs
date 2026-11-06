import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["src/**/*.js", "src/**/*.jsx"],
    languageOptions: {
      globals: {
        fetch: "readonly",
        localStorage: "readonly",
        window: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
    },
  },
  globalIgnores([".next/**", "node_modules/**"]),
]);
