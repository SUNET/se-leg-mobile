/**
 * Fingerprint scanner module main file.
 * @param {type} angular
 * @author Ignacio González <igonzalez@emergya.com>
 */
(function () {
  define([
    // Internal files references.
    './fingerprintScanner.factory',
    './strategy/fingerprintScanner.strategy.factory',
    './strategy/fingerprintScanner.default.factory',
    './strategy/fingerprintScanner.android.factory',
    './strategy/fingerprintScanner.ios.factory'
  ], function () {
  });
})();

