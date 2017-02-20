var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Watches changes in scss files to recompile styles.
 */
module.exports = {
  dep: ['styles:sass'],
  fn: function (gulp, done) {
    utils.log('*** Watching SCSS files ***');

    gulp.watch(config.styles.watchPaths, ['styles:sass']);
  }
};
