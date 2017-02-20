/**
 * Fingerprint routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Wen Nov 30 2016
 */

(function () {
  define(['./fingerprint.module', 'text!./fingerprint.html'],
    function (module, fingerprintTemplate) {
      'use strict';
      angular
        .module(module)
        .config(config);

      /* @ngInject */
      function config($stateProvider, SE_LEG_VIEWS) {

        $stateProvider.state(SE_LEG_VIEWS.FINGERPRINT, {
          url: '/' + SE_LEG_VIEWS.FINGERPRINT,
          // needed to by-pass data to the controller through the $stateProvider
          params: {
            data: {},
            handled: false
          },
          template: fingerprintTemplate,
          controller: 'FingerprintController',
          controllerAs: 'fingerprintCtrl'
        });
      }

    });
})();
