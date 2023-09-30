/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url('/client/src/assets/Landing Page.svg')",
      },
      backgroundColor: {
        cute: "#F0F7F9",
        btn: "#83CDDD",
      },
      colors: {
        card: "#ABB7BA",

        whiteText: "F0F7F9",

        buttons: "#61BDD5",

        blackText: "#161727",

        background: "#f1f7f8",

        adminDash: "#83CDDD",

        success: "#1ea96f",

        warning: "#F1C644",

        error: "#e76e74",

        customIconColor: "black",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
