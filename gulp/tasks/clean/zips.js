var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var del = require('del');

/**
 * Remove zip files to prevent errors.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Removing zip files ***');

    return del(config.zipFiles);
  }
};
