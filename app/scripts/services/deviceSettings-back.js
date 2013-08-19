'use strict';

// List of settings: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Platform/Settings_list
// A class method to check the settings on the phone, and if they need to be activated 
angular.module('findDeviceApp').factory('deviceSettings', function() {

    console.log('deviceSettings');

    var deviceSettings = {};

    // Check Wifi
    deviceSettings.checkWifiStatus = function() {

	// Check to see the status of wifi
	console.log('CHECK 1 - Check the setting of wifi');
	
        var lock = navigator.mozSettings.createLock();
	var setting = lock.get('wifi.enabled');

	console.log('CHECK 2 - Now look at result');
	console.log(setting);

	setting.onsuccess = function() {
	    console.log('CHECK 4 - wifi.enabled: ' + setting.result['wifi.enabled']);
	    
	    var value = setting.result['wifi.enabled'];
	    console.log('CHECK 4 - value is: ' + value);
	    return value;
	};

	setting.onerror = function() {
	    console.warn('CHECK 5 - Error! ');
	    return(false);
	};
	
	return false;

    };

    // Check the setting to see if it is turned onn or off
    deviceSettings.checkSettingStatus = function(s) {
	console.log('CHECK SMART 1 - Checking status of: ' + s);

	// Check to see the status of the seting
	var lock = navigator.mozSettings.createLock();
	var setting = lock.get(s);

	console.log('CHECK SMART 2 - return result');
	
	var value = null;

	setting.onsuccess = function(value) {

		value = setting.result['wifi.enabled'];
		console.log('CHECK SMART 3 - value of ' + s + ' is: ' + value);
	};

	setting.onerror = function() {
	    console.log('CHECK SMART 4 - ERROR! could not get status');
	};
	
	console.log('CHECK SMART 5 - at the end of the function, return value ' + value);
	return value;

    };


    // Turn on Wifi
    deviceSettings.activateWifi = function() {
	// If wifi is turned off, need to turn it on
	//if(this.checkWifiStatus()){
	// If it is turned off, then we need to turn it on
	if (!this.checkWifiStatus()) {
	    console.log('ACTWIFI 1 - Wifi is turned off');

	    // Activate Wifi
	    var lock = navigator.mozSettings.createLock();
	    var result = lock.set({
		'wifi.enabled': true
	    });

	    console.log('ACTWIFI 2 - Just altered the wifi.enabled, and set to true');
	    console.log(result);

	    // Display command line that wifi has been turned on
	    result.onsuccess = function() {
		console.log('ACTWIFI 2 - Wifi has been turned on');
		return(true);
	    };

	    // Error Handling
	    result.onerror = function() {
		console.log('ACTWIFI 2 - An error has occured, wifi could not be actiated');
		return(false);
	    };
	} else {
	    console.log('ACTWIFI 1 - Wifi is already ON - no need to activate it');
	    return(true);
	}
    };

    // TESTING 
    // disableWifiSmart
    deviceSettings.disableWifi = function() {
	console.log('DISWIFI 1 - Going to turn off Wifi now');

	// Activate Wifi
	var lock = navigator.mozSettings.createLock();
	var result = lock.set({
	    'wifi.enabled': false
	});

	console.log('DISWIFI 2 - Just altered the wifi.enabled, and set to false');
	console.log(result);

	// Display command line that wifi has been turned on
	result.onsuccess = function() {
	    console.log('DISWIFI 3 - Wifi has been turned off');
	    return(true);
	};

	// Error Handling
	result.onerror = function() {
	    console.log('DISWIFI 3 - An error occured, Cannot turn OFF wifi');
	    return(false);
	};
    };

    deviceSettings.activateWifiSmart = function(s) {
	// If wifi is turned off, need to turn it on
	//if(this.checkWifiStatus()){
	// If it is turned off, then we need to turn it on
	console.log('AWS - 1. Activate Wifi Smart : ' + s);
	if (!this.checkSettingStatus(s)) {
	    console.log('AWS - 2. If wifi is turned off');

	    console.log('AWS - 3. lock has been set, now activate wifi ');

	    // Activate Wifi
	    var lock = navigator.mozSettings.createLock();
	    var result = lock.set({
		s: true
	    });

	    // Display command line that wifi has been turned on
	    result.onsuccess = function() {
		console.log('AWS - 4. Wifi has been turned on');
		return(true);
	    };

	    // Error Handling
	    result.onerror = function() {
		console.log('AWS - 4. An error occured, the Wifi has not been turned on');
		return(false);
	    };
	} else {
	    console.log('AWS - 2. Wifi is already turned on ');
	}
    };
    /*	    
     // Check the status of the GPS 
     this.$checkGPSStatus = function(){
     
     },
     
     // Activate GPS
     this.$activateGPS = function(){
     // geolocation.enabled	
     if(!this.checkSettingStatus('geolocation.enabled')){
     
     // activate GPS
     var result = lock.set({
     'geolocation.enabled': true
     });
     
     // Ensure that GPS has been activated
     result.onsuccess = function(){
     console.log('GPS has been turned on');
     return(true);
     };
     
     result.onerrror = function(){
     console.log('An error occured, GPS has not been turned on');
     return(false);
     };
     }
     
     }
     
     ,
     // Check to see if Mobile Data is actibated
     checkMobileDataStatus = function(){
     // ril.data.enabled
     },
     
     // Turn on Mobile Data
     activateMobileData = function(){
     
     },
     
     // Check Roaming
     checkDataRoamingAllowed = function(){
     
     },
     
     // Turn on Roaming
     activateDataRoaming = function(){
     // ril.data.roaming.enabled
     }
     */

    return deviceSettings;

});