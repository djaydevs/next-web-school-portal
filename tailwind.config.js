/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#e0d6d5",
          200: "#c1acac",
          300: "#a18382",
          400: "#825959",
          500: "#63302f",
          600: "#4f2626",
          700: "#3b1d1c",
          800: "#281313",
          900: "#140a09"
        },
        accent: {
          100: "#fbf8cc",
          200: "#f8f199",
          300: "#f4ea66",
          400: "#f1e333",
          500: "#eddc00",
          600: "#beb000",
          700: "#8e8400",
          800: "#5f5800",
          900: "#2f2c00"
        },
      }
    },
  },
  plugins: [],
}
