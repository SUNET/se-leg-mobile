/**
 * Give focus to element
 * AngularJS module configuration.
 * @returns {angular.module}
 * @author Alejandro Gomez <amoron@emergya.com>
 */
(function () {

  define([
    'angular'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.widgets.focusMe';

    ng.module(moduleName, []);

    return moduleName;
  });
})();
