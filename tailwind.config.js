/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite/**/*.js'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#E6E8EB',
					100: '#C2C7D3',
					200: '#9DA4B9',
					300: '#79809E',
					400: '#555F84',
					500: '#001F44', // primary
					600: '#001A3D',
					700: '#001533',
					800: '#001129',
					900: '#000D20'
				}
			}
		}
	},
  plugins: [require('flowbite/plugin')]
};
