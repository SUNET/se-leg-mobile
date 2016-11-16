/**
 * Langs service
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */


(function () {
  define(['./langs.module'], function (module) {
    'use strict';

    angular.module(module).service('LangsService', LangsService);

    /* @ngInject */
    function LangsService(SE_LEG_LANGS, CORE_CONFIGS) {

      var service = this;

      service.isValidLanguage = isValidLanguage;
      service.getLocale = getLocale;

      /**
       * Returns the locale (if it's a supported one).
       * @returns {type} language
       */
      function getLocale() {
        // default language
        var language = CORE_CONFIGS.DEFAULT_LANGUAGE;
        if (navigator && navigator.language) {
          language = navigator.language.split('-')[0];
          if (isValidLanguage(language)) {
            language = CORE_CONFIGS.DEFAULT_LANGUAGE;
          }
        }
        return language;
      }

      /**
       * It checks if a language is supported in the app.
       * @param {type} language
       * @returns {Boolean}
       */
      function isValidLanguage(language) {
        var supportedLanguages = [SE_LEG_LANGS.EN, SE_LEG_LANGS.ES];
        return supportedLanguages.indexOf(language) === -1;
      }

    }
  });

})();


