import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      colors: {
        purple: {
          DEFAULT: "#6A3EEC",
          med: "#1A1244",
          dark: "#110B2D",
          light: "#4B38A74D",
        },
        muted: {
          DEFAULT: "#FFFFFFCC",
          dark: "#5B5966",
        },
        background: {
          DEFAULT: "#110B2D",
        },
        border: {
          DEFAULT: "#6E42F0",
          light: "#5540BF66",
          dark: "#2C2067",
        },
      },
      fontFamily: {
        pp: ["pp", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
      },
      fontSize: {
        8: "8px",
        10: "10px",
        12: "12px",
        13: "13px",
        14: "14px",
        15: "15px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
        32: "32px",
        35: "35px",
      },

      backgroundImage: {
        desktop: "url('/images/backgrounds/main-desktop.png')",
        phone: "url('/images/backgrounds/main-phone.png')",
        "balance-card": "url('/images/backgrounds/balance-card.png')",

        //Gradiants
        "purple-gradient": "linear-gradient(180deg, #6563FF 0%, #343193 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
