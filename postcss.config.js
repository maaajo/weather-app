const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./public/**/*.html'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // Purge and minify CSS only production builds only
    ...(process.env.NODE_ENV === 'production'
      ? [purgecss, require('cssnano')]
      : [])
  ]
};
