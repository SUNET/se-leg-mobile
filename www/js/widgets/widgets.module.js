/**
 * Main module.
 * @param {type} angular
 * @author Maria Villalba
 * @since Mon Nov 14 2016
 */
(function () {
  define([
    'angular'// Yeoman hook. Define section. Do not remove this comment.
  ],
    function (ng) {
      'use strict';
      var moduleName = 'app.widgets';

      ng.module(moduleName,
        [
          'app.widgets.focusMe',
          'app.widgets.seLegHeader'
        ]);

      return moduleName;
    });
})();