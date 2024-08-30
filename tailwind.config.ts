import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				"52": "repeat(52, minmax(0, 1fr))",
			},
		},
	},
	plugins: [],
}
export default config
