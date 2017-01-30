var plugins = require('gulp-load-plugins')({ lazy: true });
var del = require('del');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var fsExtra = require('fs-extra');

/**
 * Copies the selected components folders into the project folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying selected components to the app folder ***');

    var components = global.profileConfig.components;

    components.forEach(copyComponentFolder);

    addComponentsToApp(components);

    /**
     * Copies the component folder into the project folder excluding the configComponent file.
     * @param component
     */
    function copyComponentFolder(component) {
      var source = [config.componentsFolder.source, component].join('/');
      var target = [config.componentsFolder.target, component].join('/');

      fsExtra.mkdirsSync(target);

      fsExtra.copySync(source, target);

      del.sync(config.componentsFolder.target + '/**/configComponent.json');
    }

    /**
     * Fill the app.js template file with modules and main files of the selected components.
     * @param {string[]} components the components to be added.
     */
    function addComponentsToApp(components) {
      var componentsMainFiles = [];
      var componentsModuleNames = [];

      components.forEach(function (component) {
        componentsMainFiles.push('\'./components/' + component + '/main\',');
        componentsModuleNames.push('\'app.' + component + '\',');
      });

      return gulp.src(config.appJs.source)
        .pipe(plugins.insertLines({
          after: '// Components main files',
          lineAfter: componentsMainFiles.join('\n')
        }))
        .pipe(plugins.insertLines({
          after: '// Components modules',
          lineAfter: componentsModuleNames.join('\n')
        }))
        .pipe(plugins.rename('app.js'))
        .pipe(gulp.dest(config.appJs.target))
        .on('end', done);
    }

  }
};
