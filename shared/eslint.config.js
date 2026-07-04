const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
const markdown = require("eslint-plugin-markdown");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
    {
        ignores: [
            "dist/",
            "node_modules/",
            "package-lock.json",
            "eslint.config.js",
            // Fenced code samples in Markdown are partial snippets, not
            // compilable modules; linting them yields spurious parse errors.
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
    ...markdown.configs.recommended,
    prettierRecommended,
    {
        rules: {
            "comma-dangle": ["error", "always-multiline"],
            "prettier/prettier": "error",
        },
    },
];
