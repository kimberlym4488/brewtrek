// Populates brewery.html with information about a specific brewery. Stuck on adding dashes in phone number.

var params = new URLSearchParams(document.location.search);
var query = `https://api.openbrewerydb.org/breweries/${params.get("q")}`;
var nameEl = $("#brewery-name");
var addressEl = $("#address");
var googleLink = $("#lmgtfy");
var cityStateZipEl = $("#cityStateZip");
var phoneEl = $("#phone");
var urlEl = $("#url");

function getBrewery(){
    fetch(query)
        .then(function(result){
            return result.json();
        })
        .then(function(data){
            nameEl.text(data.name);
            addressEl.text(`${data.street}`)
            // googleLink.attr("href", `https://www.google.com/maps/place/${data.street}+${data.city}+${data.state}+${data.postal_code}`)
            googleLink.attr("href", `https://www.google.com/maps/place/${data.name.split(" ").join("+")}+${data.street}+${data.city}+${data.state}+${data.postal_code}`)
            cityStateZipEl.text(`${data.city}, ${data.state}  ${data.postal_code}`);
            phoneEl.text(data.phone);
            phoneEl.attr("href", `tel:${data.phone}`);
            urlEl.text(data.website_url);
            urlEl.attr("href", data.website_url);
            }
        )
}

function delimitPhonenumber(number){

}

getBrewery();