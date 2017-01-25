var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

var args = require('yargs').argv;

/**
 * Builds selected profile.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Building profiled app ***');

    var profileName = typeof args.theme === 'string' ? args.theme : 'default';

    global.profileConfig = require(config.profilesFolders.config + profileName + '.json');
  }
};
