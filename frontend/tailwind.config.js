/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        secondary: '#525252',
        accent: '#FF3300',
        border: '#E5E5E5',
        'border-dark': '#0A0A0A',
        'bg-primary': '#FAFAFA',
        'bg-secondary': '#FFFFFF',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.2em',
      },
    },
  },
  plugins: [],
}
