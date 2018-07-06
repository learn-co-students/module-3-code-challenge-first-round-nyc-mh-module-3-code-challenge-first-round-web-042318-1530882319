//DOM Elements
let beerList = document.getElementById('list-group');
let showBeer = document.getElementById('beer-detail');

//Important Variables
let beers;
let saveBeerButton;

//Async Fetch All Beers
fetch("http://localhost:3000/beers").then(request => request.json()).then(json => loadBeers(json))

//load the fetched beers into a variable
function loadBeers(drinks) {
  beers = drinks;
  displayBeers();
}


//display the beers via DOM manipulation
function displayBeers() {
  beerList.innerText = ""

  //append beers to beerList (left sidebar)
  beers.forEach(function(beer) {
    let li = document.createElement("LI")
    li.className = 'list-group-item'
    //data-id = beer's id, this will be useful for event listener
    li.dataset.id = beer.id
    li.innerText = beer.name
    beerList.appendChild(li)
  })
}


beerList.addEventListener("click", function(event) {
  if(event.target.className === 'list-group-item') {
    //fetch more information on this particular beer
    fetch(`http://localhost:3000/beers/${parseInt(event.target.dataset.id)}`).then(request => request.json()).then(json => displayBeer(json))
  }
})


function displayBeer(beer) {
  //clear innerHTML of div
  showBeer.innerHTML = ''
  //create h1, img, h3, textarea, and button tags
  let h1 = document.createElement("h1");
  h1.innerText = beer.name;
  let img = document.createElement("IMG");
  img.src = beer.image_url
  let h3 = document.createElement("h1");
  h3.innerText = beer.tagline;
  let text_area = document.createElement("TEXTAREA");
  text_area.id = 'text_box'
  text_area.innerText = beer.description;
  saveBeerButton = document.createElement("BUTTON");
  saveBeerButton.id = 'edit-beer'
  saveBeerButton.className = 'btn btn-info'
  saveBeerButton.innerText = 'Save'
  //this is useful for patching
  saveBeerButton.dataset.id = beer.id

  //append all of these elements to our div
  showBeer.appendChild(h1)
  showBeer.appendChild(img)
  showBeer.appendChild(h3)
  showBeer.appendChild(text_area)
  showBeer.appendChild(saveBeerButton)

  //add event handler for the new save button
  saveBeerButton.addEventListener("click", function(event) {
    //some important initial values for the fetch
    let updatedTextValue = document.getElementById('text_box').value
    let id = parseInt(event.target.dataset.id)
    let url = `http://localhost:3000/beers/${id}`
    let bodySummary = {
      "description":updatedTextValue
    }

    //now to execute the patch
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(bodySummary),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  })
}
