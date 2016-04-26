var lat, long;
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat);
            console.log(long);
            getWeather();
        })
    }
}
function getWeather(){
    var xhr = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast/weather?lat=" + lat + "&lon=" + long + "&APPID=173d45a8a4cea9f316f3142c74393309";
    xhr.open("GET", url, false);
    xhr.send();

    console.log(xhr.status);
    console.log(xhr.statusText);
}

getLocation();
