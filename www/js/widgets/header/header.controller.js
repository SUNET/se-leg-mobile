/**
 * Header menu controller
 * @param {type} angular
 * @author Ignacio González <igonzalez@emergya.com>
 */

(function () {
  define(['./header.module', 'text!./about.html'], function (moduleName, aboutTemplate) {
    'use strict';
    angular
      .module(moduleName)
      .controller('SeLegHeaderController', SeLegHeaderController);

    /* @ngInject */
    function SeLegHeaderController($scope, $ionicModal, CORE_CONFIGS) {
      var version;

      var vm = this;
      vm.hasHeader = CORE_CONFIGS.HAS_HEADER;
      vm.options = JSON.parse(CORE_CONFIGS.HEADER_OPTIONS);
      vm.isMenuOpened =false;

      vm.openOption = openOption;
      vm.openAbout = openAbout;

      activate();

      /**
       * Needed activation functionalities.
       */
      function activate() {
        cordova.getAppVersion.getVersionNumber()
          .then(function (result) {
            $scope.version = result;
          });

        $scope.about = CORE_CONFIGS.ABOUT;
      }

      function openOption(option) {
        if (!option.url.startsWith('http')) {
          option.url = 'http://' + option.url;
        }
        cordova.InAppBrowser.open(option.url, '_blank', 'location=yes');
      }

      function openAbout() {
        $scope.modal = $ionicModal.fromTemplate(aboutTemplate, {
          scope: $scope
        });

        $scope.modal.show();
      }
    }
  });
})();


