/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "color-1": "#22223b",
      "color-2": "#4a4e69",
      "color-3": "#9a8c98",
      "color-4": "#c9ada7",
      "color-5": "#f2e9e4",
      red: "#fd3d11",
      "rating-1": "#ff4545",
      "rating-2": "#ffa534",
      "rating-3": "#ffe234",
      "rating-4": "#b7dd29",
      "rating-5": "#57e32c",
      "rating-6": "#2ce39f",
      "rating-7": "#2c97e3",
      "rating-8": "#2c3ae3",
      "rating-9": "#9d2ce3",
    },
    fontFamily: {
      body: ['"Open Sans"', "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
