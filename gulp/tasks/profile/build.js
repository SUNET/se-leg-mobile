var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

/**
 * Builds selected profile according to the corresponding configuration json file.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Building profiled app ***');

    var profileName = typeof args.theme === 'string' ? args.theme : 'default';

    global.profileConfig = require(config.profilesFolders.config + '/' + profileName + '.json');

    plugins.sequence.use(gulp)(
      [
        'profile:components',
        'profile:constants',
        'profile:config-xml',
        'profile:images',
        'profile:resources',
        'profile:variables',
        'profile:workflow'
      ], done
    )
  }
};
