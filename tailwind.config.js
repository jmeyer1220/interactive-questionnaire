/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
      fontFamily: {
        'sans': ['Vollkorn', 'Abel', ...defaultTheme.fontFamily.sans],
      }
    }
  },
  plugins: [],
};
