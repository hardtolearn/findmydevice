'use strict';

angular.module('findDeviceApp')
	.controller('MainCtrl', function($scope, $window, updateDeviceSetting,
	receivedMessage, localStorageService, Base64,
	messageManager) {


    // For testing purpose, set the passkey manually
    
    var passkey = Base64.encode('myPassKey');
    localStorageService.add('userSettings.passkey', passkey);

    /*
     * System Event Handler, used to listen to any incoming text messages
     * and will issue a command upon the text message being received 
     * by the device 
     */
    navigator.mozSetMessageHandler('sms-received', function onSMS(sms) {
	receivedMessage.testMessageReceived(sms);
    });

    function init() {

	/*
	 * Load the GPS coordinates for the device
	 
	 geolocation.getCurrentPosition().then(function(position) {
	 console.log('FOUND! The geolocation of the device.');
	 console.log(position);
	 $scope.position = position;
	 }, function(error) {
	 console.log('ERROR Getting geolocation of the device: ' + error);
	 });
	 */

    }

    init();


    /*
     * Test Commands 
     */
    $scope.testMsg = function() {
	console.log('-------------------------');
	console.log('TEST: Incoming SMS with a command message');
	console.log('-------------------------');

	var sms = {
	    sender: '+491793509165',
	    body: 'will you find me please! myPassKey',
	    timestamp: new Date().getTime()
	};

	receivedMessage.testMessageReceived(sms);

    };

    /*
     * Test Commands 
     */
    $scope.stopTracking = function() {
	console.log('-------------------------');
	console.log('TEST: Stop Tracking SMS');
	console.log('-------------------------');

	var sms = {
	    sender: '+491793509165',
	    body: 'found you myPassKey',
	    timestamp: new Date().getTime()
	};

	receivedMessage.testMessageReceived(sms);

    };

    /*
     * Send a text message
     */
    $scope.sendSMS = function() {

	console.log('-------------------------');
	$window.alert('going to send a text message now');

	var receiver = '+491793509165';
	var message = 'Hello from the app';

	var promise = messageManager.sendMessage(receiver, message);

	promise.then(function(status) {
	    console.log('SMS has been: ' + status);
	    $window.alert('Promise: SMS has been: ' + status);
	}, function(error) {
	    console.log('Error sending SMS: ' + error);
	    $window.alert('Error trying to send SMS ' + error);
	});

    };


    /*
     * Get the status of the setting 
     * @param {type} s
     */
    $scope.getSettingStatus = function(s) {

	console.log('-------------------------');

	var promise = updateDeviceSetting.checkSettingStatus(s);
	promise.then(function(status) {
	    console.log('SETTING : ' + s + ': ' + status);
	    $window.alert(s + ' is currently turned ' + status);
	}, function(error) {
	    console.log('error getting setting status ' + error);
	});

    };

    /*
     * Activate GPS 
     */
    $scope.activateSetting = function(s) {

	console.log('-------------------------');
	console.log('Activate ' + s);

	var promise = updateDeviceSetting.enableSetting(s);

	promise.then(function(status) {
	    console.log('SETTING : ' + s + ': ' + status);
	    $window.alert(s + ' is now: ' + status);
	}, function(error) {
	    console.log('error getting setting status ' + error);
	});

    };

    /*
     * Turn off the Setting 
     */
    $scope.disableSetting = function(s) {

	console.log('-------------------------');
	console.log('Disable ' + s);

	updateDeviceSetting.disableSetting(s).then(function(status) {
	    console.log('SETTING : ' + s + ': ' + status);
	    $window.alert(s + ' is now: ' + status);
	});

    };

});