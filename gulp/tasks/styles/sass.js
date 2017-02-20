var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Compiles, autoprefixes, and concats all styles into a final css file. Minifies the resulting css if
 * the selected environment corresponds with production
 */
module.exports = {
  dep: ['styles:clean'],
  fn: function (gulp, done) {
    utils.log('*** Compiling SCSS files ***');

    var isPro = global.currentEnvironment === config.environments.pro;

    return gulp.src(config.styles.source)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.plumber())
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer(config.styles.autoprefixerOptions))
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.rename(config.styles.targetFilename))
      .pipe(plugins.if(isPro, plugins.cleanCss()))
      .pipe(plugins.if(isPro, plugins.hashFilename({ "format": "{name}.{hash}.min{ext}" })))
      .pipe(gulp.dest(config.styles.target));
  }
};