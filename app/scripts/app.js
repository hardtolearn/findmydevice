'use strict';

// var findDeviceApp = angular.module('findDeviceApp', ['LocalStorageModule', 'UserValidation']);
var findDeviceApp = angular.module('findDeviceApp', []);

findDeviceApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
	
});