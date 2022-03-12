var path = require('path');

module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import')({
      path: [path.resolve(__dirname, 'libs/ui/src/lib/styles')],
    }),
    require('postcss-nested'),
    require('tailwindcss'),
  ],
};
