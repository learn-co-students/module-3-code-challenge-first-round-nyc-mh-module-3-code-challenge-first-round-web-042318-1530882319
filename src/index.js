document.addEventListener('DOMContentLoaded', function() {
  //get elements
  const sidebar = document.getElementById("list-group");
  const beerDetail = document.getElementById("beer-detail");
  const beersURL = "http://localhost:3000/beers"
  const beerURL = "http://localhost:3000/beers/:id"


  //displays beers in sidebar
  displaySideBeers = (beers) => {
    beers.forEach( beer => {
      sidebar.innerHTML += `<div><li class="list-group-item" data-id="${beer.id}" data-name="${beer.name}" data-description="${beer.description}" data-image="${beer.image_url}" data-tagline="${beer.tagline}">${beer.name}</li></div>`
    })
  }

  //gets beer data and calls displaySideBeers to display beers in sidebar
  function showBeers(inputData) {
      fetch(beersURL, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
    }).then(response => response.json())
    .then(json => {
      displaySideBeers(json)
    })
  }
  showBeers()

  function getBeer(id) {
      fetch(`${beersURL}/${id}`).then(response => response.json())
    .then(json => {
      const beerLi = document.querySelector(`[data-id="${id}"]`)
      beerLi.dataset.description = textArea.value
    })
  }


  //gets specific beer data from sidebar and when clicked, beer shows up in main part of page
  // allows you to edit description of beer and save on click of side button
  sidebar.addEventListener('click', event => {
    if (event.target.tagName === "LI") {
      displayClickedBeer(event.target)
    }
  })

  displayClickedBeer = (beer) => {
    checkForChildNodes = beerDetail.hasChildNodes();
    const beerHTML = `<h1 data-id="${beer.dataset.id}" data-description="${beer.dataset.description}" data-name="${beer.dataset.name}"> ${beer.dataset.name}</h1><br><img src="${beer.dataset.image}"><h3>${beer.dataset.tagline}</h3><textarea id="textArea">${beer.dataset.description}</textarea><button id="editBeer" class="btn btn-info">Save</button>`;

    if (checkForChildNodes) {
      beerDetail.innerHTML = beerHTML;
    } else {
      let displayBeer = document.createElement("h2");
      displayBeer.innerHTML = beerHTML;
      beerDetail.appendChild(displayBeer);
    }

    const saveButton = document.getElementById("editBeer");
    const textArea = document.getElementById("textArea");
    saveButton.addEventListener('click', saveDescription)
    function saveDescription() {
      fetch(beersURL + `/${beer.dataset.id}` , {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: textArea.value
        }),
      }).then(response => response.json())
      .then(json => getBeer(beer.dataset.id))
    }
  }
});
