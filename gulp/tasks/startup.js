var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Copy the theme variables file of the selected profile into the project folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying theme variables ***');

    plugins.sequence.use(gulp)(
        [
          'profile:build',
          'copy:fonts',
          'addMainDependencies'
        ],
      'copy:androidSplash',
        done
    );
  }
};

