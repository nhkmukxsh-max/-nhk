import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#FAF9F6',
        'soft-beige': '#EDE8DF',
        'soft-sand': '#F4EFEA',
        'charcoal': '#242424',
        'charcoal-light': '#363636',
        'muted-grey': '#777777',
        'light-grey': '#E8E6E1',
        'accent-gold': '#B38B59',
        'accent-terracotta': '#C86D51',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'editorial': '0 4px 20px -2px rgba(36, 36, 36, 0.05)',
        'editorial-hover': '0 12px 30px -4px rgba(36, 36, 36, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;

