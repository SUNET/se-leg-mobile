var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });
var fsExtra = require('fs-extra');
var args = require('yargs').argv;

/**
 * Builds selected profile according to the corresponding configuration json file.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Building profiled app ***');

    var profileName = typeof args.theme === 'string' ? args.theme : typeof  process.env.theme === 'string' ? process.env.theme : 'default';

    global.profileConfig = require(config.profilesFolders.config + '/' + profileName + '.json');

    fsExtra.ensureDirSync('hooks');
    fsExtra.copySync(config.configXml.source, config.configXml.target + '/config.xml');

    plugins.sequence.use(gulp)(
      [
        'profile:components',
        'profile:constants',
        'profile:images',
        'profile:resources',
        'profile:sass',
        'profile:sender',
        'profile:variables',
        'profile:workflow'
      ],
      'profile:ionic-resources',
      'profile:config-xml',
      done
    );
  }
};
