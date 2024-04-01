/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      text: "#050315",
      background: "#FBFEFF",
      primary: "#002866",
      secondary: "#D8D8D8",
      accent: "#009BA8",
    },
    extend: {
      fontFamily: {
        header: ["Nunito", "sans-serif"],
        body: ["PTSans", "serif"],
      },
    },
  },
  plugins: [],
};
