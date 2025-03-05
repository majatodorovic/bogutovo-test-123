/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./_dynamic_pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
        "4xl": "1920px",
      },
      aspectRatio: {
        "2/3": "2/3",
      },
      colors: {
        "boa-red": "#e30613",
        "boa-gray": "#556972",
        "boa-blue": "#556972",
        "boa-dark": "#18252b",
        "boa-dark-blue": "#263740",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
