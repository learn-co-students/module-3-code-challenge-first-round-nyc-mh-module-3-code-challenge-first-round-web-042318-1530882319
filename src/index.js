let beerStore = []

fetch("http://localhost:3000/beers")
.then(response=>response.json())
.then(json=>saveBeersLocally(json));


function saveBeersLocally(json){
  json.forEach(function(individualBeer){
    let currentBeer = new Beer (individualBeer);
    beerStore.push(currentBeer)
    currentBeer.displaySidebar();
  })
}

sidebarUl.addEventListener("click", function(e){
  if (e.target.dataset.objectId){
    let currentBeer = findBeer(e);
    currentBeer.showBeerDetail();
  }
})

beerDetailDiv.addEventListener("click", function(e){

  if (e.target.id === "update-beer"){
    let currentBeerObj = findBeerAgain(e.target.parentElement.children[3].id);
    let updatedBeerDescription = e.target.parentElement.getElementsByTagName("textarea")[0].value;
    currentBeerObj.updateBackend(updatedBeerDescription);
    //Saving to backend works immediately, but currently doesn't alter content until page reload.
  }

})

function findBeer(e){
  return beerStore.find(function(beer){
    if (beer.id == e.target.dataset.objectId){
      // debugger;
      return e.target.dataset.objectId
    }
  })
}

function findBeerAgain(e){
  return beerStore.find(function(beer){
    if (beer.id == e){
      // debugger;
      return e
    }
  })
}
