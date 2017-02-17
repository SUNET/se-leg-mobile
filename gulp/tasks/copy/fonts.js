var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copy fonts to the build folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying fonts ***');

    return gulp.src(config.fonts.source)
      .pipe(gulp.dest(config.fonts.target));
  }
};
