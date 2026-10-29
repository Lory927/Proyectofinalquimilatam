/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#692FF4',
          hover: '#5A22DE',
          soft: '#EEE7FE',
        },
        accent: {
          DEFAULT: '#B266FF',
          soft: '#F4EAFF',
        },
        highlight: {
          DEFAULT: '#FF80F0',
          soft: '#FFE8FB',
        },
        success: {
          DEFAULT: '#16A34A',
          text: '#15803D',
          soft: '#E8F7EE',
        },
        error: {
          DEFAULT: '#DC2626',
          soft: '#FDECEC',
        },
        warning: {
          DEFAULT: '#D97706',
          text: '#B45309',
          soft: '#FDF3E2',
        },
        ink: {
          DEFAULT: '#1E1763',
          muted: '#5B5580',
        },
        canvas: '#F8F7FF',
        surface: '#FFFFFF',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'Nunito', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.6' }],
        xl: ['1.5625rem', { lineHeight: '1.2' }],
        '2xl': ['1.9375rem', { lineHeight: '1.2' }],
        '3xl': ['2.4375rem', { lineHeight: '1.2' }],
      },
      borderRadius: {
        btn: '16px',
        card: '20px',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      },
      boxShadow: {
        btn: '0 2px 0 rgba(0, 0, 0, 0.08)',
        card: '0 4px 16px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
