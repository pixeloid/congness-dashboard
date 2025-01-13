/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#03102D',
          light: '#16274B',
        },
        secondary: {
          DEFAULT: '#FC3D3D',
          light: '#FF5252',
        },
        accent: {
          DEFAULT: '#1AD7BD',
          light: '#20E5CA',
        },
        navy: {
          dark: '#020817',
          DEFAULT: '#03102D',
          light: '#16274B',
        },
        background: {
          light: '#FFFFFF',
          dark: '#020817',
        },
        surface: {
          light: '#F6F7F9',
          dark: '#03102D',
        },
        foreground: {
          light: '#020817',
          dark: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}