const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

// Migrated from the legacy .eslintrc airbnb setup: eslint-config-airbnb has no
// maintained flat-config build for ESLint 9, and the old config already turned
// off almost all of airbnb's opinionated rules. This keeps the base recommended
// sets plus the handful of overrides the project actually relied on.
module.exports = [
  {
    ignores: [
      "dist/",
      "release/",
      "node_modules/",
      "eslint.config.js",
      "webpack.*.js",
      "after-pack.js",
      "**/*.md/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...react.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettierRecommended,
  {
    rules: {
      "comma-dangle": ["error", "always-multiline"],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "error",
      // Deliberately relaxed in the original config.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },
];
