// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: "class",
//   content: ["./**/*.{html,js,vue}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         body: ['"Nunito Sans"', "sans-serif"],
//         heading: ['"Playfair Display"', "serif"],
//         accent: ['"Dancing Script"', "serif"],
//       },
//       colors: {
//         heading: "#2B2D42",
//         primary: "#A47D5D",
//         accent: "#EDE5DE",
//         secondary: "#8B8E67",
//       },
//     },
//   },
//   plugins: [],
// };

tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        body: ['"Nunito Sans"', "sans-serif"], // Main body font
        heading: ['"Playfair Display"', "serif"], // Secondary header font
        accent: ['"Dancing Script"', "serif"],
      },
      colors: {
        heading: "#2B2D42",
        primary: "#A47D5D", // Primary brown color
        accent: "#EDE5DE", // accent brown color
        secondary: "#8B8E67", // Secondary green color
      },
    },
  },
};
