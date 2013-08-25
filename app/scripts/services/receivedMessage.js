'use strict';

angular.module('findDeviceApp').factory('receivedMessage', function($window, $filter, messageCommands, messageManager) {

    return {
	testMessageReceived: function(sms) {
	    

	    console.log(sms);

	    var validMsg = false;
	    var passkey = null;

	    // Get the important information from the SMS
	    var sender = sms.sender;
	    var body = sms.body;
	    var timestamp = sms.timestamp;
	    var timestampF = $filter('date')(timestamp, ['medium']);

	    // Display message
	    $window.alert('Message received! Sender: ' + sender + '. \nBody: ' + body + '. \nTimestamp: ' + timestampF);

	    // ---
	    // Reply back to the sender to ack sms has been received
	    // ---
	    /*
	    var msgReply = 'Thank you for sending your message';
	    var promise = messageManager.sendMessage(sender, msgReply);

	    promise.then(function(status) {
		console.log('SMS has been: ' + status);
		$window.alert('Promise: SMS has been: ' + status);
	    }, function(error) {
		console.log('Error sending SMS: ' + error);
		$window.alert('Error trying to send SMS ' + error);
	    });
	    */
	   
	    // ---
	    // Check to see the message is valid, and contains the passkey
	    // ---
	    messageManager.validateMessage(body).then(function(v) {
		
		// Return the values from the validate message function
		validMsg = v.valid;
		passkey = v.key;
		
		console.log('Message has been validated: ' + v.key + ' - is this a valid message? ' + validMsg);
		
		// If the message is valid...
		if (validMsg) {
		    
		    // Check to see if the message contains any commands
		    messageManager.findMsgCommand(body, passkey).then(function(cmd) {
			console.log('Will tell "Message Commands" about the command: ' + cmd);

			// Run the corrosponding command that is found in the message
			messageCommands.callCommand(cmd, sms);

		    }, function(reason) {
			console.log('Error: ' + reason);
		    });
		} else {
		    $window.log('Valid Message is not returning true! something is wrong');
		}

	    }, function(reason) {
		$window.alert('Message Manager ERROR! ' + reason);
		console.log('Error: ' + reason);
	    });

	}

    };

});