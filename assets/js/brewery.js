// Populates brewery.html with information about a specific brewery.

var params = new URLSearchParams(document.location.search);
var query = `https://api.openbrewerydb.org/breweries/${params.get("q")}`;
var nameEl = $("#brewery-name");
var addressEl = $("#address");
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
            cityStateZipEl.text(`${data.city}, ${data.state}  ${data.postal_code}`)
            phoneEl.text(data.phone);
            phoneEl.attr("href", `tel:${data.phone}`);
            urlEl.text(data.website_url);
            urlEl.attr("href", data.website_url);
            }
        )
}

getBrewery();