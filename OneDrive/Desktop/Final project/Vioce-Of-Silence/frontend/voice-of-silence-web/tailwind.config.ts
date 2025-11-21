import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0F14',
        'gradient-cyan': '#33D6F0',
        'gradient-blue': '#4597E6',
        'gradient-purple': '#B67FFC',
        'accent-glow': '#7A3DFF',
      },
      fontFamily: {
        headline: ['Orbitron', 'Exo 2', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #7A3DFF, 0 0 10px #7A3DFF, 0 0 15px #7A3DFF' },
          '100%': { boxShadow: '0 0 10px #7A3DFF, 0 0 20px #7A3DFF, 0 0 30px #7A3DFF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
