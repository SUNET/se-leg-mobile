var plugins = require('gulp-load-plugins')({ lazy: true });
var del = require('del');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

var fsExtra = require('fs-extra');

module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Copying selected components to the app folder ***');

    var components = global.profileConfig.components;

    components.forEach(copyComponentFolder);

    function copyComponentFolder(component) {
      var source = config.componentsFolder.source + component;
      var target = config.componentsFolder.target;

      fsExtra.copySync(source, target);

      return del(config.componentsFolder.target + '/**/configComponent.js');
    }
  }
};
