var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Copy the workflow file of the selected profile.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying workflow ***');

    var workflow = fs.readFileSync([config.profilesFolders.workflow, global.profileConfig.workflow, config.workflowFilename].join('/'));

    return gulp.src(config.workflowSource)
      .pipe(plugins.replaceTask(
        {
          patterns: [
            {
              match: /\/\* @@workflow-placeholder \*\//g,
              replacement: workflow
            }
          ]
        })
      )
      .pipe(plugins.rename(config.workflowTargetFilename))
      .pipe(gulp.dest(config.workflowTargetFolder));
  }
};
