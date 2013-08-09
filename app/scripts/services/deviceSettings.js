'use strict';

// List of settings: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Platform/Settings_list
// A class method to check the settings on the phone, and if they need to be activated 
findDeviceApp.factory('deviceSettings', function() {
    
    console.log('deviceSettings');

    var deviceSettings = {};
    
    // Check Wifi
    deviceSettings.checkWifiStatus = function() {

	// Lock the settings, ensuring other apps wont interfear with our app's setting changes
	var lock = navigator.mozSettings.createLock();

	// Check to see the status of wifi
	var setting = lock.get('wifi.enabled');

	setting.onsuccess = function () {
	    console.log('wifi.enabled: ' + setting.result);

	    // If wifi is disabled...
	    if(!setting.result){
		// turn on wifi
		return(true);
	    }
	};
	
	return(false);
    }
	    
    // Check the setting to see if it is turned onn or off
    deviceSettings.checkSettingStatus = function(s) {

	// Lock the settings, ensuring other apps wont interfear with our app's setting changes
	var lock = navigator.mozSettings.createLock();

	// Check to see the status of the seting
	var setting = lock.get(s);

	setting.onsuccess = function () {
	    console.log(s + ': ' + setting.result);

	    // If is enabled...
	    if(setting.result){
		console.log(s + " is turned on. SMRT");
		return(true);
	    }
	};
	
	// If it turned off
	console.log(s + " is turned off. SMRT");
	return(false);

    }
	  
	    
    // Turn on Wifi
    deviceSettings.activateWifi = function(){
	// If wifi is turned off, need to turn it on
	//if(this.checkWifiStatus()){
	// If it is turned off, then we need to turn it on
	if(!this.checkWifiStatus()){
	    
	    // Activate Wifi
	    var result = lock.set({
	      'wifi.enabled': true
	    });

	    // Display command line that wifi has been turned on
	    result.onsuccess = function () {
	      console.log("Wifi has been turned on");
	      return(true);
	    };

	    // Error Handling
	    result.onerror = function () {
	      console.log("An error occured, the Wifi has not been turned on");
	      return(false);
	    };
	};
    }
    
    deviceSettings.activateWifiSmart = function(s){
	// If wifi is turned off, need to turn it on
	//if(this.checkWifiStatus()){
	// If it is turned off, then we need to turn it on
	if(!this.checkSettingStatus(s)){
	    
	    // Activate Wifi
	    var result = lock.set({
	      s: true
	    });

	    // Display command line that wifi has been turned on
	    result.onsuccess = function () {
	      console.log("Wifi has been turned on");
	      return(true);
	    };

	    // Error Handling
	    result.onerror = function () {
	      console.log("An error occured, the Wifi has not been turned on");
	      return(false);
	    };
	};
    }
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
		console.log("GPS has been turned on");
		return(true);
	    };
	    
	    result.onerrror = function(){
		console.log("An error occured, GPS has not been turned on");
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