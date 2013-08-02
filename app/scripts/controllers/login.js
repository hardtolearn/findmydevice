'use strict';

angular.module('findDeviceApp')
	.controller('LoginCtrl', function($scope, user, $location, localStorageService, Base64) {

    $scope.login = function(user) {

	console.log("trying to log in");

	if ((Base64.encode(user.username) === localStorageService.get('fduser.username')) &&
		(Base64.encode(user.password) === localStorageService.get('fduser.password'))) {
	    // Username and password is correct, log the user in
	    var loggedIn = localStorageService.add('fduser.loggedIn', true);
	    //$scope.session.loggedIn = loggedIn;
	    
	    console.log('Logged in!');
	    $location.path("/main");
	} else {

	    console.log("error loggin in");
	    // TO DO: Display error message
	    $scope.error = "Username or password is incorrect. Please try again";

	}
    };

});
