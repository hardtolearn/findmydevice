'use strict';

angular.module('findDeviceApp').factory('userSettings', function(Base64, localStorageService) {

    var getCommands = function() {
	return {
	    passkey: getPasskey(),
	    lostCmd: getLostCmd(),
	    foundCmd: getFoundCmd()
	};
    };

    // Get Passkey
    var getPasskey = function() {

	console.log('testing passkey function');

	var passkey;

	// Check to see if a passkey exists in local storage
	if (localStorageService.get('fdsettings.passkey') === null && localStorageService.get('fdsettings.passkey') !== '') {
	    passkey = 'myPassKey';
	} else {
	    // Get the passkey from storage
	    passkey = localStorageService.get('fdsettings.passkey');
	}

	return passkey;
    };

    // Setter for Passkey
    //passkey.assign = function(p) {
    var setPasskey = function(p) {
	var passkey = Base64.encode(p);
	console.log('encode passkey');
	return localStorageService.add('fdsettings.passkey', passkey);
    };

    // Get command for when the phone is 'Lost'
    var getLostCmd = function() {
	var lostCmd;

	// Check to see if the command exists in local storage
	if (localStorageService.get('fdsettings.lostCmd') === null && localStorageService.get('fdsettings.lostCmd') !== '') {
	    lostCmd = 'find me';
	} else {
	    // Get the command from local storage
	    lostCmd = localStorageService.get('fdsettings.lostCmd');
	}

	return lostCmd;
    };

    // Setter for 'Lost' Command
    var setLostCmd = function(c) {
	return localStorageService.add('fdsettings.lostCmd', c);
    };

    // Get command for when the phone is 'Found'
    var getFoundCmd = function() {
	var foundCmd;

	// Check to see if the command exists in local storage
	if (localStorageService.get('fdsettings.foundCmd') === null && localStorageService.get('fdsettings.foundCmd') !== '') {
	    foundCmd = 'found me';
	} else {
	    // Get the command from local storage
	    foundCmd = localStorageService.get('fdsettings.foundCmd');
	}

	return foundCmd;
    };

    // Setter for 'Found' Command
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