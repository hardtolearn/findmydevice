'use strict';

// List of settings: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Platform/Settings_list
// A class method to check the settings on the phone, and if they need to be activated 
angular.module('findDeviceApp').factory('deviceSettings', function($q, $rootScope, $timeout) {

    return {
	// Check Wifi
	checkWifiStatus: function() {

	    var deferred = $q.defer();

	    var lock = navigator.mozSettings.createLock();
	    var setting = lock.get('wifi.enabled');

	    setting.onsuccess = function() {

		$timeout(function() {
		    var value = setting.result['wifi.enabled'];
		    console.log('Check Wifi Status - wifi.enabled: ' + value);
		    //return setting.result['wifi.enabled'];
		    deferred.resolve(value);
		}, 500);
		/*
		 $rootScope.$apply(function() {
		 
		 });
		 */
	    };

	    setting.onerror = function() {
		console.warn('Check Wifi Status - An error occured: ' + setting.error);
		deferred.reject('Unable to get setting');
	    };

	    return deferred.promise;
	},
	/*
	 * Check Setting Status 
	 * @param {type} s
	 * @returns {@exp;deferred@pro;promise}
	 */
	checkSettingStatus: function(s) {

	    var deferred = $q.defer();
	    var lock = navigator.mozSettings.createLock();
	    var setting = lock.get(s);

	    console.log('Check Status - Just checked the status of: ' + s);

	    setting.onsuccess = function() {
		$timeout(function() {
		    var value = setting.result[s];
		    console.log('Check Status - ' + s + ': ' + value);
		    deferred.resolve(value);
		}, 500);
	    };

	    setting.onerror = function() {
		console.warn('Check Status - An error occured: ' + setting.error);
		deferred.reject('Unable to get setting');
	    };

	    return deferred.promise;

	},
	/*
	 * Activate Wifi
	 * @return promise 
	 */
	activateWifi: function(s) {

	    console.log('AWS - 3. ACTION to turn on ' + s);
	    var deferred = $q.defer();

	    // Activate Wifi
	    var lock = navigator.mozSettings.createLock();
	    var result = lock.set({
		'wifi.enabled': true
	    });

	    result.onsuccess = function() {
		$timeout(function() {
		    console.log('AWS - 4. Wifi has been turned on');
		    deferred.resolve(true);
		}, 500);
	    };

	    // Error Handling
	    result.onerror = function() {
		console.log('AWS - 4. An error occured, the Wifi has not been turned on');
		deferred.reject('Unable to get setting');
	    };

	    console.log('AWS - 5 - Return');
	    return deferred.promise;
	},
	/*
	 * Disable Wifi
	 * Mainly used for testing, as once
	 * wifi has been turned on, it is difficult to
	 * turn it off again manually within the simulator
	 * @return promise
	 */
	disableWifi: function(s) {
	    console.log('DIS - 3. ACTION to turn off ' + s);
	    var deferred = $q.defer();

	    // Deactivate Wifi
	    var lock = navigator.mozSettings.createLock();
	    var result = lock.set({
		'wifi.enabled': false
	    });

	    result.onsuccess = function() {
		$timeout(function() {
		    deferred.resolve(false);
		    console.log('DIS - 4. Wifi has been turned off');
		}, 500);
	    };

	    // Error Handling
	    result.onerror = function() {
		console.log('DIS - 4. An error occured, the Wifi has not been turned on');
		deferred.reject('Unable to get setting');
	    };

	    console.log('DIS - 5 - Return');
	    return deferred.promise;
	},
	/*
	 * Activate Wifi
	 * @return promise 
	 */
	activateGPS: function(s) {

	    console.log('A-GEO - 3. ACTION to turn on ' + s);
	    var deferred = $q.defer();

	    // Activate Wifi
	    var lock = navigator.mozSettings.createLock();
	    var result = lock.set({
		'geolocation.enabled': true
	    });

	    result.onsuccess = function() {
		$timeout(function() {
		    console.log('A-GEO - 4. GPS has been turned on');
		    deferred.resolve(true);
		}, 500);
	    };

	    // Error Handling
	    result.onerror = function() {
		console.log('A-GEO - 4. An error occured, the GPS has not been turned on');
		deferred.reject('Unable to get setting');
	    };

	    console.log('A-GEO - 5 - Return');
	    return deferred.promise;
	},
	/*
	 * Disable Wifi
	 * Mainly used for testing, as once
	 * wifi has been turned on, it is difficult to
	 * turn it off again manually within the simulator
	 * @return promise
	 */
	disableGPS: function(s) {
	    console.log('D-GEO - 3. ACTION to turn off ' + s);
	    var deferred = $q.defer();

	    // Deactivate Wifi
	    var lock = navigator.mozSettings.createLock();
	    var result = lock.set({
		'geolocation.enabled': false
	    });

	    result.onsuccess = function() {
		$timeout(function() {
		    deferred.resolve(false);
		    console.log('D-GEO - 4. GPS has been turned off');
		}, 500);
	    };

	    // Error Handling
	    result.onerror = function() {
		console.log('D-GEO - 4. An error occured, the GPS has not been turned on');
		deferred.reject('Unable to get setting');
	    };

	    console.log('D-GEO - 5 - Return');
	    return deferred.promise;
	}

    };

});