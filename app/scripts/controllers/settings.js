'use strict';

angular.module('findDeviceApp').controller('SettingsCtrl', function($scope, userSettings, localStorageService, Base64) {



    console.log('Testing passkey:');
    var passkey = userSettings.passkey();
    console.log(passkey);

    console.log('set pass key');
    var setpasskey = userSettings.setPasskey('myNewPassKey');
    console.log(setpasskey);

    var cmdArray = userSettings.getCommands();
    console.log(cmdArray);

    function init($scope) {
	$scope.settings = {};
	$scope.settings.lostCmd = cmdArray.lostCmd;
	$scope.settings.foundCmd = cmdArray.foundCmd;
    }

    init($scope);

    $scope.save = function(settings) {
	console.log(settings.foundCmd);
	console.log(settings);

	var passkey = settings.passkey;
	if (passkey) {
	    passkey = Base64.encode(passkey);
	    console.log(passkey);
	}

	// Save user details 
	localStorageService.add('fdsettings.lostCmd', settings.lostCmd);
	localStorageService.add('fdsettings.foundCmd', settings.foundCmd);
	if (passkey) {
	    localStorageService.add('fdsettings.passkey', passkey);
	}
	/*
	 // Load the User Controller to insert the local storage into the User Object
	 $location.path( "/login" ); 
	 */
    };

});
