/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

  /*    app = {
        // App initialization
        init: function() {
            // var self = this;

            //geoFindMe();

            // Geolocate!
            geolocate();
        }

    };
*/
  
    // Geolocates the user
    function geolocate() {
        if ("geolocation" in navigator) {
            // Attempt to get the user position
            navigator.geolocation.getCurrentPosition(function(position) {

                $("#latitude").text(position.coords.latitude);
                $("#longitude").text(position.coords.longitude);
                $("#accuracy").text(position.coords.accuracy);
                $("#timestamp").text(Date(position.timestamp));
                $("#batterylife").text(batteryLife());
                
                alert('working...');
            });
        }
    }
    
    /*
     * https://github.com/robnyman/robnyman.github.com/tree/master/battery
     * @returns {String}
     */
    function batteryLife(){
        
        var batteryLevel = "";
       
    /*
       
        if (battery) { 
            var batteryLevel = Math.round(battery.level * 100) + "%", 
                charging = (battery.charging)? "" : "not ", 
                chargingTime = parseInt(battery.chargingTime / 60, 10), 
                dischargingTime = parseInt(battery.dischargingTime / 60, 10);
        
        // var batteryLevel = battery.level * 100 + "%";

                // Set events 
                /*
                battery.addEventListener("levelchange", showStatus);
                battery.addEventListener("chargingchange", showStatus);
                battery.addEventListener("chargingtimechange", showStatus);
                battery.addEventListener("dischargingtimechange", showStatus);
                /
         }
       */
        
        return batteryLevel;
        
    }
   

    // Geolocates the user
    function geolocate2() {

        // If the object exists, geolocation services are available. 
        // You can test for the presence of geolocation thusly:
        if ("geolocation" in navigator) {

            // To obtain the user's current location, you can call the getCurrentPosition() method. 
            // This initiates an asynchronous request to detect the user's position, 
            // and queries the positioning hardware to get up-to-date information
            navigator.geolocation.getCurrentPosition(function(position) {


                // Set the address position 
                if (position.coords.latitude != undefined && position.coords.longitude != undefined) {

                    // test that the GPS locations are being called
                    alert("Location Found: " + position.coords.latitude + "," + position.coords.longitude);

                    output.innerHTML = "<p>Locating…</p>";

                    var query = encodeURIComponent("SELECT results FROM json WHERE url='maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true'"),
                            url = "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json&callback=geocodeCallback";

                    alert("query: " + query);

                    // Make the JSONP call to Twitter
                    lastRequest = $.ajax(url, {
                        cache: false,
                        crossDomain: true,
                        dataType: "jsonp",
                        callback: "geocodeCallback",
                        timeout: 3000
                    });
                }
            });
        }
    }

    // Initialize the app
//    app.init();

});