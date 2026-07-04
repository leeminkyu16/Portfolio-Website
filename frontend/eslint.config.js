const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
const markdown = require("eslint-plugin-markdown");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
	{
		ignores: [
			"public/",
			"mocks/",
			".cache/",
			"node_modules/",
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
	// Prettier formatting is enforced by the separate `prettier --write` step;
	// eslint-config-prettier only disables rules that would conflict with it.
	prettierConfig,
	{
		rules: {
			// typescript-eslint v8 promotes this to an error; keep it a warning
			// to match the project's prior (v5) lint behavior.
			"@typescript-eslint/no-explicit-any": "warn",
		},
	},
];
