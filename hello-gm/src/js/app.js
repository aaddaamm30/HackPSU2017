// Your code goes here

//get the lat long and return tuple
function mainWeather(position){
  //var position = gm.info.getCurrentPosition();
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  getPlaceKey(formatURL(lat, lng));
}

//get the actual weather data
function pullWeather(key){
  var newClient = function(){
    this.get = function(address, callback){
      var nextRequest = new XMLHttpRequest();
      nextRequest.onreadystatechange = function(){
        if(nextRequest.readyState == 4 && nextRequest.status == 200){
          callback(nextRequest.responseText);
        }
      }
      nextRequest.open("GET", address, true);
      nextRequest.send(null);
    }
  }

  //set up new http call to get local weather data
  var newrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
  newrl = newrl.concat(key);
  newrl = newrl.concat('?apikey=HackPSU2017');
  var goget = new newClient;
  goget.get(newrl, function(response){
    var currentSky = JSON.parse(response);
    var lblDiv = document.getElementById('weatherInfo');
    var newString = 'Its Fucking ';
    console.log(currentSky);
    console.log(currentSky[0].WeatherText);
    newString = newString.concat(currentSky[0].WeatherText);
    lblDiv.innerHTML = newString;
  });
}


//function that formats url
function formatURL(lat,loc){

  var url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=HackPSU2017&q=';
  var url = url.concat(lat);
  var url = url.concat('%2C%20');
  var url = url.concat(loc);
  return(url);
}

//get the key value
function getPlaceKey(theURL){

  //set callback
  var HttpClient = function() {
    this.get = function(aUrl, callback){
      var newRequest = new XMLHttpRequest();
      newRequest.onreadystatechange = function(){
        if(newRequest.readyState == 4 && newRequest.status == 200){
          callback(newRequest.responseText);
        }
      }
      newRequest.open("GET", aUrl, true);
      newRequest.send(null);
    }
  }

  //use callback defined above
  var returnKey = new HttpClient();
  returnKey.get(theURL, function(response){
    var defd = JSON.parse(response);
    pullWeather(defd.Key);
  });
}

//main get/display function that runs on click of how weather button
function getWeather(){

  gm.info.getCurrentPosition(mainWeather, true);
}
