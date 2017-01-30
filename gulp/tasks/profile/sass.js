var plugins = require('gulp-load-plugins')({ lazy: true });
var del = require('del');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');


/**
 * Fill the m main scss file with the selected components import styles and writes it into the se-leg.scss file.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying selected components to the app folder ***');

    var components = global.profileConfig.components;

    return addScssImports(components);

    /**
     * Add the scss import for the given components.
     * @param components the components to retrieve the styles from.
     */
    function addScssImports(components) {

      var importLines = components.map(function (component) {
        return '@import "../www/js/components/' + component + '";';
      });

      return gulp.src(config.scss.source)
        .pipe(plugins.insertLines({
          after: '// Components styles',
          lineAfter: importLines.join('\n')
        }))
        .pipe(plugins.rename(config.scss.mainFile))
        .pipe(gulp.dest(config.scss.target));
    }
  }
};
