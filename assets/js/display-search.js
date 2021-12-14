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

    uselessFacts();