import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6B38D4',
        'primary-container': '#8455EF',
        surface: '#F9F9FF',
        'surface-dim': '#D3DAEA',
        'on-surface': '#151C27',
        'on-surface-variant': '#494454',
        outline: '#7B7486',
        'outline-variant': '#CBC3D7',
        error: '#BA1A1A',
        secondary: '#555F6F',
        tertiary: '#5A5C5E',
        'priority-urgent': '#DC2626',
        'priority-high': '#EA580C',
        'priority-medium': '#CA8A04',
        'priority-low': '#6B7280'
      },
      spacing: {
        sidebar: '240px',
        'card-padding': '16px',
        gutter: '12px'
      },
      borderRadius: {
        card: '8px',
        chip: '9999px'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

export default config;
