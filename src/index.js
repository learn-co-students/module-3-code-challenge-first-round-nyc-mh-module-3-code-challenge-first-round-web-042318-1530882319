var jsonInputData;
var listDiv = document.getElementById('list-group')
var detailDiv = document.getElementById('beer-detail')

function updateArray(data){
  jsonInputData = data
  jsonInputData.forEach(function(drinkObj){
    listDiv.innerHTML += `<li class="list-group-item" id= ${drinkObj.id}>${drinkObj.name}</li>`
  })
};

document.addEventListener('DOMContentLoaded',function(){

  fetch('http://localhost:3000/beers').then(response => response.json()).then(data => updateArray(data))

  listDiv.addEventListener('click', function(event){
    if(event.target.className === "list-group-item"){
      fetch('http://localhost:3000/beers/'+`${event.target.id}`).then(response => response.json()).then(data => createDetailDiv(data))

      function createDetailDiv(data){
        detailDiv.innerHTML = `<h1>${data.name}</h1>
                                  <img src= ${data.image_url}>
                                  <h3>${data.tagline}</h3>
                                  <input value="${data.description}" id="textArea"></input>
                                  <button id="edit-beer" data-beerID= ${data.id} class="btn btn-info">
                                    Save
                              </button>`
      }
    }
  })

  detailDiv.addEventListener('click', function(event){
    if(event.target.id === 'edit-beer'){
      var inputField = document.getElementById('textArea').value
      const baseApiUrl = `http://localhost:3000/beers/${event.target.dataset.beerid}`
      const postConfig = {
          method:'PATCH',
          headers: {
              'Content-Type':'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
            description: inputField} )
      }
      return fetch(baseApiUrl,postConfig )
    }
  })
})
