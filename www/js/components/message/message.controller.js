/**
 * Message controller.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Aejandro Gomez <amoron@emegya.com>
 */

(function () {
  define(['./message.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('MessageController', MessageController);
    /* @ngInject */
    function MessageController($state, $translate, SE_LEG_VIEWS, MainFactory) {

      var vm = this;

      vm.errorScreen = false;
      vm.msg = 'message.message';
      vm.title = 'message.title';
      // by default
      vm.buttonOptions = [{
          text: 'message.next',
          onClick: function () {
            MainFactory.handleNextComponent();
          }
        }];

      // Public methods
      vm.start = start;
      vm.closeApp = closeApp;
      vm.fingerprint = fingerprint;

      activate();

      /**
       * Method executed once the module is used.
       */
      function activate() {
        if ($state.params) {
          // initialization of the parameters
          if ($state.params.errorScreen) {
            vm.errorScreen = $state.params.errorScreen;
          }

          if ($state.params.title) {
            vm.title = $state.params.title;
          }

          if ($state.params.msg) {
            vm.msg = $state.params.msg;
          }

          if ($state.params.buttonOptions) {
            vm.buttonOptions = $state.params.buttonOptions;
          }
        }
      }

      /**
       * Start a new vet
       */
      function start() {
        $state.go(SE_LEG_VIEWS.SCANNER);
      }

      /**
       * Close App
       */
      function closeApp() {
        if (navigator && navigator.app) {
          navigator.app.exitApp();
        }
      }

      function fingerprint() {
        return vm.msg === "fingerprint.error.notFingerprint";
      }

    }
  });
})();


