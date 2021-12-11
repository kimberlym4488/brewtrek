// Displays results from a user's query

var params = new URLSearchParams(document.location.search);
var resultsEl = $("#query-results");

/**
 * Writes a list item to be appended to breweries.html
 * @param {*} name name of the brewery
 * @returns a list item with a link to brewery.html
 */
function writeResult(name){
    // TODO: Add brewery information in the body of the list item.
    return `
    <li class="box">
        <a href="./brewery.html?q=${name}">
            PLACEHOLDER TEXT
        </a>
    </li>`;
}