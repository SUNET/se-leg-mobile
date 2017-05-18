var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var fs = require('fs');
var spawn = require('child_process').spawn;

/**
 * Adds Android platform if it doesn't exist.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Generating icon and splash ***');

    var resourcesSpawn = spawn('ionic', ['cordova', 'resources']);

    resourcesSpawn.stdout.on('data', function (data) {
      console.log(data.toString());
    });

    resourcesSpawn.on('exit', done);
  }
};
