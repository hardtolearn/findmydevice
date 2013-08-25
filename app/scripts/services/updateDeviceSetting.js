'use strict';

// List of settings: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Platform/Settings_list
// A class method to check the settings on the phone, and if they need to be activated 
angular.module('findDeviceApp').factory('updateDeviceSetting', function($q, $timeout) {

    return {
	/*
	 * Check to see if a Setting is turned on or off
	 *  
	 * @param {string} setting
	 * @returns {@exp;deferred@pro;promise}
	 */
	checkSettingStatus: function(setting) {

	    var deferred = $q.defer();
	    var lock = navigator.mozSettings.createLock();
	    var status = lock.get(setting);

	    console.log('CHECK 1. Just checking the status of: ' + setting);

	    status.onsuccess = function() {
		$timeout(function() {
		    var value = status.result[setting];
		    console.log('CHECK 2. On Success: ' + setting + ': ' + value);
		    deferred.resolve(value);
		}, 500);
	    };

	    status.onerror = function() {
		console.warn('CHECK 2. On Error: An error occured: ' + status.error);
		deferred.reject('Unable to get setting');
	    };

	    // Return the promise
	    return deferred.promise;

	},
	/*
	 * Enable a setting 
	 * 
	 * @param {string} setting
	 * @returns {@exp;deferred@pro;promise}
	 */
	enableSetting: function(setting) {

	    // Create a promise, which will be used to return to
	    // the function that calls this method, and ask it to wait
	    // for an answer
	    var deferred = $q.defer();

	    // Check to see the status of the Setting
	    this.checkSettingStatus(setting).then(function(status) {

		if (!status) {

		    console.log('ON  - 1. Turn on the setting for ' + setting);

		    // Create an object, to pass in the setting that
		    // needs to be on, otherwise the variable 's' will
		    // be seen as a string, if it's been used as the key
		    // for example .set({ s: true}) would cause an error
		    var key = setting;
		    var obj = {};
		    obj[key] = true;

		    // Activate Setting
		    var lock = navigator.mozSettings.createLock();
		    var result = lock.set(obj);

		    // If the Setting has successfully been turned on, report it
		    result.onsuccess = function() {
			$timeout(function() {
			    console.log('ON - 2. On Success: ' + setting + ' has been turned on');
			    deferred.resolve(true);
			}, 500);
		    };

		    // Error Handling
		    result.onerror = function() {
			console.log('ON - 2. On Error: An error occured, the ' + setting + ' cannot be turned on');
			deferred.reject('Unable to update setting');
		    };

		} else {
		    // The setting is already turned on
		    deferred.resolve(true);
		}

		// TO DO:
		// Error handling, passing the error up the chain

	    });

	    // Return the promise
	    return deferred.promise;
	},
	/*
	 * Disable Setting
	 * Mainly used for testing, as once
	 * setting has been turned on, it is sometimes difficult
	 * to turn it off again manually within the simulator
	 * 
	 * @param {string} setting
	 * @returns {@exp;deferred@pro;promise}
	 */
	disableSetting: function(setting) {
	    console.log('OFF - 1. ACTION to turn off ' + setting);
	    var deferred = $q.defer();

	    this.checkSettingStatus(setting).then(function(status) {

		if (status) {
		    // Create an object, to pass in the setting that
		    // needs to be on, otherwise the variable 's' will
		    // be seen as a string, if it's been used as the key
		    // for example .set({ s: true}) would cause an error
		    var key = setting;
		    var obj = {};
		    obj[key] = false;

		    // Deactivate the Setting
		    var lock = navigator.mozSettings.createLock();
		    var result = lock.set(obj);

		    // If succesfully turned off the setting, report it as false
		    result.onsuccess = function() {
			$timeout(function() {
			    deferred.resolve(false);
			    console.log('OFF - 2. ' + setting + ' has been turned off');
			}, 500);
		    };

		    // Error Handling
		    result.onerror = function() {
			console.log('OFF - 2. An error occured, ' + setting + ' has not been turned off');
			deferred.reject('Unable to get setting');
		    };

		} else {
		    // Setting is already turned off
		    deferred.resolve(false);
		}

		// TO DO:
		// Error handling, passing the error up the chain

	    });

	    return deferred.promise;
	}
    };

});