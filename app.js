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
    var url = "http://api.openweathermap.org/data/2.5/forecast/weather?lat=" + lat + "&lon=" + long + "&units=metric&APPID=173d45a8a4cea9f316f3142c74393309";

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 & xhr.status == 200){
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            display(data);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();

    console.log(xhr.status);
    console.log(xhr.statusText);
}

function display(data){
    displayImg(data);
    var output = '';
    output += '<h2>' + data.city.name + '</h2>';
    output += '<h4>' + data.list[0].weather[0].main + '</h4>';
    output += '<h5>' + data.list[0].weather[0].description + '</h5>';
    output += '<h1>' + data.list[0].main.temp + '\xB0C</h1>';
    document.getElementById("data").innerHTML = output;
}
function displayImg(data){
        var main = data.list[0].weather[0].main;
        var description = data.list[0].weather[0].description;
        console.log(data);
        if(main.indexOf("Cloud") > -1 && description.indexOf("Overcast") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/overcast.jpg)";
        } else if(main.indexOf("Wind") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/windy.jpg)";
        } else if(main.indexOf("Sun") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/sunny.jpg)";
        } else if(main.indexOf("Rain") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/rainy.jpg)";
        }else if(main.indexOf("Cloud") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/cloudy.jpg)";
        }else{
            document.getElementById("back-img").style.backgroundImage="url(images/snow.jpg)";
        }
}
getLocation();
