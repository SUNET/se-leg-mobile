global.GULP_DIR = __dirname + '/gulp';
global.BASE_DIR = __dirname;
global.CONFIG_PATH = __dirname + '/gulp/gulp.config';

var plugins = require('gulp-load-plugins')({ lazy: true });

var gulp = global.GULP || require('gulp');

plugins.requireTasks({
  path: __dirname + '/gulp/tasks',
  gulp: gulp
});

/**
 * Prints out the list  of available tasks.
 */
gulp.task('default', plugins.shell.task(['gulp --tasks']));
