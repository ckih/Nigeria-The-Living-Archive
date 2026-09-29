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
          bg: '#0A0B0D',         // Deep charcoal / near-black
          surface: '#121418',    // Slightly lighter charcoal
          card: '#181A20',       // Elevated surface
          border: '#2A2D36',     // Archival line tint
          parchment: '#E8E3D9', // Warm ivory
          muted: '#9CA3AF',      // Muted archival grey
          ochre: '#C85A17',      // Burnt ochre accent
          terracotta: '#A04000', // Terracotta
          indigo: '#1F2937',     // Indigo tint
          green: '#14532D',      // Deep forest green
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Geist', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        archival: '0.15em',
        dramatic: '0.25em',
      },
    },
  },
  plugins: [],
};

export default config;
