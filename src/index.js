const beersURL = "http://localhost:3000/beers"
document.addEventListener("DOMContentLoaded", function() {

  function displayDataFromDb() {
    fetch(beersURL).then( resp => resp.json() ).then( beerJson => console.log(beerJson) )
  }

  displayDataFromDb(); 
})
