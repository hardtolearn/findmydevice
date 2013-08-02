'use strict';

var findDeviceApp = angular.module('findDeviceApp', ['LocalStorageModule', 'UserValidation']);
//var findDeviceApp = angular.module('findDeviceApp', []);

findDeviceApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/userSettings', {
        templateUrl: 'views/userSettings.html',
        controller: 'UsersettingsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/createAccount', {
	templateUrl: 'views/createAccount.html',
        controller: 'CreateAccountCtrl'  
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  
  