// Displays results from a user's query

var params = new URLSearchParams(document.location.search);
var resultsEl = $("#query-results");

/**
 * Writes a list item to be appended to breweries.html
 * @param {string} name name of the brewery
 * @param {number} id openbrewerydb id of the brewery
 * @returns a list item with a link to brewery.html
 */
// function writeResult(name, id){
    // Added brewery information in the body of the list item.

function writeResult(data){
    // TODO: Add brewery information in the body of the list item.


// $("#").append(div)
// column1Ele.append(rowEle);

// let column2Ele = $("<div class='title-parent'>");
// let textEle = $("<article class='title is-child box'>");
// let titleEle = $("<p class='title'>")
// let subtitleEle = $("<p class='Subtitle'>");
// titleEle.append(titleEle);
// subtitleEle.append(SubtitleEle);

// column2Ele.append(rowEle);
return`
<div class="tile is parent">
	<article class="tile is-child box">
		<a href="./brewery.html?q=${data.id}"><p class="title">${data.name}</p></a>
		<a href="https://www.google.com/maps/place/${data.street}+${data.city}+${data.state}+${data.postal_code}"><p class="subtitle">${data.street}</p></a>
		<button class="button is-warning" onclick=setFavorite(event) data-name=${data.name} data-id=${data.id}>Add to Favorites</button>
	</article>
</div>`
}

function setFavorite(event){
	var favorites = JSON.parse(localStorage.getItem("favorites"));

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
}

function getBreweries(latitude, longitude) {
    // Insert the API url to get a list of weather data
   console.log(`This is my ${longitude} latitude, this is my ${latitude} longitude`)

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
        console.log(data);
        console.log(data[i].name)
        console.log(data[i].website_url)
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
         }
       ,4000);
    }

startFacts();
getBreweries(params.get("lat"), params.get("lon"));
