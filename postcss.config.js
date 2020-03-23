module.exports = {
  autoprefixer: {
    browsers: [
      '>1%',
      'last 6 versions',
      'Firefox ESR',
      'not ie < 9', // React doesn't support IE8 anyway
    ],
    flexbox: 'no-2009',
  },
};
