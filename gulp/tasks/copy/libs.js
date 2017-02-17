var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copy js libs to the build folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying js libs ***');

    return gulp.src(config.stringDependencies, { base: '.' })
      .pipe(gulp.dest(config.buildFolder));
  }
};
