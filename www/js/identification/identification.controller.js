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
    function IdentificationController(IdentificationService, $state, SE_LEG_VIEWS, UtilsFactory) {

      var vm = this;
      // Public attributes
      vm.nationaIdNumber = undefined;
      vm.d = undefined;
      vm.m = undefined;
      vm.y = undefined;
      vm.serviceData = undefined;


      // Public methods
      vm.send = send;
      vm.correctFormat = correctFormat;

      /*if (window.cordova && window.cordova.plugins.Keyboard) {
       window.cordova.plugins.Keyboard.disableScroll(true);
       }*/

      /**
       * Send identification.
       */
      function send() {
        if (vm.nationaIdNumber) {
          vm.serviceData = "identity=" + vm.nationaIdNumber + "&qrcode=" + $state.params.scanner
          vm.serviceData = vm.serviceData.split(" ").join("");
          IdentificationService.post(vm.serviceData).then(function (data) {
            $state.go(SE_LEG_VIEWS.FINGERPRINT);
          }).catch(function (err) {
            $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: err.errorMessage});
          });
        }
      }


      function isLeapYear() {
        if (vm.y % 4 == 0 && (vm.y % 100 != 0 || vm.y % 400 == 0))
          return true;
        else
          return false;
      }

      /**
       *
       */
      function isCorrectDate() {
        var arrayDiasMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (vm.y <= 1600 || vm.y >= 9999)
          return false;
        if (vm.m <= 0 || vm.m > 12)
          return false;
        if (vm.d <= 0 || vm.d > 31)
          return false;
        if (vm.m == 2 && vm.d > 29)
          return false;
        if (arrayDiasMes[vm.m - 1] < vm.d)
          return false;
        if (vm.m == 2 && vm.d == 29 && !isLeapYear())
          return false;
        return true;
      }

      /**
       *
       */
      function isValidFormat(format) {
        if (format.length === 12) {

          vm.d = parseInt(format.substr(6, 2));
          vm.m = parseInt(format.substr(4, 2));
          vm.y = parseInt(format.substr(0, 4));

          vm.number = format.substr(8, 4);

          if (isCorrectDate() && UtilsFactory.isNumber(vm.number)) {
            return true;
          }
        }
        return false;
      }

      /**
       *
       */
      function correctFormat() {

        if (!UtilsFactory.isEmpty(vm.nationaIdNumber)) {
          vm.nationaIdNumber.trim();
          if (isValidFormat(vm.nationaIdNumber)) {
            return true;
          }
        }
        return false;
      }

    }
  });
})();


