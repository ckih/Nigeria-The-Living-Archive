import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        archive: {
          bg: '#0A0B0D',
          surface: '#121418',
          card: '#181A20',
          border: '#2A2D36',
          parchment: '#E8E3D9',
          muted: '#9CA3AF',
          ochre: '#C85A17',
          terracotta: '#A04000',
          indigo: '#1F2937',
          green: '#14532D',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
