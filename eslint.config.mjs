import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
	...nextVitals,
	prettier,
	{
		rules: {
			...jsxA11y.flatConfigs.recommended.rules,
			"import/order": [
				"error",
				{
					groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
					pathGroups: [{ pattern: "@/**", group: "internal" }],
					"newlines-between": "always",
					alphabetize: { order: "asc", caseInsensitive: true },
					named: true,
				},
			],
			"import/no-duplicates": "error",
			"no-restricted-imports": [
				"error",
				{ patterns: [{ regex: "(^|/)\\.\\./", message: 'Use "@/…" instead of "../".' }] },
			],
			"react/jsx-uses-react": "off",
			"no-unused-vars": [
				"error",
				{ vars: "all", args: "none", ignoreRestSiblings: true, caughtErrors: "all" },
			],
		},
	},
	globalIgnores([".next/**", "out/**", "build/**"]),
]);
