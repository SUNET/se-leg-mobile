/**
 * Identification controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 */

(function () {
  define(['./identification.module'], function (moduleName) {
    'use strict';
    angular
      .module(moduleName)
      .controller('IdentificationController', IdentificationController);

    /* @ngInject */
    function IdentificationController($ionicPopup, $translate, $scope, $state, SE_LEG_VIEWS, UtilsFactory, MainFactory,
      DataFactory) {

      var vm = this;

      // Public attributes
      var inputIDSelector = 'new-col-input';

      // Public methods
      vm.send = send;
      vm.correctFormat = defaultCorrectFormat;
      vm.hasInternetConnection = hasInternetConnection;

      activate();
      $scope.$on('$ionicView.enter', onEnter);
      function activate() {
      }

      /**
       * Method to be executed once the user accesses to the scanner component.
       */
      function onEnter() {
        // clearing previous data
        DataFactory.clear(SE_LEG_VIEWS.ID);
        if ($state.params && $state.params.data) {
          // initialization of the parameters
          if ($state.params.formatHandler) {
            vm.correctFormat = $state.params.formatHandler;
          }
        }

        if (!hasInternetConnection()) {
          $ionicPopup.alert({
            title: $translate.instant('connection.title'),
            template: $translate.instant('connection.template')
          });
        }
      }


      /**
       * Send identification.
       */
      function send() {
        if (vm.nationaIdNumber && vm.correctFormat()) {
          // saving the associated data
          DataFactory.save(SE_LEG_VIEWS.ID, vm.nationaIdNumber);
          MainFactory.handleNextComponent();
        }
      }

      /////////////////////
      // Private methods //
      /////////////////////

      /**
       * Method that checks if it a leap year.
       * @param year to be checked.
       * @return {boolean} is a leap year.
       */
      function isLeapYear(year) {
        var isLeap = false;
        if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
          isLeap = true;
        }
        return isLeap;
      }

      /**
       * It checks if the given date is valid.
       * @param year to be checked.
       * @param month to be checked.
       * @param day to be checked.
       * @return true if the date is correct.
       */
      function isCorrectDate(year, month, day) {
        var correct = true;
        var daysPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year <= 1600 || year >= 9999) {
          correct = false;
        } else
        if (correct && (month <= 0 || month > 12)) {
          correct = false;
        }
        if (correct && (day <= 0 || day > 31)) {
          correct = false;
        }
        if (correct && (month === 2 && day > 29)) {
          correct = false;
        }
        if (correct && (daysPerMonth[month - 1] < day)) {
          correct = false;
        }
        if (correct && (month === 2 && day === 29 && !isLeapYear(year))) {
          correct = false;
        }
        return correct;
      }

      /**
       * It checks if the given format is valid.
       * @param format to be checked.
       * @return true if the format is valid.
       */
      function isValidFormat(format) {
        if (format.length === 12) {
          var day = parseInt(format.substr(6, 2));
          var month = parseInt(format.substr(4, 2));
          var year = parseInt(format.substr(0, 4));
          var idNumber = format.substr(8, 4);
          if (isCorrectDate(year, month, day) && UtilsFactory.isNumber(idNumber)) {
            return true;
          }
        }
        return false;
      }

      /**
       * By default format method.
       * @return true if the format is valid.
       */
      function defaultCorrectFormat() {
        if (hasInternetConnection() && !UtilsFactory.isEmpty(vm.nationaIdNumber)) {
          var nationaIdNumber = vm.nationaIdNumber.toString();
          if (isValidFormat(nationaIdNumber)) {
            // needed to auto-open the keyboard
            document.getElementById(inputIDSelector).blur();
            return true;
          }
        }
        // needed to auto-open the keyboard
        document.getElementById(inputIDSelector).focus();
        return false;
      }

      /**
       * Wrap of {@link UtilsFactory.hasConnectivity()}.
       */
      function hasInternetConnection() {
        return UtilsFactory.hasConnectivity();
      }
    }
  });
})();


