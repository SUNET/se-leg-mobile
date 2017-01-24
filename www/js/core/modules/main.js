/**
 * Core module RequireJS configuration.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Mon Nov 14 2016
 */

(function () {
  define([
    // Here files modules internal files referencies.
    './core.module',
    './langs/main',
    // Constants Module.
    './constants/main',
    // Permissions
    './permissions/main',
    // Fingerprint Scanner
    './fingerprintScanner/main'
  ], function () {
  });
})();
