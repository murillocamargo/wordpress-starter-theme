/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

function toRem(px) {
	return `${px / 16}rem`;
}

module.exports = {
	content: ['./**/*.php'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				sm: '768px',
				md: '1024px',
				lg: '1280px',
				xl: '1536px',
			},
		},
		fontSize: {
			10: toRem(10),
			11: toRem(11),
			12: toRem(12),
			13: toRem(13),
			14: toRem(14),
			15: toRem(15),
			16: toRem(16),
			17: toRem(17),
			18: toRem(18),
			20: toRem(20),
			22: toRem(22),
			24: toRem(24),
			26: toRem(26),
			28: toRem(28),
			30: toRem(30),
			32: toRem(32),
			35: toRem(35),
			40: toRem(40),
			45: toRem(45),
			50: toRem(50),
			56: toRem(56),
			60: toRem(60),
			70: toRem(70),
			80: toRem(80),
			90: toRem(90),
			120: toRem(120),
		},
		extend: {
			fontFamily: {},
			colors: {},
			backgroundImage: {},
			animation: {},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms')({
			strategy: 'base',
		}),
		function ({ addUtilities }) {
			const newUtilities = {};
			// Define grid classes from 1 to 12 columns with a gap of 8
			for (let i = 1; i <= 12; i++) {
				newUtilities[`.grid-${i}`] = {
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem', // Corresponds to 'gap-8' in Tailwind's default spacing scale
					'@screen lg': {
						display: 'grid',
						gridTemplateColumns: `repeat(${i}, minmax(0, 1fr))`,
						gap: '4rem', // Corresponds to 'gap-16' in Tailwind's default spacing scale
					},
				};
			}

			addUtilities(newUtilities, ['responsive', 'hover']);
		},
	],
};
