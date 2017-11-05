// Your code goes here

//get the lat long and return tuple
function mainWeather(position){
  //var position = gm.info.getCurrentPosition();
  console.log(position);
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
        if(newRequest.readyState == 4 && newRequest.status == 200){
          callback(newRequest.responseText);
        }
      }
      nextRequest.open("GET", address, true);
      nextRequest.send(null);
    }
  }
}
//function that formats url
function formatURL(lat,loc){

  var url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=HackPSU2017&q=';
  var url1 = url.concat(lat);
  var url2 = url1.concat('%2C%20');
  var url3 = url2.concat(loc);
  return(url3);
}

//get the key value
function getPlaceKey(theURL){

  //set callback
  var HttpClient = function() {
    this.get = function(aUrl, Callback){
      var newRequest = new XMLHttpRequest();
      newRequest.onreadystatechange = function(){
        if(newRequest.readyState == 4 && newRequest.status == 200){
          Callback(newRequest.responseText);
        }
      }
      newRequest.open("GET", aUrl, true);
      newRequest.send(null);
    }
  }

  //use callback defined above
  var returnKey = new HttpClient();
  returnKey.get(theURL, function(response){
    console.log(response);
    var defd = JSON.parse(response);
    console.log(defd.Key);
  });
}

//main get/display function that runs on click of how weather button
function getWeather(){

  gm.info.getCurrentPosition(mainWeather, true);
}
