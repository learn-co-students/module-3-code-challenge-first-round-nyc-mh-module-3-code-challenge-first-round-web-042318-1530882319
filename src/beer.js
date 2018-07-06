class Beer {
  let id = 0;
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
  }

  displayDetails() {

  }
}
