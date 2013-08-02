'use strict';
/*
 * A Model to check if there is any local storage information saved in the
 * client's browser. If there is information saved, it will create a user object
 * and pass it to the user controller. 
 * 
 * If there is no information saved peviously from the user, it will promt 
 * the user to create a new account. Otherwise if there is user information 
 * stored, it will ask the user to log in. 
 * 
 * User Object:
 *	username (encrypted)
 *	password (encrypted)
 *	Email Address
 *	dateCreated
 * 
 * @param {type} $rootScope
 * @param {type} localStorageService
 * @param (type) $filter
 */

findDeviceApp.factory('user', function($rootScope, localStorageService, $location) {
    
    // Delete previous stored information in the local storage
    // localStorageService.clearAll();

    // Check to see if the local variables has been created
    if (localStorageService.get('fduser.username') === null && localStorageService.get('fduser.username') !== '') {
	
	// reset loggedIn to null just in case...
	localStorageService.add('fduser.loggedIn', false);
	$rootScope.session = null;
	
	// If they have not been set, direct the user to the create user page
	console.log("No user set up, please create one");
	$location.path( "/createAccount" );
	
    }
    
    // Next get the user to login 
    // TO DO login script 
    
    // If the user 
    
    // Create a new object and insert the local storage into the object
    var user = {
	username: localStorageService.get('fduser.username'),
	password: localStorageService.get('fduser.password'),
	emailAddress: localStorageService.get('fduser.emailAddress'),
	dateCreated: localStorageService.get('fduser.dateCreated'),
	loggedIn: localStorageService.get('fduser.loggedIn')
    };


    /*
     * NOTE: use 'localStorage' in the function parameters 
     
     // Create the storage ID 
     var LOCAL_STORAGE_ID = 'fduser';
     // Create a local storage object where the JSON lives
     var userString = localStorage[LOCAL_STORAGE_ID];
     
     
     // Check to see if the local storage and JSON 
     // have the same data, if are different, then create
     // a new user object and set the variables to null
     var user = userString ? JSON.parse(userString) : {
     username: undefined,
     password: undefined,
     emailAddress: undefined
     };    
     
     // Watch for variables in JSON to change, so they can
     // be re-written to the local storage
     $rootScope.$watch(function() {return user;}, function(){
     localStorage[LOCAL_STORAGE_ID] = JSON.stringify(user);
     }, true);
     
    */

   //  console.log(user);

    return user;
});