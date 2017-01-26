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

    var imagesPath = [config.profilesFolders.images, global.profileConfig.images, '*.png'].join('/');

    return gulp.src(config)
      .pipe(gulp.dest(config.imagesPath));
  }
};
