const listGroup = document.getElementById('list-group')
const beerDetail = document.getElementById('beer-detail')
const beerURL = 'http://localhost:3000/beers'

fetch('http://localhost:3000/beers').then(res => res.json()).then(json => listBeers(json))


function listBeers(json) {
    json.forEach(
        function(beer) {
            listGroup.innerHTML +=  `<li id="${beer.id}" class="list-group-item">${beer.name}</li>`
        }
    )
}

//Listen to buttons for beer names, and then saving
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

function displaySingleBeer(id) {
    fetch(`http://localhost:3000/beers/${id}`).then(res => res.json()).then(json => displayBeer(json))
}

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
    
    //reload beers
    fetch(`http://localhost:3000/beers/${id}`).then(res => res.json()).then(json => displayBeer(json))

}

