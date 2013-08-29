'use strict';

// var findDeviceApp = angular.module('findDeviceApp', ['LocalStorageModule', 'UserValidation']);
var findDeviceApp = angular.module('findDeviceApp', ['LocalStorageModule', 'UserValidation']);

findDeviceApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
	
});