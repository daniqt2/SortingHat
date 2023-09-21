/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        griffindor: "#740001",
        ravenclaw: "#0e1a40",
        slythering: "#1a472a",
        hufflepuff: "#ecb939",
        primary: "#222f5b",
      },
    },
  },
  plugins: [],
};
