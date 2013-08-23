/*geolocation.getCurrentPosition(function (position) {
 alert(
 'Latitude: '              + position.coords.latitude          + '\n' +
 'Longitude: '             + position.coords.longitude         + '\n' +
 'Altitude: '              + position.coords.altitude          + '\n' +
 'Accuracy: '              + position.coords.accuracy          + '\n' +
 'Altitude Accuracy: '     + position.coords.altitudeAccuracy  + '\n' +
 'Heading: '               + position.coords.heading           + '\n' +
 'Speed: '                 + position.coords.speed             + '\n' +
 'Timestamp: '             + position.timestamp                + '\n');
 });
 */

'use strict';
angular.module('findDeviceApp').factory('geolocation', function($q, $timeout) {

    var getCurrentPosition = function() {

	var deferred = $q.defer();

	var options = {
	    enableHighAccuracy: true,
	    timeout: 10000,
	    maximumAge: 0
	};

	function success(position) {
	    $timeout(function() {
		deferred.resolve(position);
	    }, 2000);
	}

	function error(err) {
	    console.log('Error getting geolocation: ' + err.message);
	    deferred.reject(err.message);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);

	return deferred.promise;

    };

    return {
	getCurrentPosition: getCurrentPosition
    };

    /*    
     return {
     getCurrentPosition: function(onSuccess, onError, options) {
     navigator.geolocation.getCurrentPosition(function() {
     var that = this,
     args = arguments;
     
     if (onSuccess) {
     $rootScope.$apply(function() {
     onSuccess.apply(that, args);
     });
     }
     
     }, function() {
     var that = this,
     args = arguments;
     
     if (onError) {
     $rootScope.$apply(function() {
     onError.apply(that, args);
     });
     }
     },
     options);
     }
     };
     */
});