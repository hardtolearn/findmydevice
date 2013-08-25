'use strict';

angular.module('findDeviceApp').factory('messageManager', function($q, $timeout, Base64, localStorageService) {

    return {
	/*
	 * Send a SMS Message, and return the message's
	 * DOMRequest Object if has been sent or not. 
	 * 
	 * @param {type} num
	 * @param {type} message
	 * @returns {@exp;deferred@pro;promise}
	 */
	sendMessage: function(receiver, message) {

	    var deferred = $q.defer();
	    var sMM = window.navigator.mozMobileMessage;
	    var request;

	    request = sMM.send(receiver, message);

	    $timeout(function() {

		request.onsuccess = function onSuccess(event) {
		    var status = 'request.onsuccess: Message - on delivery succes';
		    console.log(event);
		    deferred.resolve(true);
		};

		request.onerror = function onError(event) {
		    var status = 'request.onerror: Message - failed to send';
		    console.log(status);
		    deferred.reject('Unable to get setting' + event);
		};

	    }, 500);

	    return deferred.promise;
	},
	/*
	 * Check to see if the text mesage contains the passkey to issue
	 * any commands, or work out of it's a normal text message
	 *   
	 * @param {type} sender
	 * @param {type} message
	 * @returns {undefined}
	 */
	validateMessage: function(message) {

	    var deferred = $q.defer();

	    // Get the keypass that the user saved
	    var passkey = localStorageService.get('fduser.passkey');

	    // Clean the white space around the message
	    message = message.trim();

	    // Split the message up by using white spaces to find the passphrase
	    var list = message.split(' ');

	    // Get the last item in the list to determine to the passkey
	    var msgPasskey = list.pop();
	    // Check to see if the Passkey in the message matches the saved Passkey
	    if ((Base64.encode(msgPasskey)) === passkey) {
		console.log('The is the correct passkey: ' + msgPasskey);
		deferred.resolve({valid: true, key: msgPasskey});
	    } else {
		console.log('Error - not the right passkey');
		deferred.reject(false);
	    }

	    return deferred.promise;

	},
	findMsgCommand: function(message, passkey) {

	    var deferred = $q.defer();

	    // Create an array with the commands for the appropriate functions
	    var cmd = [];
	    var command = null;

	    cmd.push({
		type: 'lost',
		key: 'find me'
	    });

	    cmd.push({
		type: 'found',
		key: 'found you'
	    });

	    cmd.push({
		type: 'lock',
		key: 'lock me'
	    });

	    cmd.push({
		type: 'alert',
		key: 'show alert'
	    });

	    cmd.push({
		type: 'wipe',
		key: 'self distract'
	    });

	    // Delete the keyphase from the message
	    var phase = message.substring(0, message.indexOf(passkey));

	    // Trim the message of any white space
	    phase = phase.trim();
	    
	    // Loop through the array to determine if the message contains any commands
	    for (var i = 0; i < cmd.length; i++) {

		if (phase.match(cmd[i].key)) {
		    console.log('FOUND the command. Phase is: "' + phase + '"');
		    command = cmd[i].type;
		    deferred.resolve(command);
		    break;
		}

		// Whilst this option might be better, it may have issues in different languages,
		// so using regular expression's .match() provides a safer string comparision 
		// if(cmd[i]['key'].toLowerCase() === phase.toLowerCase()){}
	    }
	    
	    // Return an empty error 
	    deferred.reject('There is no command');

	    return deferred.promise;
	}
    };

});