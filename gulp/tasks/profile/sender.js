var plugins = require('gulp-load-plugins')({ lazy: true });
var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var fs = require('fs');
var path = require('path');

/**
 * Copy the content of sender file of the selected profile into the sender.custom.process.data file in the project
 * folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying sender ***');

    var senderPath = path.join(config.profilesFolders.sender, global.profileConfig.sender, config.senderFilename);

    var sender = require(senderPath);

    return gulp.src(config.senderSource)
      .pipe(plugins.replaceTask(
        {
          patterns: [
            {
              match: /\/\* @@dependencies-placeholder \*\//g,
              replacement: ',' + sender.dependencies.toString()
            },
            {
              match: /\/\* @@get-custom-processed-data-placeholder \*\//g,
              replacement: sender.getProcessedData.toString()
            }
          ]
        })
      )
      .pipe(plugins.rename(config.senderTargetFilename))
      .pipe(gulp.dest(config.senderTargetFolder));
  }
};
