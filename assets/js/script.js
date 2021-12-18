var welcomeMessage = $("#welcomeMessage");
var city = document.querySelector("#input");
var mainText = document.querySelector("#mainText");
var invalidFeedback = document.querySelector(".feedback");
var APIkey = "a059151d000029215400bdaa7965fbc2"


function displayTime() {
    var today = moment().format('dddd');
   
    var welcome = `
    <p style="font-weight:bolder">View breweries.</p>
    <p style="font-weight:bolder">Pick your place.</p>
    <p style="font-weight:bolder">Have an epic ${today}.</p>`
    welcomeMessage.html(welcome);
}

function getLatLon(){
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${APIkey}`;
    
    fetch(requestUrl)
      .then(async function (response) {
        const data = await response.json();
        console.log(data)

        if (data.length == 0)
        {
          alert("Invalid city!")
        }
        else
        {
          var latitude = data[0].lat;
          var longitude = data[0].lon;
          console.log(longitude);
          console.log(latitude);
          document.location.replace(`./breweries.html?lat=${latitude}&lon=${longitude}`);
        }
        // getBreweries(latitude,longitude);
        return;
        //}
        //can put data here
      })
};

function buttonClickHandler(event){
    event.preventDefault();
    console.log(city.value);
//If nothing is entered, alert pops up to enter a search term.
        if (city.value==='') {
            $("#invalidEntry").text("Please enter a valid city!")
            return;
        } 
        else {
            getLatLon(city.value);
        }
}

$(".favoritesButton").on ("click", function(event){
  event.preventDefault();
  $(".modal").addClass("is-active");
  console.log($(".modal"));
})

$(".modal-close").on("click", function(event){
  event.preventDefault();
  $(".modal").removeClass("is-active");
   console.log($(".modal"));
})

function getFavorites(){

  var favoritesList=
  JSON.parse(localStorage.getItem("favorites"));

  //if favoritesList.length===0 {} or !favoritesList.length
      if (favoritesList===null){
      return;
      }
  
      for(var i=0; i<favoritesList.length;i++){
        console.log(favoritesList[i].id)

  var viewFavorites=
    `
      <tr class = p-3 onclick="openWin(${favoritesList[i].id})">
        <td class="p-3 tableData" id="tableData">${favoritesList[i].name} 
        </td>
      </tr>
    `

//Comes back with the id of the brewery. Change this into a variable so we can pass it through to brewery.js and take user to brewery.html. 

  $(".favoritesTab").append(viewFavorites)
    }
  }

function openWin(){
  console.log("You clicked a name!")
  console.log(favoritesList[i].id);

}

function startFacts() {

    $(".funFacts").empty();
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var htmlTemplate = `
        <p>${data.text}<p>`
        $(".funFacts").append(htmlTemplate);
        uselessFacts();
      })
}

function uselessFacts(){
    
    setInterval(function(){
        
             var requestUrl = 'https://uselessfacts.jsph.pl/random.json?language=en'
             $(".funFacts").empty();
             fetch(requestUrl)
               .then(function (response) {
                 return response.json();
               })
               .then(function (data) {
                 var htmlTemplate = `
                 <p>${data.text}<p>`
                 $(".funFacts").append(htmlTemplate);
               })
         }
       ,8000);
    }

startFacts();
getFavorites();
document.getElementById('btn').addEventListener("click", buttonClickHandler);
displayTime();
