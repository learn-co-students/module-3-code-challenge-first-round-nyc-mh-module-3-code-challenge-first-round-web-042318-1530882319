const beerURL = "http://localhost:3000/beers"
document.addEventListener("DOMContentLoaded", function() {
  let beers;

  const beerList = document.getElementById("list-group");
  const beerDetailDiv = document.getElementById("beer-detail");
  beerList.addEventListener("click", handleDisplayingBeerDetails);
  beerDetailDiv.addEventListener("click", updateBeerDescriptionInDb)

  function createAndAppendBeerElement(beerObj) {
    let beerElement = document.createElement("li");
    beerElement.className = "list-group-item";
    beerElement.innerText = beerObj.name;
    beerElement.dataset.beerId = beerObj.id;
    beerList.append(beerElement);
  }

  function displayDataFromDb() {
    fetch(beerURL).then( resp => resp.json() ).then( beerJson => handleDisplayingBeer(beerJson) )
  }

  function createAndAppendFoodPairings(beerDetailDiv, beerObj) {
    beerDetailDiv.innerHTML += "<h4>Recommended Pairings:</h4>"
    beerObj.food_pairing.forEach( function(pairing) {
      beerDetailDiv.innerHTML += `<p>${pairing}</p>`
    })
  }

  function fetchBeerDetails(event) {
    let beerId = event.target.dataset.beerId;
    return fetch(beerURL + '/' + `${beerId}`).then( resp => resp.json());
  }

  function handleDisplayingBeer(beerJson) {
    beers = beerJson;
    debugger;
    beers.forEach( function(beerObj) {
      beerObj.addToList();
    })
  }

  function handleDisplayingBeerDetails(event) {
    if (event.target.dataset.beerId) {
      fetchBeerDetails(event).then(beerObj => renderBeerDetails(beerObj));
    }
  }

  function renderBeerDetails(beerObj) {
    beerDetailDiv.innerHTML = "";
    beerDetailDiv.innerHTML += `<h1>${beerObj.name}</h1> <img src="${beerObj.image_url}"> <h3>${beerObj.tagline}`
    beerDetailDiv.innerHTML += `<textarea>${beerObj.description}</textarea><button id="edit-beer" class="btn btn-info" data-beer-id="${beerObj.id}">Save</button>`
    beerDetailDiv.innerHTML += `<h4>First Brewed:</h4> <p>${beerObj.first_brewed}</p>`
    beerDetailDiv.innerHTML += `<h4>Tips from the Brewers: </h5>${beerObj.brewers_tips}`
    createAndAppendFoodPairings(beerDetailDiv, beerObj);
  }

  function updateBeerDescriptionInDb(event) {
    if (event.target.id === "edit-beer") {
      const currDescription = event.target.parentElement.querySelector("textarea").value
      const payload = { description: currDescription}
      const configObj = {
        method: 'PATCH',
        headers: {
          "Accept": "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
      fetch(beerURL + `/${event.target.dataset.beerId}`, configObj);
    }
  }

  displayDataFromDb();
})
