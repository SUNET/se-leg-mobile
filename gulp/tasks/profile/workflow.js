var plugins = require('gulp-load-plugins')({lazy: true});
var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');
var path = require('path');

/**
 * Copy the content workflow file of the selected profile into the main.factory file in the project folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying workflow ***');

    var workflow = require(path.join(config.profilesFolders.workflow, global.profileConfig.workflow, config.workflowFilename));

    return gulp.src(config.workflowSource)
      .pipe(plugins.replaceTask(
        {
          patterns: [
            {
              match: /\/\* @@dependencies-placeholder \*\//g,
              replacement: ',' + workflow.dependencies.toString()
            },
            {
              match: /\/\* @@workflow-placeholder \*\//g,
              replacement: workflow.loadWorkflow.toString()
            }
          ]
        })
      )
      .pipe(plugins.rename(config.workflowTargetFilename))
      .pipe(gulp.dest(config.workflowTargetFolder));
  }
};
