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

  function buildBeerHtml(beerData, action, amendedDescriptionText){

    function displayNew() {
      if (action === "edit") {
        return `<textarea id="description-textfield">${amendedDescriptionText}</textarea>
        <h2>Your description was succesfully submitted.</h2>`
    } else {
        return `<textarea id="description-textfield">${beerData.description}</textarea>`
    }
  }
    return `<h1>${beerData.name}</h1>
            <img src="${beerData.image_url}">
            <h3>${beerData.tagline}</h3>
            ${displayNew()}
            <button id="edit-beer" data-beer-id="${beerData.id}" class="btn btn-info">
                Save
            </button>
            <button id="show-more-beer" data-beer-id="${beerData.id}" class="btn btn-info">
                More
            </button>`
  }

  function buildMoreBeerHtml(beerData){

    return `<h3>First brewed</h3>
            <p>${beerData.first_brewed}</p>
            <h3>Brewer tips</h3>
            <p>${beerData.brewers_tips}</p>
            <h3>Food Pairing</h3>
            <ul>${beerData.food_pairing.map(function(food){
              return `<li>${food}</li>`
            }).join("")}</ul>
            <h3>Contributor</h3>
            <p>${beerData.contributed_by}</p>
            `
  }

  function displayDetailBeer(beerId, action, amendedDescriptionText){
    const clickedFoudBeer = findBeerById(beerId);
    showContainer.innerHTML = buildBeerHtml(clickedFoudBeer, action, amendedDescriptionText);
  }

  function displayMoreBeer(beerId){
    const clickedFoudBeer = findBeerById(beerId);
    showContainer.innerHTML += buildMoreBeerHtml(clickedFoudBeer);
  }

  function saveAmendedDescription(beerId,amendedDescriptionText){
    const updateURL = `${url}/${beerId}`;
    const data = {description: amendedDescriptionText}
    const configObj = {method: "PATCH", headers:{'Content-Type': 'application/json', 'Accept': 'application/json'} , body: JSON.stringify(data)}
    fetch(updateURL, configObj).then(r=>r.json()).then(init);
  }

  //static event listeners
  mainContainer.addEventListener("click", function(event){
    if (event.target.dataset.action === "displayDetailBeer") {
      displayDetailBeer(event.target.dataset.id);
    }
    else if (event.target.id === "edit-beer"){
      event.preventDefault(); //i dont think I need this its not a form
      const amendedDescriptionText = document.getElementById("description-textfield").value;
      displayDetailBeer(event.target.dataset.beerId, "edit", amendedDescriptionText);
      saveAmendedDescription(event.target.dataset.beerId, amendedDescriptionText);
    }
    else if (event.target.id === "show-more-beer"){
      event.preventDefault(); //i dont think I need this its not a form
      displayMoreBeer(event.target.dataset.beerId);
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
      const gimmeThatHash = {id: beer.id, name: beer.name, tagline: beer.tagline , description: beer.description, image_url: beer.image_url, first_brewed: beer.first_brewed, food_pairing: beer.food_pairing, brewers_tips: beer.brewers_tips, contributed_by: beer.contributed_by};
      return gimmeThatHash;
    }

    function saveBeers(allBeers) {
      beers = [];
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
