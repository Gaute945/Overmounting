import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "camelcase": "warn",
      "indent": ["warn", 2],
      "semi": ["warn", "always"],
      "quotes": ["warn", "double"],
      "max-len": ["warn", { "code": 80 }],
      "no-trailing-spaces": "warn",
      "padded-blocks": ["warn", "never"],
      "no-unreachable": "warn",
      "no-unused-vars": ["warn", { "args": "none" }],
      "handle-callback-err": "warn",
      "comma-dangle": ["warn", "never"]
    }
  }
];

