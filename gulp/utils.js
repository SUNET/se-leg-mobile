var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var config = require(global.CONFIG_PATH || './gulp.config');


module.exports = utils();

function utils() {

  return {
    log: log,
    logError: logError,
    minifyHtml: minifyHtml
  };


  /**
   * Prints out in the console the given message or object.
   * @param {object | string} msg object or string to be logged.
   */
  function log (msg) {
    if (typeof msg === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item) && typeof msg[item] === 'string' || typeof msg[item] === 'number') {
          plugins.util.log('\t' + plugins.util.colors.cyan(item) + ': ' + plugins.util.colors.white(msg[item]));
        } else if (msg.hasOwnProperty(item)) {
          plugins.util.log(plugins.util.colors.blue(item));
          log(msg[item]);
        }
      }
    } else {
      plugins.util.log(plugins.util.colors.blue(msg));
    }
  }

  /**
   * Prints out in the console the given message or object.
   * @param {object | string} msg object or string to be logged.
   */
  function logError (msg) {
    if (typeof msg === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item) && typeof msg[item] === 'string' || typeof msg[item] === 'number') {
          plugins.util.log('\t' + plugins.util.colors.red(item) + ': ' + plugins.util.colors.red(msg[item]));
        } else if (msg.hasOwnProperty(item)) {
          plugins.util.log(plugins.util.colors.red(item));
          log(msg[item]);
        }
      }
    } else {
      plugins.util.log(plugins.util.colors.red(msg));
    }
  }

  /**
   * Function that minifies the html files present in the given path and returns the stream.
   * @param {string | array} files The path or paths of the html files to be minified.
   */
  function minifyHtml(gulp, files) {
    return gulp
      .src(files)
      .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
      .pipe(plugins.htmlmin(config.htmlmin.options))
      .pipe(plugins.if(args.verbose, plugins.bytediff.stop()));
  }
}
