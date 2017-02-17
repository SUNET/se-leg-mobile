/**
 * Fingerprint
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Wen Nov 30 2016
 */

(function () {
  define([
    // Here files modules internal files references.
    './fingerprint.routes',
    './fingerprint.factory',
    './fingerprint.controller',
    './strategy/fingerprintScanner.strategy.factory',
    './strategy/fingerprintScanner.default.factory',
    './strategy/fingerprintScanner.android.factory',
    './strategy/fingerprintScanner.ios.factory'
      // ...
  ], function () {
  });
})();
