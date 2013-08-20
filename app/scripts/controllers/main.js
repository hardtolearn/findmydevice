'use strict';

angular.module('findDeviceApp')
	.controller('MainCtrl', function($scope, $window, geolocation, deviceSettings, messageManager) {
    
    // Testing to see if the app has access to mozMobileMessage
    if (navigator.mozMobileMessage) {
	console.log('has mozMobileMessage');
    } else {
	console.log('does not have mozMobileMessage');
    }

    // Check to see if we have premission
    if (navigator.mozMobileMessage === 0) {
	console.log('I have no premission');
    } else {
	console.log('Have premission to use mozMM');
    }

    // Create a Event Listener for incoming messages
    var mozMM = navigator.mozMobileMessage;
    mozMM.addEventListener('received', function addEventListener(evt) {
	    // Display a alert when a message comes in
	    $window.alert('SMS received');
	    $window.alert(evt.message.body);
    }, false);
    
    /* 
	// Create a Event Listener
	mozMM.addEventListener('received', 
	    message.Manager.messageReceived(this), false);	
    */
   
    /*
     * Load the GPS coordinates for the device
     */
    geolocation.getCurrentPosition(function(position) {
	$scope.position = position;
    });

    /*
     * Send a text message
     */
    $scope.sendSMS = function() {
		
	console.log('-------------------------');
	$window.alert('going to send a text message now');
	
	var num = '';
	var message = 'Hello from the app';
	
	var promise = messageManager.sendMessage(num, message);
	
	promise.then(function(status) {
	    console.log('SMS has been: ' + status);
	    $window.alert('Promise: SMS has been: ' + status);
	}, function (error){
	    console.log('Error sending SMS: ' + error);
	    $window.alert('Error trying to send SMS ' + error);
	});

    };

    /*
     * Check Wifi 
     */
    $scope.wifiStatus = function() {
	console.log('-------------------------');
	var promise = deviceSettings.checkWifiStatus();
	promise.then(function(status) {
	    console.log('MAIN: Wifi Status: ' + status);
	    $window.alert('Wifi is currently turned ' + status);
	}, function(error) {
	    console.log('error getting setting status ' + error);
	});

    };

    /*
     * Check to see if a setting is activated 
     */
    $scope.wifiStatusSmart = function() {

	console.log('-------------------------');

	var s = 'wifi.enabled';
	var promise = deviceSettings.checkSettingStatus(s);
	promise.then(function(status) {
	    console.log('SETTING : ' + s + ': ' + status);
	    $window.alert('SMART Wifi is currently turned ' + status);
	}, function(error) {
	    console.log('error getting setting status ' + error);
	});

    };

    /*
     * Activate Wifi 
     */
    $scope.activateWifi = function() {

	console.log('-------------------------');
	var s = 'wifi.enabled';
	var status = null;

	// Check to see if Wifi is turned on
	deviceSettings.checkSettingStatus(s).then(function(data) {
	    status = data;
	    console.log('AWS - 2. The Promise is: ' + data);

	    // Is wifi off, then we need to turn it on
	    if (!status) {
		console.log('!! PLEASE turn on wifi');

		var promise = deviceSettings.activateWifi(s);

		promise.then(function(active) {
		    console.log('SETTING : ' + s + ': ' + active);
		    $window.alert('Wifi is now: ' + active);
		}, function(error) {
		    console.log('error getting setting status ' + error);
		});
	    } else {
		console.log('Status is ' + status + ', so no need to turn on Wifi');
	    }
	});

    };

    /*
     * Turn off Wifi 
     */
    $scope.disableWifi = function() {

	console.log('-------------------------');
	var s = 'wifi.enabled';
	var status = null;

	// Check to see if Wifi is turned on
	deviceSettings.checkSettingStatus(s).then(function(data) {
	    status = data;
	    console.log('DIS - !. The Promise is: ' + data);

	    if (status) {
		console.log('!!! PLEASE turn on wifi');

		deviceSettings.disableWifi(s).then(function(data) {
		    console.log('SETTING : ' + s + ': ' + data);
		    $window.alert('Wifi is now: ' + data);
		});

	    } else {
		console.log('Status is ' + status + ', so no need to turn off Wifi');
	    }
	});

    };

    $scope.gpsStatusSmart = function() {

	console.log('-------------------------');

	var s = 'geolocation.enabled';
	var promise = deviceSettings.checkSettingStatus(s);
	promise.then(function(status) {
	    console.log('SETTING : ' + s + ': ' + status);
	    $window.alert('GPS is currently turned ' + status);
	}, function(error) {
	    console.log('error getting setting status ' + error);
	});

    };

    /*
     * Activate GPS 
     */
    $scope.activateGPS = function() {

	console.log('-------------------------');
	var s = 'geolocation.enabled';
	var status = null;

	// Check to see if Wifi is turned on
	deviceSettings.checkSettingStatus(s).then(function(data) {
	    status = data;
	    console.log('AGEO - 2. The Promise is: ' + data);

	    // Is wifi off, then we need to turn it on
	    if (!status) {
		console.log('!! PLEASE turn on GPS');

		var promise = deviceSettings.activateGPS(s);

		promise.then(function(active) {
		    console.log('SETTING : ' + s + ': ' + active);
		    $window.alert('GPS is now: ' + active);
		}, function(error) {
		    console.log('error getting setting status ' + error);
		});
	    } else {
		console.log('Status is ' + status + ', so no need to turn on GPS');
	    }
	});

    };

    /*
     * Turn off GPS 
     */
    $scope.disableGPS = function() {

	console.log('-------------------------');
	var s = 'geolocation.enabled';
	var status = null;

	// Check to see if Wifi is turned on
	deviceSettings.checkSettingStatus(s).then(function(data) {
	    status = data;
	    console.log('DGEO - !. The Promise is: ' + data);

	    if (status) {
		console.log('!!! PLEASE turn off GPS');

		deviceSettings.disableGPS(s).then(function(data) {
		    console.log('SETTING : ' + s + ': ' + data);
		    $window.alert('GPS is now: ' + data);
		});

	    } else {
		console.log('Status is ' + status + ', so no need to turn off GPS');
	    }
	});

    };

});