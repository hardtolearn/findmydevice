'use strict';

'use strict';

findDeviceApp.controller('CreateAccountCtrl', function ($scope, Base64, $filter, localStorageService, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
  $scope.save = function(user){
	console.log(user.username);
	console.log(Base64.encode(user.username));
	
	// encode username
	var username = Base64.encode(user.username);
	/// encode password
	var password = Base64.encode(user.password);
	// Email Address
	var emailAddress = user.emailAddress;
	// Add a timestamp for when the account was created
	
	// Just make sure that username is empty in local storage before saving
	if (localStorageService.get('fduser.username') === null && localStorageService.get('fduser.username') !== '') {
	    // ERROR! There is a username and 
	    // TO DO: Display error
	}
	
	// Save user details 
	var store_username = localStorageService.add('fduser.username', username),
	store_password = localStorageService.add('fduser.password', password),
	store_emailAddress = localStorageService.add('fduser.emailAddress', emailAddress);

	var timestamp = $filter('date')(new Date(), 'medium');
	localStorageService.add('fduser.dateCreated', timestamp);
	
	if(!store_username || !store_password || !store_emailAddress){
	    // TO DO: Display saving error to local storage
	    // end command
	}
	
	// Load the User Controller to insert the local storage into the User Object
	$location.path( "/login" );
  };
    
  });
