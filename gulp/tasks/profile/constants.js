var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });
var path = require('path');

/**
 * Generate the config constants by profile.
 * @see config core module.
 * @example gulp profile --env production
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Replacing constants ***');

    var constantsPath = path.join(config.profilesFolders.constants, global.profileConfig.constants, '/*.json');

    gulp.src(constantsPath)
      .pipe(gulp.dest(config.constants.jsonFolder))
      .on('end', replaceConstants);


    function replaceConstants() {

      var filename = global.currentEnvironment + '.json';
      var settings = require(path.join(config.constants.jsonFolder, filename));

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
            },
            {
              match: /'@@hasHeader'/g,
              replacement: global.profileConfig.hasHeader
            },
            {
              match: 'headerOptions',
              replacement: global.profileConfig.headerOptions
            },
            {
              match: 'about',
              replacement: global.profileConfig.about
            }
          ]
        }))
        .pipe(plugins.rename(config.constants.targetFilename))
        .pipe(gulp.dest(config.constants.target))
        .on('end', done);
    }
  }
};


