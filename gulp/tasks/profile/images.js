var plugins = require('gulp-load-plugins')({lazy: true});
var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var fs = require('fs');

/**
 * Copy the selected profile images into the project folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying imgaes ***');

    var imagesPath = [config.profilesFolders.images, global.profileConfig.images, '*.png'].join('/');

    return gulp.src(imagesPath)
      .pipe(gulp.dest(config.imagesPath));
  }
};
