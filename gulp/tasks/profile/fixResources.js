var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');
var plugins = require('gulp-load-plugins')({ lazy: true });

/**
 * Builds selected profile according to the corresponding configuration json file.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Fixing config.xml Android splash references ***');

    return gulp.src(config.configXml.result)
      .pipe(plugins.cheerio({
        run: splitQualifierAndDensity,
        parserOptions: { xmlMode: true }
      }))
      .pipe(gulp.dest(config.configXml.target));
  }
};

/**
 * Splits qualifier and density to its own attributes to prevent splash screen from not appearing in Android devices.
 * @param $ cheerio function.
 */
function splitQualifierAndDensity($) {
  $('platform[name = "android"] splash').each(function (index, element) {
    var densitySplit = $(element).attr('density').split('-');
    var qualifier = densitySplit[0];
    var density = densitySplit[1];

    $(element).attr('qualifier', qualifier);
    $(element).attr('density', density);
  })
}
