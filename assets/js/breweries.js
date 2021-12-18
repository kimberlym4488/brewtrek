// Displays results from a user's query

var params = new URLSearchParams(document.location.search);
var resultsEl = $("#query-results");
var nextBtn = $("#next");
var previousBtn = $("#previous")
var pageNumber = params.get("p");
if(!pageNumber || pageNumber ){
	pageNumber = "1";
}
if(pageNumber !== "1"){
	previousBtn.removeAttr("disabled")
}
var latitude = params.get("lat");
var longitude = params.get("lon");

/**
 * Writes a list item to be appended to breweries.html
 * @param {Object} data A json object containing relevant information about a brewery, including name and address.
 * @returns a list item with a link to brewery.html
 */
function writeResult(data){
	return`
<div class="tile is parent">
	<article class="tile is-child box">
		<a href="./brewery.html?q=${data.id}"><p class="title">${data.name}</p></a>
		<a href="https://www.google.com/maps/place/${data.street}+${data.city}+${data.state}+${data.postal_code}"><p class="subtitle">${data.street}</p></a>
		<button class="button is-warning" onclick=setFavorite(event) data-name="${data.name}" data-id="${data.id}">Add to Favorites</button>
	</article>
</div>`
}

/**
 * Adds a brewery to a list of favorites.
 * @param {Event} event the event that triggered the call to this function.
 */
function setFavorite(event){
	var favorites = JSON.parse(localStorage.getItem("favorites"));
	console.log(event.currentTarget);
	var brewery = {
		name: event.currentTarget.dataset.name,
		id: event.currentTarget.dataset.id
	}
	if(favorites === null){
		favorites = [brewery];
	}else if(!favorites.some(item => item.name === brewery.name)){
		favorites.push(brewery);
	}
	localStorage.setItem("favorites", JSON.stringify(favorites));
	window.location.reload();
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

/**
 * Retrieves and displays a list of favorited breweries.
 * @returns if favorites list does not exist.
 */
function getFavorites(){
	var favoritesList=
	JSON.parse(localStorage.getItem("favorites"));
	console.log(favoritesList)
	//if favoritesList.length===0 {} or !favoritesList.length
	if (favoritesList===null){
		return;
	}
	for(var i=0; i<favoritesList.length;i++){
		console.log(favoritesList[i].id);
		var viewFavorites=`
<div class="tile is parent has-text-dark">
	<article class="tile is-child box button" style="font-weight:bolder;">
		<a href="./brewery.html?q=${favoritesList[i].id}"><p>${favoritesList[i].name}</p></a>
	</article>
</div>`
		$(".tableRow").append(viewFavorites);
  	}
}

/**
 * Retrieves a list of brewries from a location based on latitude and longitude
 * @param {string} latitude the latitude of the location
 * @param {string} longitude the longitude of the location
 * @param {string} page the offset from the list of results to display
 */
function getBreweries(latitude, longitude, page) {
    // Insert the API url to get a list of weather data
    var requestUrl = `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}&page=${page}`;
    
    fetch(requestUrl)
		.then(async function (response) {
			var data = await response.json();
			printMainContainer(data);
			return;
		})
}
     
/**
 * Displays the current list of breweries to the page.
 * @param {Array} data an array of objects representing the list of breweries to be displayed.
 */
function printMainContainer(data){
    //Add contents into daily cards.
	if(data.length < 1){
		resultsEl.append(
`<div class="tile is parent">
	<article class="tile is-child box">
		<p>No results! We've ran out of breweries.</p>
	</article>
</div>`
		)
		nextBtn.attr("disabled", "true");
	}
    for (var i = 0; i<data.length; i++) {
        resultsEl.append(writeResult(data[i]));
    }
}

/**
 * Retrieves and displays a random fact on the page.
 */
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

/**
 * Periodically updates the displayed random fact.
 */
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
				<p>${data.text}<p>`;
				$(".funFacts").append(htmlTemplate);
			})
    }, 10000);
}

/**
 * Navigates to the next set of breweries.
 */
nextBtn.click(function(){
	pageNumber++;
	document.location.replace(`./breweries.html?lat=${latitude}&lon=${longitude}&p=${pageNumber}`);
})

/**
 * Navigates to the previous set of displayed breweries.
 */
previousBtn.click(function(){
	pageNumber--;
	document.location.replace(`./breweries.html?lat=${latitude}&lon=${longitude}&p=${pageNumber}`);
});

startFacts();
getBreweries(latitude, longitude, pageNumber);
getFavorites();
