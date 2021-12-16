// Populates brewery.html with information about a specific brewery. Stuck on adding dashes in phone number.

var params = new URLSearchParams(document.location.search);
var query = `https://api.openbrewerydb.org/breweries/${params.get("q")}`;
var nameEl = $("#brewery-name");
var addressEl = $("#address");
var googleLink = $("#lmgtfy");
var cityStateZipEl = $("#cityStateZip");
var phoneEl = $("#phone");
var urlEl = $("#url");
var favouriteBtn = $("#favourite");

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
            phoneEl.text(data.phone);
            phoneEl.attr("href", `tel:${data.phone}`);
            urlEl.text(data.website_url);
            urlEl.attr("href", data.website_url);
            
		});
}

function delimitPhonenumber(number){

}

function setFavourite(){
	var favourites = JSON.parse(localStorage.getItem("favourites"));
	var brewery = {
		name: nameEl.text(),
		id: nameEl.attr("data-id")
	};
	if(favourites === null){
		favourites = [brewery];
	}else if(!favourites.some(item => item.name === brewery.name)){
		favourites.push(brewery)
	}
	localStorage.setItem("favourites", JSON.stringify(favourites));
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
getBrewery();
favouriteBtn.click(setFavourite);
