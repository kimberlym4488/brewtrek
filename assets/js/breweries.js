// Displays results from a user's query

var params = new URLSearchParams(document.location.search);
var resultsEl = $("#query-results");
var nextBtn = $("#next");
var previousBtn = $("previous")
var pageNumber = params.get("p");

/**
 * Writes a list item to be appended to breweries.html
 * @param {string} name name of the brewery
 * @param {number} id openbrewerydb id of the brewery
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

	var viewFavorites=
		`
		<tr class = p-3 onclick="openWin(${favoritesList[i].id})">
		<td class="p-3 tableData" id="tableData">${favoritesList[i].name} 
		</td>
		</tr>
		`
	$(".favoritesTab").append(viewFavorites)
	}
}

function openWin(){
  
  console.log("You clicked the favorite!")
}

function getBreweries(latitude, longitude) {
    // Insert the API url to get a list of weather data
    var requestUrl = `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}&page=1`;
    
    fetch(requestUrl)
		.then(async function (response) {
			var data = await response.json();
			printMainContainer(data);
			return;
		})
  } 
     
function printMainContainer(data){
    //Add contents into daily cards.
    for (var i = 0; i<data.length; i++) {
        resultsEl.append(writeResult(data[i]));
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
    }, 10000);
}

startFacts();
getBreweries(params.get("lat"), params.get("lon"));
getFavorites();
