/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purpleBG: "#6c537a", //colour of header
        purpleLight: "#8a7099", //colour of buttons
        whiteGrey: "#ebebeb", //font colour when there is a purple background, and the background colour
        greyBlack: "#262626", // text colour on whitegrey background
      },
    },
  },
  plugins: [],
};
