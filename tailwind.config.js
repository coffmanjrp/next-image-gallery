module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {},
  },
  daisyui: {},
  plugins: [require('daisyui'), require('tailwind-scrollbar'), require('@tailwindcss/aspect-ratio')],
};
