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
    'ngTranslateLoaderStaticFiles'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.core.langs';

    ng.module(moduleName, ['pascalprecht.translate'])
      .config(config)
      .run(run);

    return moduleName;

    /* @ngInject */
    function config($translateProvider, SE_LEG_LANGS) {
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters').useStaticFilesLoader({
        prefix: SE_LEG_LANGS.LOCATION + SE_LEG_LANGS.PREFIX,
        suffix: SE_LEG_LANGS.SUFFIX
      });
    }

    /**
     * Run function on startup language mudules.
     * @param {type} $translate
     * @param {type} CORE_CONFIGS
     * @param {type} SE_LEG_LANGS
     * @returns {langs.module_L28.run}
     */

    /* @ngInject*/
    function run($translate, LangsService) {
      var language = LangsService.getLocale();

      $translate.use(language);
    }
  });
})();


