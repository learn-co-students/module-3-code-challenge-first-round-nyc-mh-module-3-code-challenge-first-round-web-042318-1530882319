const BEER_URL = "http://localhost:3000/beers"

var mainHTML = document.getElementById("container")
var beerSidebarHTML = document.getElementById("sidebar")
var beerDetailHTML = document.getElementById("beer-detail")

var beersObj;

(function getBeersFromApi() {
  fetch(BEER_URL).then(r => r.json()).then(beers => pushBeers(beers))
})();

function pushBeers(beers) {
  beersObj = beers;
  displaySideBeers();
}

function displaySideBeers() {

  beersObj.forEach(beer => {
      beerSidebarHTML.innerHTML +=
        `<ul class="list-group">
        <li data-action="${beer.id}" class="list-group-item">${beer.name}</li>
        </ul>
      </div>`
  })
}

function displayMainBeer(beer){
  beerDetailHTML.innerHTML =
    `<h1>${beer.name}</h1>
      <img src=${beer.image_url}>
      <h3>${beer.tagline}</h3>
      <textarea id="edit-field" data-index="${beer.id}">${beer.description}</textarea>
        <button data-action="save" data-index="${beer.id}" id="edit-beer" class="btn btn-info">
          Save
        </button>`
}

function addBeerToDatabase(beerID, desc) {
   fetch(`${BEER_URL}/${beerID}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'description': desc
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {

  document.body.addEventListener('click', function(event) {

    beersObj.forEach(function(b) {

      if (event.target.dataset.action === `${b.id}`) {

          displayMainBeer(b);
      }
    })

      if (event.target.dataset.action === "save") {
        var editField = document.getElementById("edit-field");
        var editFieldValue = editField.value
        var beerId = parseInt(event.target.dataset.index)

          addBeerToDatabase(beerId, editFieldValue);

            if (addBeerToDatabase){
                beerDetailHTML.innerHTML = " BEER DESCRIPTION SAVED!"
            } else {
                beerDetailHTML.innerHTML = "OOPS SOMETHING WENT WRONG..."
            }
      }
    })
})
