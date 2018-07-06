
const sidebarUl = document.getElementById("list-group")

document.addEventListener("DOMContentLoaded", function(){

  fetch("http://localhost:3000/beers")
  .then(response=>response.json())
  .then(json=>manageData(json));




function manageData(data){
  displaySidebar(data);
  //do something with data here
}

function displaySidebar(data){

    data.forEach(function(individualBeer){
      let beerName = individualBeer.name
      let li = document.createElement("li");
      li.className = "list-group-item"
      li.innerText = beerName
      sidebarUl.append(li);
    })


}

})
