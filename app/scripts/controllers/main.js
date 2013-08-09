'use strict';

angular.module('findDeviceApp')
  .controller('MainCtrl', function ($scope, geoService, deviceSettings) {
     //deviceSettings
    //console.log($scope.session);  
      
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    geoService();
    $scope.$on("locationChanged", function (event, parameters) {
        $scope.coords= parameters.coordinates;
    });
    
    $scope.activateWifi = function(){ 
	
	//settings.checkWifiStatus();
	//MyCtrl();
	console.log("Turn on Wifi...");
	var wifiStatus = deviceSettings.checkWifiStatus();
	var wifiActivate = deviceSettings.activateWifi();
	
	console.log("wifi status; " + wifiStatus);
	alert("Wifi is now: " + wifiActivate);
	
    };
    
    $scope.activateWifiSmart = function(){ 
	
	//settings.checkWifiStatus();
	//MyCtrl();
	console.log("SMART Wifi...");
	var wifiActivate = deviceSettings.activateWifiSmart('wifi.enabled');
	
	alert("Smart Wifi is now: " + wifiActivate);
	
    };
    
  });
