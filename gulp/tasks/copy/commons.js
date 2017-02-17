var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copy common files to the build folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying common files ***');

    return gulp.src(config.commons.source)
      .pipe(gulp.dest(config.commons.target));
  }
};
