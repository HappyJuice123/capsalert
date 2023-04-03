/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purpleBG: "#6c537a",
        purpleLight: "#8a7099",
        whiteGrey: "#ebebeb",
        greyBlack: "#262626",
        greyButton: "#666666",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
