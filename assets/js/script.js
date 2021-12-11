var timeDisplayEl = $("#time");
var city = document.querySelector("#input");
var mainText = document.querySelector("#mainText");
var invalidFeedback = document.querySelector(".feedback");
var APIkey = "a059151d000029215400bdaa7965fbc2"
var latitude = '';
var longitude = '';


function displayTime() {
    var now = moment().format('dddd, MMMM Do');
    console.log(now)
    timeDisplayEl.text(now);
}

function getBreweries(latitude, longitude) {
    // Insert the API url to get a list of weather data
   console.log(`This is my ${longitude} latitude, this is my ${latitude} longitude, this is my ${APIkey} ApiKey. My residence is ${city.value}`)

    var requestUrl = `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}&page=1`;
    
    fetch(requestUrl)
      .then(async function (response) {
        var data = await response.json();
        printMainContainer(data);
        return;
        //this object contains all the data we requested. 
      })

    } 
     
function printMainContainer(data){

     //for some reason calling the icon below works ks to get the icon to append to the div above.
    //Add contents into daily cards.
    for (var i = 0; i<data.length; i++) {
        console.log(data);
        console.log(data[i].name)
        console.log(data[i].website_url)
   
        var htmlTemplate = "";

    htmlTemplate+=`<p>Brewery info ${data[i].name} goes here</p>`

    document.location.replace("./breweries.html");
   //append string HTML with jQuery
    }
}

function getLatLon(){
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=a059151d000029215400bdaa7965fbc2`;
    
    fetch(requestUrl)
      .then(async function (response) {
        const data = await response.json();
      for (var i = 0; i<data.length; i++) {
            console.log(data)
            latitude = data[i].lat;
            longitude = data[i].lon;
            console.log(longitude);
            console.log(latitude);
            getBreweries(latitude,longitude);
            return;
      }
        //}
        //can put data here
        
        //this object contains all the data we requested. SHould we have a fail safe if it doesn't work, like try your zip code?
      })
      };

function buttonClickHandler(event){
    event.preventDefault();
    console.log(city.value);
//If nothing is entered, alert pops up to enter a search term.
        if (city.value==='') {
  
            var invalidFeedback = 
            `<p>Please enter a valid city</p>`
        
            $(invalidFeedback).empty().append($("#input"))
            console.log(invalidFeedback)
            return;
        } 
        else {
            getLatLon(city.value);
        }
}

document.getElementById('btn').addEventListener("click", buttonClickHandler);
displayTime();