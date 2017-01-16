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
    // Main app module
    './main/main',
    // data module
    './data/main',
    // components
    './components/scanner/main',
    './components/message/main',
    './components/fingerprint/main',
    // Another app modules.
    './identification/main',
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
          'app.main',
          'app.data',
          'app.scanner',
          'app.identification',
          'app.message',
          'app.fingerprint',
          'app.widgets'// Yeoman hook. Dependencies section. Do not remove this comment.
        ])
        .config(Config);

      /* @ ngInject */
      function Config($ionicConfigProvider, PermissionsProvider, SELEG_PERMISSIONS) {
        // Configure the max pages to save in cache
        $ionicConfigProvider.views.maxCache(1);

        // configuring the permissions to be handled
        PermissionsProvider.setConfigObject(SELEG_PERMISSIONS);
      }

      return moduleName;

    });
})();
