const listGroup = document.getElementById('list-group')
const beerDetail = document.getElementById('beer-detail')
const beerURL = 'http://localhost:3000/beers'

//Initial beer listing
fetch('http://localhost:3000/beers').then(res => res.json()).then(json => listBeers(json))

function listBeers(json) {
    json.forEach(
        function(beer) {
            listGroup.innerHTML +=  `<li id="${beer.id}" class="list-group-item">${beer.name}</li>`
        }
    )
}

//Listen to beer list and then save buttons
    document.addEventListener('click', function(event){
        if (event.target.className === 'list-group-item') {
            displaySingleBeer(event.target.id)
        } else if (event.target.id === 'edit-beer') {
            let description = event.target.parentElement.getElementsByTagName('textarea')[0].value
            let beerId = event.target.parentElement.getElementsByTagName('textarea')[0].dataset.id
            updateBeer(  beerId, description   )
        }
    }
)

//Display a beer when beer is clicked on
function displaySingleBeer(id) {
    fetch(`http://localhost:3000/beers/${id}`).then(res => res.json()).then(json => displayBeer(json))
}

//General display Beer function
function displayBeer(beer) {
    beerDetail.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea data-id="${beer.id}">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
        `
}

//Update Beer
function updateBeer(id, info) {
    fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({description: info}),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
        
    )
    
    //Reload beers
    fetch(`http://localhost:3000/beers/${id}`).then(res => res.json()).then(json => displayBeer(json))
}

