import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#070a0c',
        surface: '#111418',
        border: '#252a32',
        text: '#d7dde5',
        muted: '#98a4b3',
        accent: 'rgb(74, 144, 177)'
      },
      boxShadow: {
        panel: '0 16px 50px rgba(0, 0, 0, 0.3)'
      }
    }
  },
  plugins: [typography]
};
