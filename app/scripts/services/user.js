'use strict';

// https://gist.github.com/Mithrandir0x/3639232
// provider style, full blown, configurable version     
angular.module('findDeviceApp').provider('user', function() {
    // In the provider function, you cannot inject any
    // service or factory. This can only be done at the
    // "$get" method.
 
    this.name = 'Default';
    this.emailAddress = 'Default';
 
    this.$getName = function() {
        var name = this.name;
        return {
            sayHello: function() {
                return name;
            }
        };
    };
 
    this.setName = function(name) {
        this.name = name;
    };
    
    this.$getName = function() {
        var emailAddress = this.emailAddress;
        return {
            getEmailAddress: function() {
                return emailAddress;
            }
        };
    };
    
    this.setEmailAddress = function(emailAddress) {
        this.emailAddress = emailAddress;
    };
});