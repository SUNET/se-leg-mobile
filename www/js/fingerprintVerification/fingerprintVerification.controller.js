/**
 * Fingerprint Verification controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./fingerprintVerification.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('FingerprintVerificationController', FingerprintVerificationController);
    /* @ngInject */
    function FingerprintVerificationController($state, SE_LEG_VIEWS) {

      var vm = this;
      vm.msg = 'fingerprintVerification.message';
      vm.title = 'fingerprintVerification.title';
      activate();
      function activate() {
      }

      // Public methods
      vm.fingerprintVerification = fingerprintVerification;
      /**
       * Continue fingerprint verification
       */
      function fingerprintVerification() {
        $state.go(SE_LEG_VIEWS.SCANNER);
      }

    }
  });
})();


