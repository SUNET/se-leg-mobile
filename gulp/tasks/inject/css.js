var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Injects the compiled css file into the index.html.
 */
module.exports = {
  dep: ['styles:sass'],
  fn: function (gulp, done) {
    utils.log('*** Injecting css tag into index.html ***');

    return gulp.src(config.indexHtml)
      .pipe(plugins.inject(gulp.src(config.styles.glob, { read: false }), { relative: true }))
      .pipe(gulp.dest(config.wwwFolder));
  }
};
