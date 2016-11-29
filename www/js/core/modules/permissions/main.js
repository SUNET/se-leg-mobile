/**
 * Permissions module main file.
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
    define([
        // Internal files references.
        './permissions.provider',
        './permissions.factory',
        './strategy/permissions.strategy.factory',
        './strategy/permissions.default.factory',
        './strategy/permissions.android.factory',
        './strategy/permissions.ios.factory'
    ], function () {
    });
})();

