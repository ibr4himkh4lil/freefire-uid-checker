/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        ff: {
          orange:  '#FF6B00',
          amber:   '#FFB300',
          red:     '#FF2D55',
          dark:    '#0A0A0F',
          darker:  '#050508',
          card:    '#111118',
          border:  '#1E1E2E',
          muted:   '#2A2A3A',
          text:    '#E0E0F0',
          subtext: '#8888AA',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(255,107,0,0.3) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,107,0,0.05) 100%)',
      },
      animation: {
        'pulse-slow':    'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':     'spin 3s linear infinite',
        'float':         'float 6s ease-in-out infinite',
        'glow-pulse':    'glowPulse 2s ease-in-out infinite',
        'slide-up':      'slideUp 0.5s ease-out forwards',
        'fade-in':       'fadeIn 0.4s ease-out forwards',
        'shimmer':       'shimmer 1.5s infinite',
        'scan-line':     'scanLine 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,0,0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,107,0,0.8), 0 0 80px rgba(255,107,0,0.3)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanLine: {
          '0%':   { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(255,107,0,0.5)',
        'glow-amber':  '0 0 30px rgba(255,179,0,0.5)',
        'glow-red':    '0 0 30px rgba(255,45,85,0.5)',
        'card':        '0 8px 32px rgba(0,0,0,0.6)',
        'inner-glow':  'inset 0 1px 0 rgba(255,107,0,0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
