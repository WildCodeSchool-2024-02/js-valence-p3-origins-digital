import clipPath from "tailwind-clip-path";
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
      backgroundImage: {
        "form-image": "url('./assets/images/register.jpg')",
      },
      clipPath: {
        myPolygon: "polygon(25% 0%, 100% 0, 100% 100%, 0% 100%);",
      },
    },
  },
  plugins: [clipPath],
};
