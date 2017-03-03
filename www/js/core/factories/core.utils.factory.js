/**
 * Application utils factory. Here generic utils methods.
 *
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Tue Nov 22 2016
 */

(function () {
  define(['./core.factories.module'], function (module) {
    'use strict';

    angular
      .module(module)
      .factory('UtilsFactory', UtilsFactory);

    /* @ngInject */
    function UtilsFactory($ionicConfig, $ionicHistory, $state, SE_LEG_GLOBAL, SE_LEG_VIEWS) {

      var factory = this;
      factory.className = '[UtilsFactory]';

      factory.isEmpty = isEmpty;
      factory.isNotEmpty = isNotEmpty;
      factory.isNumber = isNumber;
      factory.hasConnectivity = hasConnectivity;
      factory.closeApp = closeApp;
      factory.getPlatform = getPlatform;
      factory.isIosPlatform = isIosPlatform;
      factory.getCurrentState = getCurrentState;
      factory.jsonToQueryString = jsonToQueryString;

      return factory;


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

      /**
       * It checks if the device has internet connection.
       * @returns {Boolean}
       */
      function hasConnectivity() {
        var connected = true;
        if (navigator && navigator.connection && navigator.connection.type) {

          if (navigator.connection.type === 'none') {
            connected = false;
          }

        }
        return connected;
      }

      /**
       * It closes the app showing an error if it's defined.
       * @param {type} message to be shown (can be undefined). Error should be a JSON {title:XX,text:YY}.
       */
      function closeApp(message) {
        if (getPlatform() === SE_LEG_GLOBAL.PLATFORMS.IOS) {
          cordova.plugins.Keyboard.close();

          $ionicConfig.views.swipeBackEnabled(false);

          $state.go(SE_LEG_VIEWS.MESSAGE,
            {
              data: {
                errorScreen: message ? message.isError : true,
                title: message ? message.title || 'error.generic.title' : 'error.generic.title',
                msg: message ? message.message || 'error.generic.message' : 'error.generic.message',
                buttonOptions: []
              }
            });
        } else {
          cordova.plugins.Keyboard.close();

          $ionicConfig.views.swipeBackEnabled(false);

          $state.go(SE_LEG_VIEWS.MESSAGE,
            {
              data: {
                errorScreen: message ? message.isError : true,
                title: message ? message.title || 'error.generic.title' : 'error.generic.title',
                msg: message ? message.message || 'error.generic.message' : 'error.generic.message',
                buttonOptions: [
                  {
                    condition: true,
                    text: 'message.close',
                    onClick: function () {
                      ionic && ionic.Platform && ionic.Platform.exitApp();
                    },
                    default: true
                  }
                ]
              }
            });
        }
      }

      /**
       * Gets actual device platform string name.
       * @returns the platform name (defined in SE_LEG_GLOBAL.PLATFORMS)
       */
      function getPlatform() {
        var platform = SE_LEG_GLOBAL.PLATFORMS.UNKNOWN;
        // if it's ionic stack
        if (ionic && ionic.Platform) {
          if (ionic.Platform.isAndroid()) {
            platform = SE_LEG_GLOBAL.PLATFORMS.ANDROID;
          } else if (ionic.Platform.isIOS()) {
            platform = SE_LEG_GLOBAL.PLATFORMS.IOS;
          }
        } else if (cordova && cordova.platform) {
          // if the platform couldn't be resolved previously (not Ionic
          var cordovaPlatform = device.platform.toUpperCase();
          if (cordovaPlatform === SE_LEG_GLOBAL.PLATFORMS.ANDROID) {
            platform = SE_LEG_GLOBAL.PLATFORMS.ANDROID;
          } else if (cordovaPlatform === SE_LEG_GLOBAL.PLATFORMS.IOS) {
            platform = SE_LEG_GLOBAL.PLATFORMS.IOS;
          }
        }
        return platform;
      }

      function isIosPlatform() {
        return getPlatform() === SE_LEG_GLOBAL.PLATFORMS.IOS;
      }

      /**
       * It returns the current ionic view.
       * @returns String with the current ionic view.
       */
      function getCurrentState() {
        return $ionicHistory.currentView().stateName;
      }

      /**
       * It converts a JSON into a query string.
       * @param json to be converted.
       * @returns query string.
       */
      function jsonToQueryString(json) {
        var queryString = '';
        if (angular.isDefined(json) && angular.isObject(json)) {
          for (var key in json) {
            if (queryString !== '') {
              queryString += '&';
            }
            queryString += getQueryStringKeyValueFromJSONNode(key, json[key]);
          }
        }
        return queryString;
      }

      /////////////////////
      // Private methods //
      /////////////////////

      /**
       * It retrieves a query string value from a given json value.
       * @param key to be used in the query string.
       * @param value to be transformed to query string value.
       * @returns a query string value from a json value.
       */
      function getQueryStringKeyValueFromJSONNode(key, value) {
        var stringValue = '';
        if (angular.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            if (i > 0) {
              stringValue += '&';
            }
            stringValue += key + '[]=' + value[i];
          }
        } else {
          stringValue = key + '=' + value;
        }
        return stringValue;
      }
    }

  });
})();
