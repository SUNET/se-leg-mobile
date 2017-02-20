var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var fs = require('fs');
var spawn = require('child_process').spawn;

/**
 * Adds iOS platform if it doesn't exist.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Adding iOS platform ***');

    if (fs.existsSync('./platforms/ios')) {
      done();
    } else {
      var platformSpawn = spawn('ionic', ['platform', 'add', 'ios']);

      platformSpawn.stdout.on('data', function (data) {
        console.log(data.toString());
      });

      platformSpawn.on('exit', done);
    }
  }
};
