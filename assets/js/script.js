var timeDisplayEl = $("#time");
var city = document.querySelector("#input");
var mainText = document.querySelector("#mainText");
var invalidFeedback = document.querySelector(".feedback");
var APIkey = "a059151d000029215400bdaa7965fbc2"


function displayTime() {
    var now = moment().format('dddd, MMMM Do');
    console.log(now)
    timeDisplayEl.text(now);
}


function getLatLon(){
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${APIkey}`;
    
    fetch(requestUrl)
      .then(async function (response) {
        const data = await response.json();
        console.log(data)
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        console.log(longitude);
        console.log(latitude);
        document.location.replace(`./breweries.html?lat=${latitude}&lon=${longitude}`);
        // getBreweries(latitude,longitude);
        return;
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