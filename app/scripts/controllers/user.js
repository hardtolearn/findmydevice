'use strict';

findDeviceApp.controller('UserCtrl',
        function UserController($scope, user, $location) {
	    
	    if(!user.loggedIn){
		$location.path("/login");
		console.log("not logged in");
	    } else {
		console.log("logged in");
	    }
            
	    console.log("User Controller");
	    console.log($scope);
            console.log(user);
                     
          
           $scope._users = [
                {
                    "User": {
                        "username": user.username,
                        "password": user.password,
                        "emailAddress": user.emailAddress,
			"dateCreated": user.dateCreated,
			"loggedIn": user.loggedIn,
                        "status": "0",
                        "Report": [
                            {
                                "lastReport": "12-23-12",
                                "dateFound": "14-10-12"
                            }
                        ]
                    }
                }
            ];
	    
	    console.log($scope);
           




        });