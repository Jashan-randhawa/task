/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#f5f4f0',
          card:    '#ffffff',
          low:     '#eeecea',
          mid:     '#e4e1dc',
          high:    '#d9d6d0',
        },
        ink: {
          DEFAULT: '#141210',
          mid:     '#3d3a36',
          soft:    '#6b6760',
          faint:   '#9e9b96',
        },
        accent: {
          DEFAULT: '#1a1a2e',
          pop:     '#e8611a',
          blue:    '#2563eb',
        },
      },
      borderRadius: {
        xs: '3px',
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
        md: '0 2px 6px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)',
        lg: '0 4px 12px rgba(0,0,0,0.08), 0 20px 48px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-up': 'fade-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) both',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
