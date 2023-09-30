/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'landing': "url('/client/src/assets/Landing Page.svg')"
      },
      backgroundColor: {
        'cute' : '#F0F7F9'
      }
    },
  },
  plugins: [require("daisyui")],
};
