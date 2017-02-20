var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Generate the config constants by profile.
 * @see config core module.
 * @example gulp profile --env production
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Replacing constants ***');

    var filename = global.currentEnvironment + '.json';

    var settings = require(path.join(config.constants.jsonFolder, filename));

    // Replace each placeholder with the correct value for the variable.
    gulp.src(config.constants.source)
      .pipe(plugins.replaceTask({
        patterns: [
          {
            match: 'backendUrl',
            replacement: settings.backendUrl
          },
          {
            match: 'connectionTimeout',
            replacement: settings.connectionTimeout
          },
          {
            match: 'defaultLanguage',
            replacement: settings.defaultLanguage
          }
        ]
      }))
      .pipe(plugins.rename(config.constants.targetFilename))
      .pipe(gulp.dest(config.constants.target));
  }
};
