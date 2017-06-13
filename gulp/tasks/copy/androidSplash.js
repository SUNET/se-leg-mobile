var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copy android splash to the build folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying android splash ***');

    return gulp
      .src(config.resources.android.source)
      .pipe(gulp.dest(config.resources.android.target));
  }
};
