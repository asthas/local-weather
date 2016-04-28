var lat, long;
var url, symbol;
$("[name='my-checkbox']").bootstrapSwitch();
$('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
  console.log(state); // true | false
  if(!state){
    url = "https://weather.astha.me/forecast/a4d96f54066d22e1e08e3f7ed73b7f54/" + lat+ "," + long+"?units=us";
    symbol = ' F';
  }else {
    url = "https://weather.astha.me/forecast/a4d96f54066d22e1e08e3f7ed73b7f54/" + lat + "," + long + "?units=si";
    symbol = '\xB0C';
  }
  getWeather(url, symbol);
});
console.log(url);
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat);
            console.log(long);
            url = "https://weather.astha.me/forecast/a4d96f54066d22e1e08e3f7ed73b7f54/" + lat + "," + long + "?units=si";
            symbol = '\xB0C';
            getWeather(url, symbol);
        })
    }
}

function getWeather(url){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 & xhr.status == 200){
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            display(data, symbol);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();

    console.log(xhr.status);
    console.log(xhr.statusText);
}

function display(data, symbol){
    displayImg(data);
    var output = '';
    output += '<h2>' + data.timezone + '</h2>';
    output += '<h4>' + data.currently.icon + '</h4>';
    output += '<h1>' + data.currently.temperature + symbol + '</h1>';
    document.getElementById("data").innerHTML = output;
}
function displayImg(data){
        var main = data.currently.icon;
        console.log(data);
        if(main.indexOf("cloudy") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/overcast.jpg)";
        } else if(main.indexOf("wind") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/windy.jpg)";
        } else if(main.indexOf("Sun") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/sunny.jpg)";
        } else if(main.indexOf("rain") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/rainy.jpg)";
        }else if(main.indexOf("partly-cloudy") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/cloudy.jpg)";
        }else if(main.indexOf("clear-night") > -1){
            document.getElementById("back-img").style.backgroundImage="url(images/clear-night.jpg)";
        }else{
            document.getElementById("back-img").style.backgroundImage="url(images/snow.jpg)";
        }
}
getLocation();
