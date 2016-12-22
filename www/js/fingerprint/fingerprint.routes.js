/**
 * Fingerprint routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Wen Nov 30 2016
 */

(function () {
  define(['./fingerprint.module', 'text!./fingerprint.html'], function (module, fingerprintTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider) {

      $stateProvider.state('fingerprint', {
        url: '/fingerprint',
        params: {
          nin: null,
          qr: null
        },
        template: fingerprintTemplate,
        controller: 'FingerprintController',
        controllerAs: 'fingerprintCtrl'
      });
    }
  });
})();


