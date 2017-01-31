var plugins = require('gulp-load-plugins')({lazy: true});
var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var fs = require('fs');

/**
 * Fill the config constants template with the selected profile and environment.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Filling config constants ***');

    var constantsPath = [config.profilesFolders.constants, global.profileConfig.constants, '*.json'].join('/');

    return gulp.src(constantsPath)
      .pipe(gulp.dest(config.constantsPath));
  }
};
