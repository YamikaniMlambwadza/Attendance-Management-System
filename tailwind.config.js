/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors: {
        primary: '#EEEEEE',
        but: '#3D32F8',
        pop: '08529E'
       }
    },
  },
  plugins: [],
}