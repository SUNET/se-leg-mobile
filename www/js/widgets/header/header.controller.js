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
    function SeLegHeaderController($ionicPopover, CORE_CONFIGS) {
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
            version = result;
          });
      }

      function openOption(option) {
        if (!option.url.startsWith('http')) {
          option.url = 'http://' + option.url;
        }
        cordova.InAppBrowser.open(option.url, '_blank', 'location=yes');
      }

      function openAbout() {
        vm.popover = $ionicPopover.fromTemplate(aboutTemplate, {
          scope: {
            closeAbout: function () {
              vm.popover.remove();
            },
            version: version
          }
        });

        vm.popover.show();
      }
    }
  });
})();


