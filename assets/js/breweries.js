// Displays results from a user's query

var params = new URLSearchParams(document.location.search);
var resultsEl = $("#query-results");

/**
 * Writes a list item to be appended to breweries.html
 * @param {string} name name of the brewery
 * @param {number} id openbrewerydb id of the brewery
 * @returns a list item with a link to brewery.html
 */
function writeResult(name, id){
    // TODO: Add brewery information in the body of the list item.

// let rowEle = $("<div class='tile is-ancestor'>");
// let column1Ele = $("<div class='title-parent'>");
// let textEle = $("<article class='title is-child box'>");
// let titleEle = $("<p class='title'>");
// let subtitleEle = $("<p class='Subtitle'>");
// titleEle.append(titleEle);
// subtitleEle.append(subtitleEle);

// column1Ele.append(rowEle);

// let column2Ele = $("<div class='title-parent'>");
// let textEle = $("<article class='title is-child box'>");
// let titleEle = $("<p class='title'>")
// let subtitleEle = $("<p class='Subtitle'>");
// titleEle.append(titleEle);
// subtitleEle.append(SubtitleEle);

// column2Ele.append(rowEle);
return 
`<div class="tile is-ancestor">
    <div class="tile is-parent">
    <article class="tile is-child box">
        <p class="title">${One}</p>
        <p class="subtitle">${Subtitle}</p>
    </article>
    </div>
    <div class="tile is-parent">
    <article class="tile is-child box">
        <p class="title">${Two}</p>
        <p class="subtitle">Subtitle</p>
    </article>
    </div>
    <div class="tile is-parent">
    <article class="tile is-child box">
        <p class="title">${Three}</p>
        <p class="subtitle">${Subtitle}</p>
    </article>
    </div>
    <div class="tile is-parent">
    <article class="tile is-child box">
        <p class="title">${Four}</p>
        <p class="subtitle">${Subtitle}</p>
    </article>
    </div>
</div>`
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
        resultsEl.append(writeResult(data[i].name, data[i].id));
    }
}

getBreweries(params.get("lat"), params.get("lon"));