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
    function LangsService($translate, $log, $rootScope, SE_LEG_LANGS, tmhDynamicLocale) {

      var service = this;

      var localesObj = SE_LEG_LANGS;

      // locales and locales display names
      var _LOCALES = Object.keys(localesObj);
      if (!_LOCALES || _LOCALES.length === 0) {
        $log.error('There are no _LOCALES provided');
      }
      var _LOCALES_DISPLAY_NAMES = [];
      _LOCALES.forEach(function (locale) {
        _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
      });
      // Getting the current locale
      var currentLocale = $translate.proposedLanguage();
      // ------------- public methods
      service.isValidLocale = isValidLocale;
      service.setLocale = setLocale;
      service.getCurrentLocaleDisplayName = getCurrentLocaleDisplayName;
      service.getCurrentLocale = getCurrentLocale;
      service.getSupportedLocalesDisplayNames = getSupportedLocalesDisplayNames;
      service.getSupportedLocales = getSupportedLocales;
      service.setLocaleByDisplayName = setLocaleByDisplayName;
      service.getBrowserLanguage = getBrowserLanguage;

      /**
       * It gets the browser locale.
       * @returns browser locale.
       */
      function getBrowserLanguage() {
        var language = undefined;
        // IE
        if (navigator && navigator.browserLanguage) {
          language = navigator.browserLanguage;
        } else if (navigator && navigator.language) { // All other vendors
          language = navigator.language;
        }

        if (language !== undefined) {
          // changing - for _ char
          language = language.replace('-', '_');
        }
        return language;
      }

      /**
       * It checks if a locale is supported in the app (if exists in langs.constans.js).
       * @param {type} locale
       * @returns {Boolean}
       */
      function isValidLocale(locale) {
        return _LOCALES.indexOf(locale) !== -1;
      }

      /**
       * It sets the locale (if it's a supported one).
       * @param {type} locale
       */
      function setLocale(locale) {
        if (!isValidLocale(locale)) {
          $log.error('Locale name "' + locale + '" is invalid');
          return;
        }
        currentLocale = locale; // updating current locale

        // asking angular-translate to load and apply proper translations
        $translate.use(locale);
      }

      /**
       * Getting the current locale.
       * @returns {locale}
       */
      function getCurrentLocale() {
        return currentLocale;
      }

      /**
       * Getting the current locale display name.
       * @returns {langs_service_L10.LangsService.localesObj}
       */
      function getCurrentLocaleDisplayName() {
        return localesObj[currentLocale];
      }

      /**
       * Getting the list of supported locales (names).
       * @returns {Array}
       */
      function getSupportedLocalesDisplayNames() {
        return _LOCALES_DISPLAY_NAMES;
      }

      /**
       * Getting the list of supported locales.
       * @returns {Array}
       */
      function getSupportedLocales() {
        return _LOCALES;
      }

      /**
       * Sets the locale using the display name.
       * @param localeDisplayName locale name to be used.
       */
      function setLocaleByDisplayName(localeDisplayName) {
        setLocale(
          _LOCALES[
            _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
          ]
          );
      }

      // Important!: On successful applying translations by angular-translate
      $rootScope.$on('$translateChangeSuccess', function (event, data) {
        document.documentElement.setAttribute('lang', data.language); // sets "lang" attribute to html
        // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
        tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
      });
      return service;

    }
  });

})();


