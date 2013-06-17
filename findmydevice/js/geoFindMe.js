/*
 * https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation
 * 
 * 
 */

function geoFindMe() {

    var output = document.getElementById("out");

    var options = {
        timeout: 5000,
        maximumAge: 0
    };

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var accuracy = position.coords.accuracy;
        var timestamp = Date(position.timestamp);
        var batteryLevel = batteryLife();

        output.innerHTML = '<p>' +
                'Latitude is ' + latitude + '' +
                '<br>Longitude is ' + longitude + ' ' +
                '<br>Accuracy is ' + accuracy + 'm ' +
                '<br>Timestamp is ' + timestamp + ' ' +
                '<br>Battery is ' +  batteryLevel + ' ' +
                '</p>';

        // Get a static image of from google map
        // https://developers.google.com/maps/documentation/staticmaps/
        // var img = new Image();
        // img.src = "http://maps.googleapis.com/maps/api/staticmap?center="
                // + latitude + "," + longitude
                // + "&zoom=13&size=300x300&markers=color:red|"
                // + latitude + "," + longitude + "&sensor=false";

        // Get the readable adddress from google
        // https://developers.google.com/maps/documentation/geocoding/#ReverseGeocoding

        //output.appendChild(img);
    }
    ;

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
    ;

    output.innerHTML = "<p>Searching for your location…</p>";

    navigator.geolocation.getCurrentPosition(success, error, options);


    /*
     * https://github.com/robnyman/robnyman.github.com/tree/master/battery
     * 
     * NOTE: email sent out when a low battery:
     * https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html
     * 
     * @returns {String}
     */
    function batteryLife() {

        var batteryLevel = "%";
        var battery = navigator.battery;

        if (battery) {

            batteryLevel = Math.round(battery.level * 100) + "%";

            // Set events 
            /*
             battery.addEventListener("levelchange", showStatus);
             battery.addEventListener("chargingchange", showStatus);
             battery.addEventListener("chargingtimechange", showStatus);
             battery.addEventListener("dischargingtimechange", showStatus);
             */
        }
        return batteryLevel;

    }

}