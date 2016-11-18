/**
 * Langs module
 * @param {type} angular
 * @returns {angular.module}
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since
 */

(function () {

  define([
    'angular',
    'ngTranslate',
    'ngTranslateLoaderStaticFiles',
    'ngDynamicLocale',
    'ngTranslateHandlerLog',
    'ngTranslateStorageLocal',
    'ngTranslateStorageCookie',
    'ngCookies',
    'ngSanitize'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.core.langs';

    ng.module(moduleName, ['ngCookies', 'ngSanitize', 'tmh.dynamicLocale', 'pascalprecht.translate'])
      .config(config)
      .run(run);

    return moduleName;

    /* @ngInject */
    function config($translateProvider, tmhDynamicLocaleProvider, CORE_CONFIGS, SE_LEG_GLOBAL) {
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters').useStaticFilesLoader({
        prefix: SE_LEG_GLOBAL.LANGUAGE.LOCATION + SE_LEG_GLOBAL.LANGUAGE.PREFIX,
        suffix: SE_LEG_GLOBAL.LANGUAGE.SUFFIX
      });
      $translateProvider.preferredLanguage(CORE_CONFIGS.DEFAULT_LANGUAGE); // on first load
      $translateProvider.useMissingTranslationHandlerLog();
      $translateProvider.useLocalStorage();// saves selected language to localStorage
      // loadING the $locale settings files for angular-dynamic-locale
      tmhDynamicLocaleProvider.localeLocationPattern(SE_LEG_GLOBAL.LANGUAGE.LOCALE_DEFINITIONS_LOCATION
        + '/angular-locale_{{locale}}.js');
    }

    /**
     * Run function on startup language mudules.
     * @param {type} $translate
     * @param {type} CORE_CONFIGS
     * @param {type} SE_LEG_LANGS
     * @returns {langs.module_L28.run}
     */

    /* @ngInject*/
    function run($translate, CORE_CONFIGS, LangsService) {
      // default language
      var language = CORE_CONFIGS.DEFAULT_LANGUAGE;
      var browserLanguage = LangsService.getBrowserLanguage();
      if (browserLanguage !== undefined) {
        var isBrowserLanguageValid = LangsService.isValidLocale(browserLanguage);
        if (isBrowserLanguageValid) {
          language = browserLanguage;
        } else {
          // if the browser language is not valid, we try to look for the simplified language
          browserLanguage = browserLanguage.split('_')[0];
          isBrowserLanguageValid = LangsService.isValidLocale(browserLanguage);
          if (isBrowserLanguageValid) {
            language = browserLanguage;
          }
        }
      }
      $translate.use(language);
    }
  });
})();


