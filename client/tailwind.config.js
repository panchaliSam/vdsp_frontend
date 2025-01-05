/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Entry HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // React/Vite project files
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
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
