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
    return `
    <li class="box">
        <a href="./brewery.html?q=${id}">
            ${name}
        </a>
    </li>`;
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

function startFacts() {
    $(".subtitle").empty();
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var htmlTemplate = `
        <p>${data.text}<p>`
        $(".subtitle").append(htmlTemplate);
        uselessFacts();
      })
}

function uselessFacts(){
    
    setInterval(function(){
        
             var requestUrl = 'https://uselessfacts.jsph.pl/random.json?language=en'
             $(".subtitle").empty();
             fetch(requestUrl)
               .then(function (response) {
                 return response.json();
               })
               .then(function (data) {
                 var htmlTemplate = `
                 <p>${data.text}<p>`
                 $(".subtitle").append(htmlTemplate);
               })
         }
       ,4000);
    }

startFacts();
getBreweries(params.get("lat"), params.get("lon"));

