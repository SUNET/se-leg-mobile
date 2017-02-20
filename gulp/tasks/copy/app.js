var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Copy the different app files into the build folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying app ***');

    plugins.sequence.use(gulp)(
      'copy:androidSplash',
      [
        'copy:libs',
        'copy:fonts',
        'copy:config',
        'copy:resources',
        'copy:js',
        'inject:css'
      ],
      'copy:commons',
      done
    );
  }
};
