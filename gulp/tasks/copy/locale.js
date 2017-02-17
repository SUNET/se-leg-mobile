var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copy angular i18n locale files to the assets folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying locale ***');

    return gulp
      .src(config.locale.source)
      .pipe(gulp.dest(config.locale.target));
  }
};
