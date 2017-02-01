/**
 * Fingerprint Verification routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Thu Dec 1 2016
 */

(function () {
  define(['./fingerprintVerification.module', 'text!./fingerprintVerification.html'], function (module,
    fingerprintVerificationTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider) {

      $stateProvider.state('fingerprintVerification', {
        url: '/fingerprintVerification',
        template: fingerprintVerificationTemplate,
        controller: 'FingerprintVerificationController',
        controllerAs: 'fingerprintVerificationCtrl'
      });
    }
  });
})();