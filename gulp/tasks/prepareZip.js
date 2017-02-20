var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Prepare application to be zipped.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Preparing files to be zipped ***');

    plugins.sequence.use(gulp)(
      'environment',
      [
        'profile:build',
        'copy:locale',
        'copy:fonts',
        'profile:constants',
        'clean:dist'
      ],
      'copy:app',
      'clean:zips',
      done
    );
  }
};

