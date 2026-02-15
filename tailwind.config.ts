import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        primaryForeground: 'rgb(var(--color-primary-foreground) / <alpha-value>)'
      },
      borderRadius: {
        lg: '0.875rem',
        md: '0.625rem',
        sm: '0.5rem'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
