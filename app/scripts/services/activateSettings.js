'use strict';

angular.module('findDeviceApp').factory('activateSettings', function($q, $timeout, updateDeviceSetting) {

    /*
     * Turn on all the appropriate settings
     * that are needed to track the device 
     */
    var activateTrackingSettings = function() {

	var deferred = $q.defer();

	// Turn on Geolocation 
	var g = 'geolocation.enabled';
	var geo = null;

	updateDeviceSetting.enableSetting('geolocation.enabled').then(function(status) {
	    geo = status;
	    console.log('SETTING : ' + g + ': ' + status);
	}, function(error) {
	    console.log('error getting setting status ' + error);
	    deferred.reject('Unable to update: ' + g);
	});

	// Turn on Wifi
	var w = 'wifi.enabled';
	var wifi = null;

	updateDeviceSetting.enableSetting('wifi.enabled').then(function(status) {
	    wifi = status;
	    console.log('SETTING : ' + w + ': ' + status);
	}, function(error) {
	    console.log('error getting setting status ' + error);
	    deferred.reject('Unable to update: ' + w);
	});

	// Turn on Mobile Data
	var m = 'ril.data.enabled';
	var mData = null;

	updateDeviceSetting.enableSetting('ril.data.enabled').then(function(status) {
	    mData = status;
	    console.log('SETTING : ' + m + ': ' + status);
	}, function(error) {
	    console.log('error getting setting status ' + error);
	    deferred.reject('Unable to update: ' + m);
	});

	// TO DO:
	// Check to see if Roaming needs to be turned on

	$timeout(function() {
	    deferred.resolve([
		{key: 'geo', value: geo},
		{key: 'wifi', value: wifi},
		{key: 'mData', value: mData}
	    ]);
	}, 2000);

	return deferred.promise;

    };

    return {
	activateTrackingSettings: activateTrackingSettings
    };

});