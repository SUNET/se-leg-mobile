/**
 * Message controller.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Aejandro Gomez <amoron@emegya.com>
 */

(function () {
  define(['./message.module'], function (moduleName) {
    'use strict';
    angular
      .module(moduleName)
      .controller('MessageController', MessageController);

    /* @ngInject */
    function MessageController($state, $scope, MainFactory) {

      var vm = this;
      vm.errorScreen = false;
      vm.msg = 'message.message';
      vm.title = 'message.title';

      var byDefaultIndex = -1;
      var firstLoad = true;

      // by default
      vm.buttonOptions = [{
          text: 'message.next',
          onClick: function () {
            MainFactory.handleNextComponent();
          },
          default: true
        }];
      // Public methods
      vm.getCurrentButton = getCurrentButton;

      activate();

      $scope.$on('$ionicView.beforeEnter', beforeEnter);

      $scope.$on('$ionicView.enter', cordova.plugins.Keyboard.close);

      /**
       * Method executed once the module is used.
       */
      function activate() {
      }

      /**
       * Once the user accesses to the module, the by default initialization parameters.
       */
      function beforeEnter() {
        if ($state.params && $state.params.data) {
          // initialization of the parameters
          if ($state.params.data.hideLogo) {
            vm.hideLogo = $state.params.data.hideLogo;
          }

          if ($state.params.data.errorScreen) {
            vm.errorScreen = $state.params.data.errorScreen;
          }

          if ($state.params.data.title) {
            vm.title = $state.params.data.title;
          }

          if ($state.params.data.msg) {
            vm.msg = $state.params.data.msg;
          }

          if ($state.params.data.buttonOptions) {
            vm.buttonOptions = $state.params.data.buttonOptions;
            var i = 0;
            while (byDefaultIndex === -1 && i < vm.buttonOptions.length) {
              if (vm.buttonOptions[i].default) {
                byDefaultIndex = i;
              }
              i++;
            }
            // if there is no default button, the first one will be
            if (byDefaultIndex === -1) {
              vm.buttonOptions[0].default = true;
              byDefaultIndex = 0;
            }
          }
        }
      }

      /**
       * It retrieves the current button (the first that satisfied the condition).
       * @returns button according to the vm.buttonOptions elements.
       */
      function getCurrentButton() {
        var button = undefined;
        var index = 0;
        while (button === undefined && index < vm.buttonOptions.length) {
          var element = vm.buttonOptions[index];
          // in the first load, we will get the by default button
          if (firstLoad) {
            if (element.default) {
              button = element;
            }
          } else {
            // We will return the first element that satisfies the condition OR the by default one if there is no
            // element that satisfies its condition
            // if there is no condition, it is the default
            if (element.condition) {
              button = element;
            }
          }
          index++;
        }

        if (button === undefined) {
          button = vm.buttonOptions[byDefaultIndex];
        }
        return button;
      }
    }
  });
})();


