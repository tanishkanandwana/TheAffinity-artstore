// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//        fontFamily: {
//         cinzel: ['"Cinzel Decorative"', 'cursive'],
//       },
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'cursive'],
      },

      // Custom loader animation
      keyframes: {
        loader: {
          '0%': { transform: 'translateX(-110%)' },
          '100%': { transform: 'translateX(220%)' },
        },
      },

      animation: {
        loader: 'loader 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
