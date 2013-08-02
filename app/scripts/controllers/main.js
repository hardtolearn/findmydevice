'use strict';

angular.module('findDeviceApp')
  .controller('MainCtrl', function ($scope, geoService) {
     
    console.log($scope.session);  
      
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    geoService();
    $scope.$on("locationChanged", function (event, parameters) {
        $scope.coords= parameters.coordinates;
    });
    
  });
