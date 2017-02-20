var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copy resources to the build folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying resources ***');

    return gulp.src(config.resources.source)
      .pipe(gulp.dest(config.resources.target));
  }
};
