// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable unused variables warning
      "@typescript-eslint/no-unused-vars": "off",
      // Or use "warn" instead of "off" if you want warnings instead of errors
      // "@typescript-eslint/no-unused-vars": "warn",
      
      // Also disable for regular JS unused vars
      "no-unused-vars": "off",
      
      // Disable unescaped entities warning if needed
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;