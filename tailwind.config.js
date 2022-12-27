/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("daisyui"),
    require("flowbite/plugin")
  ],
  theme: {
    extend: {},
  },
  
  colors: {
    'main': 'rgb(11,115,164)'
  },
  plugins: [],
}
