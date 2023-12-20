/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF1700",
        secondary: {
          100: "#F90716",
          200: "#FF5959",
        },
      },
    },
  },
  plugins: [],
};

// "#FF2171"

// "#F0134D"
