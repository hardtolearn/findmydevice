/*
 * Allow the user to set their own passkey and message command,
 * which are then saved on the device's local storage. 
 * The script also checks to see if the app is run for the first time, 
 * it will set the default commands.
 * 
 * The passkey will be encypted, ensuring for an added level of security. 
 */
'use strict';

angular.module('findDeviceApp').factory('userSettings', function(Base64, localStorageService) {

    // Create an array of commands
    var getCommands = function() {
	return {
	    lostCmd: getLostCmd(),
	    foundCmd: getFoundCmd()
	};
    };

    /*
     * Get the passkey saved in local storage, and if there is no passkey,
     * use the default passkey
     * 
     * @return (string) passkey
     */
    var getPasskey = function() {

	var passkey;

	// Check to see if a passkey exists in local storage
	if (localStorageService.get('fdsettings.passkey') === null && localStorageService.get('fdsettings.passkey') !== '') {
	    // TO DO: 
	    // Save the default passkey into local storage
	    passkey = 'myPassKey';
	} else {
	    // Get the passkey from storage
	    passkey = localStorageService.get('fdsettings.passkey');
	}

	return passkey;
    };

    /*
     * Encrypt the passkey before saving it onto local stoage 
     * And return confirmation that it was saved into local storage correctly 
     * 
     * @return (boolean) localstorage.add() 
     */
    var setPasskey = function(p) {
	var passkey = Base64.encode(p);
	return localStorageService.add('fdsettings.passkey', passkey);
    };

    /*
     * Get the command to find a lost device that is stored on local storage.
     * If there is no command saved, use the default command
     * 
     * @return (string) lostCmd
     */
    var getLostCmd = function() {
	var lostCmd;

	// Check to see if the command exists in local storage
	if (localStorageService.get('fdsettings.lostCmd') === null && localStorageService.get('fdsettings.lostCmd') !== '') {
	    // TO DO: 
	    // Save the default passkey into local storage
	    lostCmd = 'find me';
	} else {
	    // Get the command from local storage
	    lostCmd = localStorageService.get('fdsettings.lostCmd');
	}

	return lostCmd;
    };

    // TO DO:
    // Save all commands within one function, instead of multiple set commands
    
    /*
     * Saving the command onto local stoage 
     * And return confirmation that it was saved into local storage correctly 
     * 
     * @return (boolean) localstorage.add() 
     */
    var setLostCmd = function(c) {
	return localStorageService.add('fdsettings.lostCmd', c);
    };

    /*
     * Get the command to set the device as found, that is stored on local storage.
     * If there is no command saved, use the default command
     * 
     * @return (string) foundCmd
     */    
    var getFoundCmd = function() {
	var foundCmd;

	// Check to see if the command exists in local storage
	if (localStorageService.get('fdsettings.foundCmd') === null && localStorageService.get('fdsettings.foundCmd') !== '') {
	    // TO DO: 
	    // Save the default passkey into local storage
	    foundCmd = 'found me';
	} else {
	    // Get the command from local storage
	    foundCmd = localStorageService.get('fdsettings.foundCmd');
	}

	return foundCmd;
    };

    /*
     * Saving the command onto local stoage 
     * And return confirmation that it was saved into local storage correctly 
     * 
     * @return (boolean) localstorage.add() 
     */
    var setFoundCmd = function(c) {
	return localStorageService.add('fdsettings.foundCmd', c);
    };

    // Create a easy to call method in the parent factory
    return {
	getCommands: getCommands,
	passkey: getPasskey,
	setPasskey: setPasskey,
	lostCmd: getLostCmd,
	setLostCmd: setLostCmd,
	foundCmd: getFoundCmd,
	setFoundCmd: setFoundCmd
    };

});