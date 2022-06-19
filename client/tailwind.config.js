module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          to: {
            opacity: 0,
            transform: 'scale(2)',
          },
        },
      },
    },
  },
  plugins: [],
};
