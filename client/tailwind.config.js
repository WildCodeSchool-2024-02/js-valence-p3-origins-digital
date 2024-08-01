import clipPath from "tailwind-clip-path";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#19457a",
        background: "#081225",
      },
      backgroundImage: {
        custom:
          "linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 100%)",
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
