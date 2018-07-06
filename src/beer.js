const beerList = document.getElementById("list-group");
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
    this.contributedBy = beerObj.contributed_by
  }

  addToList() {
    let beerElement = document.createElement("li");
    beerElement.className = "list-group-item";
    beerElement.innerText = this.name;
    beerElement.dataset.beerId = this.id;
    beerList.append(beerElement);
  }
}
