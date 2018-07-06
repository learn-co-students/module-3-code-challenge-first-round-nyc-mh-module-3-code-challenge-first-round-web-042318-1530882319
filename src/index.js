const beerURL = "http://localhost:3000/beers"
document.addEventListener("DOMContentLoaded", function() {

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

  function fetchBeerDetails(event) {
    let beerId = event.target.dataset.beerId;
    return fetch(beerURL + '/' + `${beerId}`).then( resp => resp.json());
  }

  function handleDisplayingBeer(beerJson) {

    beerJson.forEach( function(beerObj) {
      createAndAppendBeerElement(beerObj);
    })
  }

  function handleDisplayingBeerDetails(event) {
    if (event.target.dataset.beerId) {
      fetchBeerDetails(event).then(beerObj => renderBeerDetails(beerObj));
    }
  }

  function renderBeerDetails(beerObj) {
    beerDetailDiv.innerHTML = "";
    console.log(beerObj);
    beerDetailDiv.innerHTML += `<h1>${beerObj.name}</h1> <img src="${beerObj.image_url}"> <h3>${beerObj.tagline}`
    beerDetailDiv.innerHTML += `<textarea>${beerObj.description}</textarea><button id="edit-beer" class="btn btn-info" data-beer-id="${beerObj.id}">Save</button>`
  }

  function updateBeerDescriptionInDb(event) {
    if (event.target.id === "edit-beer") {
      const currDescription = event.target.parentElement.querySelector("textarea").value
      const payload = { description: currDescription}
      const configObj = {
        method: 'PATCH',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
      fetch(beerURL + `/${event.target.dataset.beerId}`, configObj);
    }
  }

  displayDataFromDb();
})
