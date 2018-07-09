const sidebarUl = document.getElementById("list-group")
const beerDetailDiv = document.getElementById('beer-detail')

fetch("http://localhost:3000/beers")
  .then(response=>response.json())
  .then(json=>displaySidebar(json));

function displaySidebar(data){

    data.forEach(function(individualBeer){
      let beerName = individualBeer.name;
      let beerId = individualBeer.id;
      let beerDescription = individualBeer.description;
      let li = document.createElement("li");
      li.className = "list-group-item";
      li.id = beerId;
      li.innerText = beerName
      sidebarUl.append(li);

      //not .getElementById("list-group") because edit button isn't a child of sidebar
      document.addEventListener("click", function(e){
        if (e.target && e.target.className === "list-group-item"){
          getIndividualBeerData(e.target.id); //why is beerId undefined?
        } else if (e.target.id === "update-beer") {
          let beerId = e.target.parentElement.children[3].id
          let updatedBeerDescription = e.target.parentElement.getElementsByTagName('textarea')[0].value;
          updateBackend(beerId, updatedBeerDescription)
        }
      })
  })
}

function getIndividualBeerData(beerId){
  let url_with_id = `http://localhost:3000/beers/` + beerId;
  fetch(url_with_id)
  .then(response=>response.json())
  .then(json=>showBeerDetail(json));
}

function showBeerDetail(individualBeerData){
  beerDetailDiv.innerHTML = `
    <h1>${individualBeerData.name}</h1>
    <img src="${individualBeerData.image_url}">
    <h3>${individualBeerData.tagline}</h3>
    <textarea id="${individualBeerData.id}">${individualBeerData.description}</textarea>
    <button id="update-beer" class="btn btn-info">Save</button>`
}

function updateBackend(beerId, newDescription){
  let url_with_id = `http://localhost:3000/beers/` + beerId;
  let submissionBody =  {"description": newDescription}
  fetch(url_with_id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submissionBody)
      })
}
