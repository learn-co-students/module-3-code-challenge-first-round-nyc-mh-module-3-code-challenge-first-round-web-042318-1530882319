const beerURL = "http://localhost:3000/beers"
document.addEventListener("DOMContentLoaded", function() {
  let beers = [];

  const beerList = document.getElementById("list-group");
  beerList.addEventListener("click", handleDisplayingBeerDetails);
  beerDetailDiv.addEventListener("click", handleUpdatingBeerDescription)


  function displayDataFromDb() {
    fetch(beerURL).then( resp => resp.json() ).then( beerJson => handleDisplayingBeer(beerJson) )
  }

  function findBeerFromLocalId(event) {
   return beers.find( function(beer) { return beer.id === parseInt(event.target.dataset.beerLocalId)} );
  }

  function handleDisplayingBeer(beerJson) {
    beerJson.forEach( beer => beers.push(new Beer(beer)))
    beers.forEach( function(beerObj) {
      beerObj.addToList();
    })
  }

  function handleDisplayingBeerDetails(event) {
    if (event.target.dataset.beerLocalId) {
      let currBeer = findBeerFromLocalId(event);
      currBeer.renderDetails();
    }
  }

  function handleUpdatingBeerDescription(event) {
    if (event.target.id === "edit-beer") {
      updateBeerDescriptionInDb(event)
      let currBeer = findBeerFromLocalId(event);
      currBeer.description = event.target.parentElement.querySelector("textarea").value;
    }
  }


  function updateBeerDescriptionInDb(event) {
      const currDescription = event.target.parentElement.querySelector("textarea").value
      const payload = { description: currDescription}
      const configObj = {
        method: 'PATCH',
        headers: {
          "Accept": "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
      fetch(beerURL + `/${event.target.dataset.beerDbId}`, configObj);
  }

  displayDataFromDb();
})
