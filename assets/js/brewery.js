// Populates brewery.html with information about a specific brewery. Stuck on adding dashes in phone number.

var params = new URLSearchParams(document.location.search);
var query = `https://api.openbrewerydb.org/breweries/${params.get("q")}`;
var nameEl = $("#brewery-name");
var addressEl = $("#address");
var googleLink = $("#lmgtfy");
var cityStateZipEl = $("#cityStateZip");
var phoneEl = $("#phone");
var urlEl = $("#url");
var favoriteBtn = $("#favourite");
var subtitleEl = $(".subtitle")
var titleEl = $(".title")


/**
 * Retrieves and displays information for the selected brewery.
 */

//-----BREWERY FETCH FUNCTION------------------------------------------------------------------// 

function getBrewery(){
    fetch(query)
        .then(function(result){
            return result.json();
        })
        .then(function(data){
			console.log(data);
            nameEl.text(data.name);
			nameEl.attr("data-id", params.get("q"));
            addressEl.text(`${data.street}`)
			if(data.state === null){
				googleLink.attr("href", `https://www.google.com/maps/place/${data.street}+${data.city}+${data.postal_code}`)
				cityStateZipEl.text(`${data.city}  ${data.postal_code}`);
			}else{
				googleLink.attr("href", `https://www.google.com/maps/place/${data.street}+${data.city}+${data.state}+${data.postal_code}`)
				cityStateZipEl.text(`${data.city}, ${data.state}  ${data.postal_code}`);
			}
            phoneEl.text(delineatePhoneNumber(data.phone));
            phoneEl.attr("href", `tel:${data.phone}`);
            urlEl.text(data.website_url);
            urlEl.attr("href", data.website_url);
		});
}
//-------------------------------------------------------------------------------------------//


/**
 * Splits up a phone number such that it is more readable.
 * @param {string or number} number a string (or number) of at least 10 characters representing a phone number.
 * @returns {string} in the format (###) ###-#### or +## (###) ###-#### depending on whether or not a country code is available.
 */

//-----BREWERY PHONE NUMBER FUNCTION---------------------------------------------------------// 

function delineatePhoneNumber(number){
	number = "" + number;
	number = number.split("")
	// OpenBreweryDB might not actually include country codes smh.
	var countryCode = "";
	if(number.length > 10){
		countryCode += "+" + number.slice(0, number.length - 10).join("");
	}
	var rootNumber = number.slice(number.length - 10, number.length);
	rootNumber.splice(6, 0, "-");
	rootNumber.splice(3, 0, " ");
	rootNumber.splice(3, 0, ")");
	rootNumber.splice(0, 0, "(");
	return (countryCode + " " + rootNumber.join("")).trim();
}
//------------------------------------------------------------------------------------------//


/**
 * Adds the current brewery to a list of favorite breweries.
 */

//-----FAVORITE BUTTON, SETTING IN LOCAL STORAGE--------------------------------------------// 

function setFavorite(){
	var favorites = JSON.parse(localStorage.getItem("favorites"));
	var brewery = {
		name: nameEl.text(),
		id: nameEl.attr("data-id")
	};
	if(favorites === null){
		favorites = [brewery];
	}else if(!favorites.some(item => item.name === brewery.name)){
		favorites.push(brewery)
	}
	localStorage.setItem("favorites", JSON.stringify(favorites));
  window.location.reload();
}

/**
 * Displays a list of favorite breweries.
 */
$(".favoritesButton").on ("click", function(event){
  event.preventDefault();
  $(".modal").addClass("is-active");
  console.log($(".modal"));
})

/**
 * Closes the favorite breweries list.
 */
$(".modal-close").on("click", function(event){
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
//------------------------------------------------------------------------------------------//


/**
 * Retrieve the current list of favorites.
 * @returns when the list of favorites is empty.
 */

//-----FAVORITE BUTTON, PULL FROM LOCAL STORAGE---------------------------------------------// 

function getFavorites() {

	var favoritesList = JSON.parse(localStorage.getItem("favorites"));
	console.log(favoritesList)
	//if favoritesList.length===0 {} or !favoritesList.length
	if (favoritesList === null) {
		$(".tableRow").text("You haven't added any favorites yet")
		document.querySelector(".clearFavorites").disabled = true;
		return;
	}
	for (var i = 0; i < favoritesList.length; i++) {
		console.log(favoritesList[i].name);
		var viewFavorites = `
<div class="tile is parent has-text-dark">
	<article class="tile is-child box button" style="font-weight:bolder;">
		<a href="./brewery.html?q=${favoritesList[i].id}"><p>${favoritesList[i].name}</p></a>
	</article>
</div>`
		$(".tableRow").append(viewFavorites);
	}
}
//------------------------------------------------------------------------------------------//

//-----USELESS FACTS FETCH FUNCTION---------------------------------------------------------// 
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
//------------------------------------------------------------------------------------------//

//-----USELESS FACTS DATA & DISPLAY FUNCTION------------------------------------------------// 
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
    , 10000);
}
//------------------------------------------------------------------------------------------//

getBrewery();
favoriteBtn.click(setFavorite);
getFavorites();
startFacts();
