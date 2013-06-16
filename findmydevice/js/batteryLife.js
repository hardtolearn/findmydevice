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