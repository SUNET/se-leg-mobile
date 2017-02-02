global.GULP_DIR = __dirname + '/gulp';
global.BASE_DIR = __dirname;
global.CONFIG_PATH = __dirname + '/gulp/gulp.config';

var plugins = require('gulp-load-plugins')({ lazy: true });

var gulp = global.GULP || require('gulp');
var bower = require('bower');
var sh = require('shelljs');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var merge = require('merge-stream');
var gulpsync = require('gulp-sync')(gulp);
var del = require('del');
var fs = require('fs');
var replace = require('gulp-replace-task');
var utils = require(global.GULP_DIR + '/utils');

plugins.requireTasks({
  path: __dirname + '/gulp/tasks',
  gulp: gulp
});

/**
 * Prints out the list  of available tasks.
 */
gulp.task('default', plugins.shell.task(['gulp --tasks']));


/**
 * Compiles, autoprefixes, minifies and concats all styles.
 * Produces a css for each origin scss and a minified and a concatenated styles.min.css for production.
 * @return {Stream}
 */
gulp.task('sass', function () {
  plugins.util.log(plugins.util.colors.blue('Compiling SASS'));
  return gulp.src(config.origin.mainSass)
    .pipe(plugins.plumber())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ios 6', 'android 4'] }))
    .pipe(plugins.concat('styles.css'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:minify', function () {
  plugins.util.log(plugins.util.colors.blue('Compiling SASS'));
  return gulp.src(config.origin.mainSass)
    .pipe(plugins.plumber())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ios 6', 'android 4'] }))
    .pipe(plugins.concat('styles.css'))
    .pipe(gulp.dest(config.dest.css))
    .pipe(plugins.cleanCss({ processImport: false }))
    .pipe(plugins.concat('styles.min.css'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('copyPlugins', function () {
  return gulp
    .src('./node_modules/angular-i18n/*.js')
    .pipe(gulp.dest('./www/assets/locale/i18n/'));
});

gulp.task('watch', ['sass'], function () {
  gulp.watch(config.origin.allSass, ['sass']);
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

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      plugins.util.log('bower', plugins.util.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + plugins.util.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', plugins.util.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + plugins.util.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

// Generate a zip file.
gulp.task('zip', gulpsync.sync([['profile:build', 'clean-dist'], 'copy-app', 'remove-zips']), function () {
  return gulp.src([
    'dist/build/www/**',
    'dist/build/resources/**',
    'dist/build/config.xml',
    'dist/build/icon-*.png'
  ], { base: "dist/build/" })
    .pipe(plugins.zip('se-leg-mobile.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean-dist', function () {
  return gulp.src('dist', { read: false })
    .pipe(plugins.clean());
});

gulp.task('remove-zips', function () {
  del('./www/lib/**/*.gz');
  del('./dist/build/www/lib/**/*.gz');
});

// Copy the app to the dist folder
gulp.task('copy-app', gulpsync.sync(
  [
    'copy-android-splash',
    [
      'copy-libs',
      'copy-fonts',
      'inject-css-dev',
      'copy-config',
      'copy-resources',
      'copy-js'
    ]
  ]),
  function () {
    return gulp.src(config.origin.devCommons)
      .pipe(gulp.dest('dist/build/www'));
  });

gulp.task('copy-libs', [], function () {
  return gulp.src(config.stringDependencies, { base: '.' })
    .pipe(gulp.dest(config.dest.build));
});

gulp.task('copy-fonts', [], function () {
  return gulp.src(config.origin.devFonts)
    .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy-resources', [], function () {
  return gulp.src('./resources/**/*')
    .pipe(gulp.dest('dist/build/resources'));
});

gulp.task('copy-android-splash', [], function () {
  return gulp.src('./resources/android/splash/**/*')
    .pipe(gulp.dest('./www/res/screen/android'));
});

gulp.task('copy-config', function () {
  // Get the environment from the command line
  var env = plugins.util.env.env || 'development';
  var appName = global.profileConfig.appName + '-' + env;

  return gulp.src(['./config.xml'])
    .pipe(plugins.cheerio({
      run: function ($) {
        // get the version number from package.json
        $('name').text(appName);
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(gulp.dest('dist/build'));

});

gulp.task('copy-js', ['add-main-dependencies'], function () {
  return gulp.src(config.origin.alljs)
    .pipe(plugins.ngAnnotate({
      single_quotes: true
    }))
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('inject-css-dev', ['sass'], function () {

  var target = gulp.src('./www/index.html');
  var sources = gulp.src('./www/css/*.css', { read: false });
  // del('./www/css/**/*.min.css');

  return target.pipe(plugins.inject(sources, { relative: true }))
    .pipe(gulp.dest('./www'));
});

gulp.task('add-main-dependencies', function () {
  return gulp.src('./www/js/devMain.js')
    .pipe(plugins.insertLines({
      'after': /var paths;/,
      'lineAfter': '\tpaths = ' + config.requireDependencies
    }))
    .pipe(plugins.rename('main.js'))
    .pipe(gulp.dest('./www/js/'));
});


//This task generates config constant file by profile.
//@See config core module.
//@example gulp profile --env production
gulp.task('profile', function () {
  // Get the environment from the command line
  var env = (plugins.util.env.env === undefined) ? 'dev' : plugins.util.env.env;

  if (env === 'demo') {
    env = 'demo';
  }

  // Read the settings from the right file
  var filename = env + '.json';

  var settings = JSON.parse(fs.readFileSync('./www/js/core/modules/config/json/' + filename, 'utf8'));

  // Replace each placeholder with the correct value for the variable.
  gulp.src('./www/js/core/modules/config/template/config.constants.js')
    .pipe(replace({
      patterns: [
        {
          match: 'backendUrl',
          replacement: settings.backendUrl
        },
        {
          match: 'connectionTimeout',
          replacement: settings.connectionTimeout
        },
        {
          match: 'defaultLanguage',
          replacement: settings.defaultLanguage
        }
      ]
    }))
    .pipe(gulp.dest('./www/js/core/modules/constants'));
});

gulp.task('profile:platform-android', function (done) {
  utils.log('*** Adding Android platform ***');

  if (fs.existsSync('./platforms/android')) {
    done();
  } else {
    return gulp.src('*.json', { read: false })
      .pipe(plugins.shell(['ionic platform add android']));
  }
});

gulp.task('profile:platform-ios', function (done) {
  utils.log('*** Adding iOS platform ***');

  if (fs.existsSync('./platforms/android')) {
    done();
  } else {
    return gulp.src('*.json', { read: false })
      .pipe(plugins.shell(['ionic platform add ios']));
  }
});

gulp.task('profile:ionic-resources', function () {
  utils.log('*** Generating icon and splash ***');

  return gulp.src('*.json', { read: false })
    .pipe(plugins.shell(['ionic resources']));
});
