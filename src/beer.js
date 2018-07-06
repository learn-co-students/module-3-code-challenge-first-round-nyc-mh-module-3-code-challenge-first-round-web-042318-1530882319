const beerList = document.getElementById("list-group");
const beerDetailDiv = document.getElementById("beer-detail");

let id = 0;

class Beer {
  constructor(beerObj) {
    this.name = beerObj.name,
    this.tagline = beerObj.tagline,
    this.firstBrewed = beerObj.first_brewed,
    this.imageUrl = beerObj.image_url,
    this.id = ++id,
    this.dbId = beerObj.id,
    this.description = beerObj.description,
    this.brewersTips = beerObj.brewers_tips,
    this.contributedBy = beerObj.contributed_by,
    this.foodPairings = beerObj.food_pairing
  }

  addToList() {
    let beerElement = document.createElement("li");
    beerElement.className = "list-group-item";
    beerElement.innerText = this.name;
    beerElement.dataset.beerLocalId = this.id;
    beerList.append(beerElement);
  }

  renderDetails() {
    beerDetailDiv.innerHTML = "";
    beerDetailDiv.innerHTML += `<h1>${this.name}</h1> <img src="${this.imageUrl}"> <h3>${this.tagline}`
    beerDetailDiv.innerHTML += `<textarea>${this.description}</textarea><button id="edit-beer" class="btn btn-info" data-beer-local-id="${this.id}" data-beer-db-id="${this.dbId}">Save</button>`
    beerDetailDiv.innerHTML += `<h4>First Brewed:</h4> <p>${this.first_brewed}</p>`
    beerDetailDiv.innerHTML += `<h4>Tips from the Brewers: </h5>${this.brewers_tips}`
    debugger;
    this.createAndAppendFoodPairings();
  }

  createAndAppendFoodPairings() {
    beerDetailDiv.innerHTML += "<h4>Recommended Pairings:</h4>"
    this.foodPairings.forEach( function(pairing) {
      beerDetailDiv.innerHTML += `<p>${pairing}</p>`
    })
  }
}
