/**
 * Application utils factory. Here generic utils methods.
 *
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Tue Nov 22 2016
 */

(function () {
  define(['./core.factories.module'], function (module) {
    'use strict';

    angular
      .module(module)
      .factory('UtilsFactory', UtilsFactory);

    /* @ngInject */
    function UtilsFactory() {

      var vm = this;
      vm.className = '[UtilsFactory]';

      vm.isEmpty = isEmpty;
      vm.isNotEmpty = isNotEmpty;
      vm.isNumber = isNumber;

      return vm;


      // Implementations ////

      /**
       * Check if an object is empty or null.
       * @param {type} obj
       * @returns {Boolean}
       */
      function isEmpty(obj) {
        var result = false;
        // Null and undefined are "empty"
        if (obj === undefined || obj === null) {
          result = true;
        } else {
          if (obj.length === 0) {
            result = true;
          }
        }
        return result;
      }

      /*
       * Check if an object is NOT empty or null.
       * @param {type} obj
       * @returns {Boolean}
       */
      function isNotEmpty(obj) {
        return !isEmpty(obj);
      }
      /**
       * Checks number value.
       * @param {type} n
       * @returns {Boolean}
       */
      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
    }

  });
})();
