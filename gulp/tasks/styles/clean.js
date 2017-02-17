var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var del = require('del');

/**
 * Compiles, autoprefixes, and concats all styles into a final css file.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Cleaning CSS files ***');

    return del(config.styles.target);
  }
};
