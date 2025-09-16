/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff9d',
        'neon-purple': '#bd00ff',
        'dark-bg': '#0a0a0a',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 10px #00ff9d, inset 0 0 5px #00ff9d',
        'neon-purple': '0 0 10px #bd00ff, inset 0 0 5px #bd00ff',
      },
      textShadow: {
        'neon-green': '0 0 5px #00ff9d, 0 0 10px #00ff9d',
        'neon-purple': '0 0 5px #bd00ff, 0 0 10px #bd00ff',
      },
    },
  },
  plugins: [],
}
