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

function getLatLon() {
  var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${APIkey}`;

  fetch(requestUrl)
    .then(async function (response) {
      const data = await response.json();
      console.log(data)

      if (data.length == 0) {
        alert("Invalid city!")
      }
      else {
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

function buttonClickHandler(event) {
  event.preventDefault();
  console.log(city.value);
  //If nothing is entered, alert pops up to enter a search term.
  if (city.value === '') {
    $("#invalidEntry").text("Please enter a valid city!")
    return;
  }
  else {
    getLatLon(city.value);
  }
}
//Displays Modal when View Favorites is clicked
$(".favoritesButton").on("click", function (event) {
  event.preventDefault();
  $(".modal").addClass("is-active");
  console.log($(".modal"));
})
//Stops modal display when the close button on the modal is clicked.
$(".modal-close").on("click", function (event) {
  event.preventDefault();
  $(".modal").removeClass("is-active");
  console.log($(".modal"));
})

//Clears favorites when the clearFavorites button is clicked.
$(".clearFavorites").on("click", function (event) {
  event.preventDefault();
  window.localStorage.clear();
  $(".tableRow").empty();
})

function getFavorites() {
  var favoritesList = JSON.parse(localStorage.getItem("favorites"));
  if(!favoritesList){
    favoritesList = [];
  }
  favoritesList.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    if (a.id === b.id) {
      return 0;
    }
  });

  //if favoritesList.length===0 {} or !favoritesList.length
  if (favoritesList.length < 1) {
    $(".tableRow").text("You haven't added any favorites yet")
    document.querySelector(".clearFavorites").disabled = true;
    return;
  }

  for (var i = 0; i < favoritesList.length; i++) {
    console.log(favoritesList[i].id)

    var viewFavorites = `
        <div class="tile is parent has-text-dark">
        <article class="tile is-child box button" style="font-weight:bolder;">
          <a href="./brewery.html?q=${favoritesList[i].id}"><p>${favoritesList[i].name}</p></a>
        </article>
        </div>`
    $(".tableRow").append(viewFavorites);

  }
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

function uselessFacts() {

  setInterval(function () {

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
    , 8000);
}

startFacts();
getFavorites();
$("form").submit(buttonClickHandler);
displayTime();
