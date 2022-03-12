const plugin = require('tailwindcss/plugin');

module.exports = {
  important: true,
  purge: {
    enabled:
      process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        inner: 'inset 4px 4px 20px rgb(0 0 0 / 25%)',
      },
      colors: {
        'brand-white': 'var(--color-white)',
        'brand-black': 'var(--color-black)',
        'brand-dark-black': 'var(--color-dark-black)',
        'brand-grey': 'var(--color-grey)',
        'brand-light-grey': 'var(--color-light-grey)',
        'brand-beige': 'var(--color-beige)',
        'brand-light-beige': 'var(--color-light-beige)',
        'brand-red': 'var(--color-red)',
        'brand-light-red': 'var(--color-light-red)',
        'brand-green': 'var(--color-green)',
      },
      fontFamily: {
        header: 'var(--font-header)',
        text: 'var(--font-text)',
      },
      fontSize: {
        xs: [
          '0.75rem',
          {
            lineHeight: '1.16',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.14',
          },
        ],
        lg: [
          '1.125rem',
          {
            lineHeight: '1.22',
          },
        ],
        xl: [
          '1.25rem',
          {
            lineHeight: '1.2',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '1.16',
          },
        ],
        '2.5xl': [
          '1.75rem',
          {
            lineHeight: '1.07',
          },
        ],
        '4.5xl': [
          '2.625rem',
          {
            lineHeight: '1.05',
          },
        ],
        '5.5xl': [
          '3.5rem',
          {
            lineHeight: '1.14',
          },
        ],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      borderWidth: ['disabled'],
      boxShadow: ['active'],
      opacity: ['disabled'],
      pointerEvents: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [
    require('tailwindcss-scroll-snap'),
    plugin(function ({ addComponents }) {
      const gridContainer = {
        '.c-grid-container': {
          display: 'grid',
          gridTemplateColumns: 'minmax(1rem, 1fr) minmax(0, var(--grid-content)) minmax(1rem, 1fr)',
        },
      };
      const shadow = {
        '.u-shadow': {
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05), 0 0 2px rgba(0, 0, 0, 0.1)',
        },
        '.u-shadow-big': {
          boxShadow:
            '0px 9px 13px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 1px rgba(0, 0, 0, 0.1)',
        },
      };
      addComponents(gridContainer, ['responsive']);
      addComponents(shadow);
    }),
  ],
};
