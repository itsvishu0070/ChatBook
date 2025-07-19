// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
  

//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-once': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.1)', opacity: 0.8 },
        }
      },
      animation: {
        'pulse-once': 'pulse-once 0.5s ease-in-out 1', // Runs only once
      },
      colors: {
        // Define your custom colors here if needed, e.g.,
        // 'dark-bg-start': '#0a0a0a',
        // 'dark-bg-end': '#1a1a1a',
      },
    },
  },
  plugins: [],
}