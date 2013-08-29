'use strict';

angular.module('findDeviceApp').factory('receivedMessage', function($window, $filter, messageCommands, messageManager) {

    return {
	testMessageReceived: function(sms) {
	    
	    console.log(sms);

//	    var validMsg = false;
	    var passkey = null;

	    // Get the important information from the SMS, 
	    var sender = sms.sender;
	    var body = sms.body;
	    var timestamp = sms.timestamp;
	    // timestamp = $filter('date')(timestamp, ['medium']);

	    // Display message
	   
	    // ---
	    // Check to see the message is valid, and contains the passkey
	    // ---    
	    
	    // !!!!!!!!!!!!!!
	    // TO DO - 
	    // ensure the passkey is passed through, not manually written
	    messageManager.validateMessage(body).then(function(validMsg) {
		
		// Return the values from the validate message function
//		validMsg = v.valid;
//		passkey = v.key;
		passkey = 'myPassKey';
		
		
		// If the message is valid...
		if (validMsg) {
		    // Check to see if the message contains any commands
		    messageManager.findMsgCommand(body, passkey).then(function(cmd) {
			// Run the corrosponding command that is found in the message
			messageCommands.callCommand(cmd, sms);

		    }, function(reason) {
			console.log('Error: ' + reason);
		    });
		}

	    }, function(reason) {
		console.log('Error: ' + reason);
	    });

	}

    };

});