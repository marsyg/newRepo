/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			montserrat: ["Montserrat", "sans-serif"],
			inter: ["Inter", "sans-serif"],
			openSans: ["Open Sans", "sans-serif"],
			playfair: ["Playfair Display", "serif"],
			merriweather: ["Merriweather", "serif"],
			georgia: ["Georgia", "serif"],
			arialBlack: ["Arial Black", "sans-serif"],
			impact: ["Impact", "sans-serif"],
			bebasNeue: ["Bebas Neue", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
