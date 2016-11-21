/**
 * Identification controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./identification.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('IdentificationController', IdentificationController);
    /* @ngInject */
    function IdentificationController(IdentificationService, $state, SE_LEG_VIEWS) {

      var vm = this;
      // Public attributes
      vm.nationaIdNumber = undefined;
      vm.serviceData = {
        code: $state.params.scanner,
        nationalIdNumber: vm.nationaIdNumber
      }

      // Public methods
      vm.send = send;
      /**
       * Send identification.
       */
      function send() {
        if (vm.nationaIdNumber) {
          vm.serviceData.nationalIdNumber = vm.nationaIdNumber;
          /*IdentificationService.post(vm.serviceData).then(function (result) {

           }).catch(function (err) {
           // an error occurred
           });
           } else {
           }

           */
        }

      }
      //$state.go(SE_LEG_VIEWS.MESSAGE);

    }
  });
})();


