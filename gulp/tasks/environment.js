var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var args = require('yargs').argv;

/**
 * Set the environment.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Setting environment ***');

    global.currentEnvironment = args.env || config.environments.dev;
    done();
  }
};
