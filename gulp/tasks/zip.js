var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Generate a zip file with the app.
 */
module.exports = {
  dep: ['prepareZip'],
  fn: function (gulp, done) {
    utils.log('*** Generating zip file ***');

    return gulp.src(config.buildFolder + '/**/*')
      .pipe(plugins.zip(global.profileConfig.appName + '.zip'))
      .pipe(gulp.dest('dist'));
  }
};
