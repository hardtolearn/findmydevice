// Geolocates the user
function geolocate() {

    if ("geolocation" in navigator) {
        // Attempt to get the user position
        navigator.geolocation.getCurrentPosition(function(position) {

            $("#latitude").text(position.coords.latitude);
            $("#longitude").text(position.coords.longitude);
            $("#accuracy").text(position.coords.accuracy + "m");
            $("#timestamp").text(Date(position.timestamp));

            $("#batterylife").text(batteryLife());
            
    
             $("#completed").text("Done");
            
            

        });
    } else {
        $("#completed").text("Geolocation not working");
    }


}

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


$(function() {
    $("#getMyLocation").click(function() {
        alert("button press");
        geolocate();
        alert("done");
        
    });
});