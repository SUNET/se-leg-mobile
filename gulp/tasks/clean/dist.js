var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var del = require('del');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Minifies the produced css file.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Minify css file ***');

    return del(config.distFolder);
  }
};
