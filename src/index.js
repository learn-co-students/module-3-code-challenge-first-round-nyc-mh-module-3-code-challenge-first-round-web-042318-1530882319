document.addEventListener('DOMContentLoaded', function() {
  const listGroup = document.getElementById('list-group');
  const beerDetail = document.getElementById('beer-detail')

  const beersURL = "http://localhost:3000/beers"


  fetch(beersURL)
    .then(res => res.json())
    .then(data => parseData(data))

// parse the data from api
  function parseData(data) {
    displayBeersOnSideBar(data)
  }

// display each beer on side bar with generate function
  function displayBeersOnSideBar(beers) {
    beers.forEach(function(beer) {
      listGroup.innerHTML += generateBeerHTML(beer)
    })
  }

// generate html element for each beer
  function generateBeerHTML(beer) {
    return `
      <li class="list-group-item" data-action="display" data-beer-id="${beer.id}">${beer.name}</li>
    `
  }

  // event listener for displaying beer's details
  listGroup.addEventListener('click', function(event) {
    if (event.target.dataset.action === 'display') {
      const beerId = event.target.dataset.beerId;
      parseBeerInfo(beerId)
    }
  })

  // GET request to get beer's details
  function parseBeerInfo(id) {
    const beerURL = `http://localhost:3000/beers/${id}`
    fetch(beerURL)
      .then(res => res.json())
      .then(data => displayBeerOnDetailBar(data))
  }

  // display beer's details on detail bar
  function displayBeerOnDetailBar(beer) {
    beerDetail.innerHTML = generateBeerDetailHTML(beer)
  }

  // generate beer's detail HTML element
  function generateBeerDetailHTML(beer) {
    return `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button data-action="edit" data-beer-id="${beer.id}" id="edit-beer" class="btn btn-info">Save</button>
    `
  }

// event listener for editing the beer's description
  beerDetail.addEventListener('click', function(event) {
    if (event.target.dataset.action === 'edit') {
      const beerId = event.target.dataset.beerId
      const newDescription = event.target.parentElement.querySelector('textarea').value
      updateBeerInfo(beerId, newDescription);
    }
  })

// POST request to api to edit a beer's description
  function updateBeerInfo(id, newDescription) {
    const beerObj = {
      method: "PATCH",
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({ description: newDescription })
    }
    fetch(`${beersURL}/${id}`, beerObj)
      .then(res => res.json())
      .then(data => displayBeerOnDetailBar(data))
  }

})
