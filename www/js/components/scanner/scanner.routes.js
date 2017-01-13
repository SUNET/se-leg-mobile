/**
 * Scanner routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Mon Nov 14 2016
 */

(function () {
  define(['./scanner.module', 'text!./scanner.html'], function (module, scannerTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider, SE_LEG_VIEWS) {

      $stateProvider.state(SE_LEG_VIEWS.SCANNER, {
        url: '/' + SE_LEG_VIEWS.SCANNER,
        template: scannerTemplate,
        controller: 'ScannerController',
        controllerAs: 'scannerCtrl'
      });

    }
  });
})();