/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        'on-accent': 'var(--color-on-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        line: 'var(--color-line)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      backgroundImage: {
        atmosphere: 'var(--bg-atmosphere)',
      },
    },
  },
  plugins: [],
}
