var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copy config.xml to the build folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying config.xml ***');

    return gulp.src(config.configXml.result)
      .pipe(gulp.dest(config.buildFolder));
  }
};
