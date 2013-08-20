'use strict';

angular.module('findDeviceApp').factory('messageManager', function($q, $window, $timeout) {

    return {
	
	// When a new text message is received, 
	// display this method...
	messageReceived: function(event) {
	    var m = event.message;
	    var sender = m.sender;
	    var message = m.body;
	    
	    console.log('message from: ' + sender + ', message is: ' + message);
	    $window.alert('A message has been received');
	},
	/*
	 * Send a SMS Message, and return the message's
	 * DOMRequest Object if has been sent or not. 
	 * 
	 * @param {type} num
	 * @param {type} message
	 * @returns {@exp;deferred@pro;promise}
	 */
	 sendMessage: function(num, message) {

	    var deferred = $q.defer();

	    var sMM = window.navigator.mozMobileMessage;
	    
	    var request;
	    
	    console.log('Sent Message... To: ' + num + ', message: ' + message);
	    
	    request = sMM.send(num, message);
	    console.log(request);

	    //var sendSMS = sMM.send('123', 'message');
	    //sMM.send(num, message);

	    $timeout(function() {
		
		request.onsuccess = function onSuccess(event) {
		    var status = 'request.onsuccess: Message - on delivery succes';
		    console.log(status);
		    $window.alert(status);
		    deferred.resolve(true);
		};
		
		request.onerror = function onError(event) {
		    var status = 'request.onerror: Message - failed to send';
		    console.log(status);
		    $window.alert(status);
		    deferred.reject('Unable to get setting' + event);
		 };
		
		sMM.onsent = function() {
		    var status = 'sMM.onsent: Message has been set - on Sent';
		    console.log(status);
		    $window.alert(status);
		};

		sMM.onfailed = function() {
		    var status = 'sMM.onfailed: Sending Failed - on Failed';
		    console.log(status);
		    $window.alert(status);
		};
		
		sMM.ondeliverysuccess = function() {
		    var status = 'sMM.ondeliverysuccess: Message - on delivery succes';
		    console.log(status);
		    $window.alert(status);
		};

		sMM.ondeliveryerror = function() {
		    var status = 'sMM.ondeliveryerror: Message could not be delievered - ondelieveryerror';
		    console.log(status);
		    $window.alert(status);
		    deferred.reject(status);
		};

	    }, 500);
	    
	    return deferred.promise;
	}
    };

    /*
     var MessageManager = {
     activity: null,
     init: function mmInit() {
     if (this.initialized) {
     return;
     }
     this.initialized = true;
     // Allow for stubbing in environments that do not implement the
     // `navigator.mozMobileMessage` API
     this._mozMobileMessage = navigator.mozMobileMessage;
     
     this._mozMobileMessage.addEventListener('received',
     this.onMessageReceived.bind(this));
     
     },
     onMessageReceived: function mmOnMessageReceived(e) {
     var message = e.message;
     $window.alert('Received SMSmessage');
     $window.alert(message.body);
     console.log(e);
     }
     
     };
     */
});