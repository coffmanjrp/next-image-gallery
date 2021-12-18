module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['emerald', 'dark', 'forest', 'synthwave'],
  },
  plugins: [require('daisyui'), require('@tailwindcss/aspect-ratio')],
};
