module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        base: '0.9375rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
};
