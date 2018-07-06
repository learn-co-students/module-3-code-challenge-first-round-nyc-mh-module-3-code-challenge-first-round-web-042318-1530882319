// url variables
const url = "http://localhost:3000/beers"
let beers = []

//core functionality after loading
document.addEventListener("DOMContentLoaded", function(event) {

  //html element selectors
  const sidebar = document.getElementById("list-group");
  const showContainer = document.getElementById("beer-detail");
  const mainContainer = document.getElementById("main-container");

  //show detail beer functionality
  function findBeerById(beerId){
    const clickedBeer = beers.find(function(beer){
      return beer.id === parseInt(beerId);
    })
    return clickedBeer;
  };

  function buildBeerHtml(beerData){
    return `<h1>${beerData.name}</h1>
            <img src="${beerData.image_url}">
            <h3>${beerData.tagline}</h3>
            <textarea id="description-textfield">${beerData.description}</textarea>
            <button id="edit-beer" data-beer-id="${beerData.id}" class="btn btn-info">
                Save
            </button>`
  }

  function displayDetailBeer(beerId){
    const clickedFoudBeer = findBeerById(beerId);
    showContainer.innerHTML = buildBeerHtml(clickedFoudBeer);
  }

  function saveAmendedDescription(beerId,amendedDescriptionText){
    const updateURL = `${url}/${beerId}`;
    const data = {description: amendedDescriptionText}
    const configObj = {method: "PATCH", headers:{'Content-Type': 'application/json', 'Accept': 'application/json'} , body: JSON.stringify(data)}
    console.log(updateURL);
    console.log(configObj);
    fetch(updateURL, configObj).then(r=>r.json()).then(init);
  }

  //static event listeners
  mainContainer.addEventListener("click", function(event){
    if (event.target.dataset.action === "displayDetailBeer") {
      displayDetailBeer(event.target.dataset.id);
    }
    else if (event.target.id === "edit-beer"){
      event.preventDefault();
      const amendedDescriptionText = document.getElementById("description-textfield").value;
      saveAmendedDescription(event.target.dataset.beerId,amendedDescriptionText);
    }
  })

  //sidebar functionality
  function buildMapBeerList() {
    const mapBeers = beers.map(function(beer){
      return `<li data-id=${beer.id} data-action="displayDetailBeer" class="list-group-item">${beer.name}</li>`
    })
    return mapBeers;
  }

  function displayBeerList(){
    sidebar.innerHTML = buildMapBeerList().join("");
  }

  //initializer
  function init(){

    function keyValuesBeer(beer){
      const gimmeThatHash = {id: beer.id, name: beer.name, tagline: beer.tagline , description: beer.description, image_url: beer.image_url};
      return gimmeThatHash;
    }

    function saveBeers(allBeers) {
      allBeers.forEach(function (beer) {
        beers.push(keyValuesBeer(beer));
      })
      displayBeerList();
    }

    //retrieving beer info
    fetch(url).then(r=>r.json()).then( saveBeers );

  }
  //trigger
  init();















//final closing DOMContentLoaded
});
