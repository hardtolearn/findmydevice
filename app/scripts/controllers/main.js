'use strict';

angular.module('findDeviceApp')
	.controller('MainCtrl', function($scope, $window, geolocation, deviceSettings) {

    /*geolocation.getCurrentPosition(function (position) {
     alert('Latitude: '              + position.coords.latitude          + '\n' +
     'Longitude: '             + position.coords.longitude         + '\n' +
     'Altitude: '              + position.coords.altitude          + '\n' +
     'Accuracy: '              + position.coords.accuracy          + '\n' +
     'Altitude Accuracy: '     + position.coords.altitudeAccuracy  + '\n' +
     'Heading: '               + position.coords.heading           + '\n' +
     'Speed: '                 + position.coords.speed             + '\n' +
     'Timestamp: '             + position.timestamp                + '\n');
     });
     */




    function smsListener() {
	//window.addEventListener("smsreceived",
	//                        function(m) { sms_body = m.body });
	// https://developer.mozilla.org/en-US/docs/Web/API/window.navigator.mozMobileMessage
	var message = window.navigator.mozMobileMessage;
	//message.addEventListener('received', onMessageReceived(this));
	message.addEventListener('received', function(e) {
	    $window.alert(e.message);
	});
    }
/*
    function onMessageReceived(e) {
	console.log(e);
	var message = e.message;
	$window.alert(message);
	
	 var message = e.message;
	 var threadId;
	 
	 if (message.messageClass && message.messageClass === 'class-0') {
	 return;
	 }
	 
	 // Here we can only have one sender, so deliveryStatus[0] => message
	 // status from sender. Ignore 'pending' messages that are received
	 // this means we are in automatic download mode
	 if (message.delivery === 'not-downloaded' &&
	 message.deliveryStatus[0] === 'pending') {
	 return;
	 }
	 
	 threadId = message.threadId;
	 
	 if (Threads.has(threadId)) {
	 Threads.get(threadId).messages.push(message);
	 }
	 
	 if (threadId === Threads.currentId) {
	 //Append message and mark as unread
	 this.markMessagesRead([message.id], true, function() {
	 MessageManager.getThreads(ThreadListUI.renderThreads);
	 });
	 ThreadUI.appendMessage(message);
	 ThreadUI.scrollViewToBottom();
	 Utils.updateTimeHeaders();
	 } else {
	 ThreadListUI.onMessageReceived(message);
	 }
	
    }
 */

    smsListener();

    geolocation.getCurrentPosition(function(position) {
	$scope.position = position;
    });

    // Check Wifi
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