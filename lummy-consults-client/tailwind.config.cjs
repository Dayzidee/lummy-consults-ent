// tailwind.config.js

/** @type {import('tailwindcss').Config} */
// We are changing 'export default' to 'module.exports'
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A90E2", // A nice, professional blue
          dark: "#357ABD", // A darker shade for hover states
        },
        secondary: {
          DEFAULT: "#00A99D", // A professional teal/cyan
          dark: "#00877E", // A darker shade for hover states
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
