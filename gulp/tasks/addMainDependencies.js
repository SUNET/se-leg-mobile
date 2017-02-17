var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Add require dependencies to the main.js file.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Adding main dependencies ***');

    return gulp.src(config.main.source)
      .pipe(plugins.insertLines({
        'after': /var paths;/,
        'lineAfter': '\tpaths = ' + config.requireDependencies
      }))
      .pipe(plugins.rename(config.main.targetFilename))
      .pipe(gulp.dest(config.main.target));
  }
};
