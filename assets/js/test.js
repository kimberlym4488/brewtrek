// A file for testing API output and configuration.

var url = "https://api.openbrewerydb.org/breweries?by_city=seattle&per_page=50";

fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });