global.GULP_DIR = __dirname + '/gulp';
global.BASE_DIR = __dirname;
global.CONFIG_PATH = __dirname + '/gulp/gulp.config';

var plugins = require('gulp-load-plugins')({ lazy: true });

var gulp = global.GULP || require('gulp');
var bower = require('bower');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var merge = require('merge-stream');
var fs = require('fs');
var utils = require(global.GULP_DIR + '/utils');

plugins.requireTasks({
  path: __dirname + '/gulp/tasks',
  gulp: gulp
});

/**
 * Prints out the list  of available tasks.
 */
gulp.task('default', plugins.shell.task(['gulp --tasks']));


gulp.task('copyPlugins', function () {
  return gulp
    .src('./node_modules/angular-i18n/*.js')
    .pipe(gulp.dest('./www/assets/locale/i18n/'));
});

/**
 * Lints and anaylzes javascript code style.
 * @return {Stream}
 */
gulp.task('analyze', function () {
  plugins.util.log(plugins.util.colors.blue('Analyzing JSHint and JSCS'));
  var jshintAnalysis = analyzeJshint();
  var jscsAnalysis = analyzeJscs();

  return merge(jshintAnalysis, jscsAnalysis);
});
function analyzeJshint() {
  return gulp.src(config.origin.alljs)
    .pipe(plugins.if(args.verbose, plugins.print()))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe(plugins.jshint.reporter('fail'));
}

function analyzeJscs() {
  return gulp.src(config.origin.alljs)
    .pipe(plugins.jscs())
    .pipe(plugins.jscsStylish());
}

