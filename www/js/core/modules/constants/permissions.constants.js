/**
 * Permissions constants.
 *
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
  define(['./constants.module'], function (moduleName) {
    'use strict';
    /**
     * Permissions constants.
     * Here all app permissions constants.
     *  - Android: https://developer.android.com/reference/android/Manifest.permission.html?hl=zh-tw
     */
    angular
      .module(moduleName)
      .constant('SELEG_PERMISSIONS', {
        CAMERA: {
          ANDROID: [
            'android.permission.CAMERA',
            'android.permission.FLASHLIGHT'
          ],
          IOS: [{
              requestMethod: 'requestCameraPermission',
              permission: 'Camera'
            }]}
      });
  });
})();

