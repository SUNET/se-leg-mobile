var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var fsExtra = require('fs-extra');

/**
 * Copy the theme variables file of the selected profile into the project folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying theme variables ***');

    var source = [config.profilesFolders.theme, global.profileConfig.theme, config.variablesFilename].join('/');
    var target = [config.variablesFolder, config.variablesFilename].join('/');

    fsExtra.copySync(source, target);
    done();
  }
};
