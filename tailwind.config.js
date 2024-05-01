/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'whitee': '#f8f8f9',
      'floral-white': '#FDF6EC',
      'rich-black': '#121722',
      'periwinkle': '#B7C0EE',
      'dark-blue': '#495B88',
      'green': '#74A57F',
      'burgundy': '#93032E',
      'coral': '#EF8354',
      'moss-green': '#918868',
    },
    boxShadow: {
      'selected': 'rgb(38, 57, 77) 0px 12px 30px -10px',
      'selected-box': 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
      'not-selected': 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
      // 'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
    }
  },
  plugins: [],
}
