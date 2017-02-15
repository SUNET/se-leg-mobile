var plugins = require('gulp-load-plugins')({ lazy: true });
var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var fs = require('fs');

/**
 * Fill the views constants template with the selected components.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Filling config constants ***');

    var components = global.profileConfig.components;

    return gulp.src(config.views.source)
      .pipe(plugins.replaceTask(
        {
          patterns: [
            {
              match: /\/\* @@views-placeholder \*\//g,
              replacement: mapComponentsToViews(components)
            }
          ]
        })
      )
      .pipe(plugins.rename(config.views.targetFilename))
      .pipe(gulp.dest(config.views.target));
  }
};

/**
 * Maps component names to views following the next form VIEWNAME: 'viewname'
 * @param components
 */
function mapComponentsToViews(components) {
  return components
    .map(function (component) {
      return component.toUpperCase() + ': \'' + component + '\'';
    })
    .join(',\n');
}

