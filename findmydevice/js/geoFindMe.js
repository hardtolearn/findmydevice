// options for the geolocation 
var geo_options = {
	timeout: 27000,
	maximumAge: 30000,
	enableHighAccuracy: true
};

//location function is defining with parameter
function Location(position){
	var latitude = position.coords.latitude; //Specifies the longitude estimate in decimal degrees. The value range is [-180.00, +180.00].
	var longitude = position.coords.longitude;
	document.getElementById("lati").innerHTML = latitude; //latitude value is defining in label element where id is lati
	document.getElementById("longi").innerHTML = longitude;
	alert("found location");
};

function error(error) {
	output.innerHTML = "Unable to retrieve your location: " + error.message;
	alert('ERROR(' + error.code + '): ' + error.message);
};

document.getElementById("submit").addEventListener('click', function findLocation() {
	//checking browser compatibility
	if (navigator.geolocation){
		//getCurrentPosition method retrieve the current geographic location of the user
		navigator.geolocation.getCurrentPosition(Location, error, geo_options);
	} else {
		alert("browser does not support 'navigation.geolocation'");
	}
});

