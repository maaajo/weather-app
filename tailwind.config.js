module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  theme: {
    extend: {
      height: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem'
      },
      fontFamily: {
        display: 'Raleway, sans-serif'
      }
    }
  },
  variants: {},
  plugins: []
};
