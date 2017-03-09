/**
 * Fingerprint controller
 * @param {type} angular
 * @author Ignacio González <igonzalez@emergya.com>
 */

(function () {
  define(['./header.module'], function (moduleName) {
    'use strict';
    angular
      .module(moduleName)
      .controller('SeLegHeaderController', SeLegHeaderController);

    /* @ngInject */
    function SeLegHeaderController(CORE_CONFIGS) {

      var vm = this;
      vm.hasHeader = CORE_CONFIGS.HAS_HEADER;
      vm.options = JSON.parse(CORE_CONFIGS.HEADER_OPTIONS);
      vm.isMenuOpened =false;

      vm.openOption = openOption;

      activate();

      /**
       * Needed activation functionalities.
       */
      function activate() {

      }

      function openOption(option) {
        if (!option.url.startsWith('http')) {
          option.url = 'http://' + option.url;
        }
        cordova.InAppBrowser.open(option.url, '_blank', 'location=yes');
      }

    }
  });
})();


