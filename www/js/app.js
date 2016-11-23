/**
 * Application structure bootstraping.
 * @param {type} angular
 * @author Maria Villalba
 * @since Mon Nov 14 2016
 */
(function () {
  define([
    'angular',
    './core/main',
    // Application modules.
    './scanner/main',
    './identification/main',
    './message/main',
    // Here application widgets
    './widgets/main'// Yeoman hook. Define section. Do not remove this comment.
  ],
    function (angular) {
      'use strict';

      var moduleName = 'app';

      angular
        .module(moduleName, [
          'ionic',
          'app.core',
          'app.scanner',
          'app.identification',
          'app.message',
          'app.widgets'// Yeoman hook. Dependencies section. Do not remove this comment.
        ])
        .config(Config);

      /* @ ngInject */
      function Config($ionicConfigProvider) {
        // Configure the max pages to save in cache
        $ionicConfigProvider.views.maxCache(1);
      }

      return moduleName;

    });
})();
