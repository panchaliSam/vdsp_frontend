/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Entry HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // React/Vite project files
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#38a45c', // Custom green color
      },
    },
  },
  darkMode: "class", // Enables dark mode
  plugins: [],
};
