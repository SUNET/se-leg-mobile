var plugins = require('gulp-load-plugins')({lazy: true});
var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var path = require('path');

/**
 * Fill the config constants template with the selected profile and environment.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Filling config constants ***');

    var constantsPath = path.join(config.profilesFolders.constants, global.profileConfig.constants, '*.json');

    return gulp.src(constantsPath)
      .pipe(gulp.dest(config.constants.jsonFolder));
  }
};
