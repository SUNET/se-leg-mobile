/**
 * Single factory pattern to get the instance of a needed permissions handler.
 *
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
    define(['./../permissions.module'],
        function (moduleName) {
            'use strict';
            // defining the factory
            angular.module(moduleName)
                .factory('PermissionsStrategyFactory', PermissionsStrategyFactory);

            /* @ngInject */
            function PermissionsStrategyFactory(PermissionsDefaultFactory, PermissionsAndroidFactory, PermissionsIosFactory) {
                var factory = this;

                var PLATFORMS = {
                    UNKNOWN: "UNKNOWN",
                    ANDROID: "ANDROID",
                    IOS: "IOS",
                    WINDOWS: "WINDOWS"
                };

                factory.getPermissionsHandler = getPermissionsHandler;
                factory.getPlatform = getPlatform;
                factory.PLATFORMS = PLATFORMS;

                //////////////////////////////////

                /**
                 * It retrieves a permissions handler depending on the platform.
                 * @param platform to retrieve the handler.
                 * @returns {undefined}
                 */
                function getPermissionsHandler(platform) {
                    if (platform === undefined) {
                        var platform = getPlatform();
                    }
                    var handler = PermissionsDefaultFactory;
                    switch (platform) {
                        case PLATFORMS.ANDROID:
                            handler = PermissionsAndroidFactory;
                            break;
                        case PLATFORMS.IOS:
                            handler = PermissionsIosFactory;
                            break;
                        case PLATFORMS.UNKNOWN:
                            handler = PermissionsDefaultFactory;
                            break;
                        default:
                            handler = PermissionsDefaultFactory;
                            break;
                    }
                    return handler;
                }

                /**
                 * Method to retrieve the PLATFORM in runtime mode.
                 * @returns {PLATFORM}
                 */
                function getPlatform() {
                    var platform = PLATFORMS.UNKNOWN;
                    // if it's ionic stack
                    if (ionic && ionic.Platform) {
                        if (ionic.Platform.isAndroid()) {
                            platform = PLATFORMS.ANDROID;
                        } else if (ionic.Platform.isIOS()) {
                            platform = PLATFORMS.IOS;
                        }
                    } else if (cordova && cordova.platform) {
                        // if the platform couldn't be resolved previously (not Ionic
                        var cordovaPlatform = device.platform.toUpperCase();
                        if (cordovaPlatform === PLATFORMS.ANDROID) {
                            platform = PLATFORMS.ANDROID;
                        } else if (cordovaPlatform === PLATFORMS.IOS) {
                            platform = PLATFORMS.IOS;
                        }
                    }
                    return platform;
                }

                return factory;
            }

        });
})();
