var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Copy js files to the build folder.
 */
module.exports = {
  dep: ['addMainDependencies'],
  fn: function (gulp, done) {
    utils.log('*** Copying js files ***');

    var isPro = global.currentEnvironment === config.environments.pro;

    return gulp.src(config.js.source)
      .pipe(plugins.ngAnnotate({ single_quotes: true, add: true, remove: true }))
      .pipe(plugins.if(isPro, plugins.uglify()))
      .pipe(gulp.dest(config.js.target));
  }
};
