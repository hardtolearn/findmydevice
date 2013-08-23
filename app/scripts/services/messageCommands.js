'use strict';

angular.module('findDeviceApp').service('messageCommands', function($rootScope, $window,
	$timeout, activateSettings, messageManager, geolocation) {

    return {
	callCommand: function(cmd, sender) {
	    console.log('------ CMD -------');
	    console.log('Look for command: ' + cmd);

	    switch (cmd) {

		case 'lost':
		    console.log('Command - Lost: Message asks for Start Tracking');
		    this.startTracking(sender);
		    break;
		case 'found':
		    console.log('Command - Found: Message asks for Stop Tracking');
		    this.stopTracking();
		    break;
		case 'lock':
		    console.log('Command - Lock: Message asks for Start Tracking');
		    this.lockDevice();
		    break;
		case 'alert':
		    console.log('Command - Alert: Message asks for Start Tracking');
		    this.setAlert();
		    break;
		case 'wipe':
		    console.log('Command - Wipe: Message asks for Start Tracking');
		    this.wipeDevice();
		    break;

		default:
		    console.log('Command is not understood');

	    }

	},
	startTracking: function(sender) {
	    $window.alert('Will start tarcking the device');
	    
	    // ---
	    // Set the device as missing
	    // ---
	    
	    // Pass a flag up to the main controller to mark the device as missing
	    $rootScope.$emit('TRACK ALERT');
	    

	    console.log('------- START TRACKING ---------');
	    console.log('Sender of message: ' + sender);

	    var deviceLocation = null;

	    // ---
	    // Turn on all the settings needed to track the device
	    // ----
	    activateSettings.activateTrackingSettings().then(function(messages) {
		console.log('activate settings...');
		console.log(messages);
	    }, function(error) {
		console.log('ERROR turning on settings for tracking: ' + error);
	    });


	    // ---
	    // Start tracking the device, and find the Geolocation
	    // ----
	    $timeout(function() {
		console.log('GEO ---------');
		console.log('Find the devices location');

		geolocation.getCurrentPosition().then(function(position) {
		    console.log('FOUND! The geolocation of the device.');
		    console.log(position);
		    deviceLocation = position;
		}, function(error) {
		    console.log('ERROR Getting geolocation of the device: ' + error);
		});
	    }, 2000);

	    // TO DO 
	    // Set global variable of tracking to on

	    // ---
	    // Start sending messages to the user, 
	    // reporting the location of the device
	    // ----
	    $timeout(function() {
		console.log('REPLY ---------');

		console.log('Now it is time to message the Sender back');
		var message = 'MessageCommand - Your phone is lost. Please wait while we find it!';

		var promise = messageManager.sendMessage(sender, message);

		promise.then(function(status) {
		    console.log('SMS has been: ' + status);
		    $window.alert('Promise: SMS has been: ' + status);
		}, function(error) {
		    console.log('Error sending SMS: ' + error);
		    $window.alert('Error trying to send SMS ' + error);
		});
		// Using a timer to allow for the geo location to be found, 
		// allowing for more accurate information to be sent to the user
	    }, 6000);

	},
	stopTracking: function() {
	    $window.alert('Stop tracking the device');
	},
	lockDevice: function() {
	    $window.alert('Lock the device so no one else can use it');
	},
	setAlert: function() {
	    $window.alert('This device is missing! Please hand it into the police');
	},
	wipeDevice: function() {
	    $window.alert('Warning - Device will be wipped clean');
	}

    };
});
