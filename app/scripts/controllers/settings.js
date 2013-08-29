/*
 * A user setting page, that allows the user to set the commands used in text messages
 * as well as update the passkey
 */
'use strict';

angular.module('findDeviceApp').controller('SettingsCtrl', function($scope, userSettings) {

    // Get the list of commands 
    var cmdArray = userSettings.getCommands();
    
    /*
     * Pass the saved commands into the input fields via the $scope method
     *   
     * @param {type} $scope
     * @returns {undefined}
     */
    function init($scope) {
	$scope.settings = {};
	$scope.settings.lostCmd = cmdArray.lostCmd;
	$scope.settings.foundCmd = cmdArray.foundCmd;
    }

    init($scope);

    /*
     * Save the input entered via the user.
     * Get the input entered into the field's via the $scope.setting array.
     * And then write it to local storage
     *  
     * @param {type} settings
     */
    $scope.save = function(settings) {

	// Save the commands 
	userSettings.setLostCmd(settings.lostCmd);
	userSettings.setFoundCmd(settings.foundCmd);
	
	// Only save the passkey if the field isn't empty
	var passkey = settings.passkey;
	if (passkey) {
	    userSettings.setPasskey(passkey);
	}
	
	// TO DO:
	// Display an notivation to inform the user that the settings have been saved
	
	/*
	 // Load the User Controller to insert the local storage into the User Object
	 $location.path( "/login" ); 
	 */
    };

});
