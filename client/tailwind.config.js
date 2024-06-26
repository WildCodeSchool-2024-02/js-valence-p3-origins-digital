/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A3FF",
      },
      screens: {
        smallScreen: "500px",
      },
    },
  },
  plugins: [],
};
