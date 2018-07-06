// API
const baseAPI = "http://localhost:3000/beers";

// DOM Elements
const sideBar = document.getElementById("list-group");
const details = document.getElementById("beer-detail");

// Update the description with a Patch request
updateDescription = (editBeerID,newDescription) => {
  const patchConfig = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: newDescription
    })
  }
  return fetch(`${baseAPI}/${editBeerID}`,patchConfig); 
}

// Edit beer
editBeer = () => {
  const editButton = document.getElementById("edit-beer");
  editButton.addEventListener('click', event => {
    const newDescription = event.target.parentElement.querySelector('textarea').value;
    const editBeerID = parseInt(event.target.dataset.editId);
    updateDescription(editBeerID,newDescription);
  })
}

// Show beer details
beerDetails = (beerID) => {
  return fetch(`${baseAPI}/${beerID}`).then(res => res.json()).then(beer => {
    const newHeader = document.createElement("H1");
    details.innerHTML = ""; // Clear existing beer details
    newHeader.innerHTML = beer.name;
    newHeader.innerHTML += `
      <br>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info" data-edit-id="${beer.id}">
        Save
      </button>
    `
    details.appendChild(newHeader);
    editBeer();
  })
}

// Sidebar event listener
beerSideBarListener = () => {
  const beersSideBar = document.querySelectorAll('.beersSideBar');
  beersSideBar.forEach(beer => {
    beer.addEventListener('click', event => {
      const beerID = parseInt(event.target.dataset.id);
      beerDetails(beerID);
    })
  })
}

// Get Beer list from API
getBeers = () => {
  return fetch(baseAPI).then(res => res.json()).then(data => {
    data.forEach(beer => {
      const newListItem = document.createElement("LI");
      newListItem.setAttribute('class','list-group-item beersSideBar');
      newListItem.setAttribute('data-id',beer.id);
      newListItem.innerHTML = beer.name;
      sideBar.appendChild(newListItem);
    })
    beerSideBarListener();
  })
}

// Render the Page
render = () => {
  getBeers();
}

render();