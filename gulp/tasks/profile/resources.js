var plugins = require('gulp-load-plugins')({ lazy: true });

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copies the icon and splash of the selected profile into the project folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying selected icon and splash to the app folder ***');

    var iconPath = [config.profilesFolders.resources, global.profileConfig.icon, 'icon.png'].join('/');
    var splashPath = [config.profilesFolders.resources, global.profileConfig.splash, 'splash.png'].join('/');

    return gulp.src([iconPath, splashPath])
      .pipe(gulp.dest(config.resourcesPath));
  }
};
