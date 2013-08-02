'use strict';

angular.module('findDeviceApp')
	.controller('LogoutCtrl', function($scope, user, $location, localStorageService) {

    $scope.logout = function(user) {

	console.log("logging out");

	var loggedIn = localStorageService.add('fduser.loggedIn', false);
	
    };

});
