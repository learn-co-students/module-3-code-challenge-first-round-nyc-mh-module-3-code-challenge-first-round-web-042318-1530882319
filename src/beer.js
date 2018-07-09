const sidebarUl = document.getElementById("list-group")
const beerDetailDiv = document.getElementById('beer-detail')

let beerId = 0;

class Beer {
  constructor(obj){
    this.id = ++beerId;
    this.serverId = obj.id;
    this.name = obj.name;
    this.image_url = obj.image_url;
    this.tagline = obj.tagline;
    this.description = obj.description;
  }

  displaySidebar() {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = this.name;
    li.id = `${this.serverId}`
    li.dataset.objectId = this.id;
    sidebarUl.append(li);
  }

  showBeerDetail(){
    beerDetailDiv.innerHTML = `
      <h1>${this.name}</h1>
      <img src="${this.image_url}">
      <h3>${this.tagline}</h3>
      <textarea id="${this.id}">${this.description}</textarea>
      <button id="update-beer" class="btn btn-info">Save</button>`
  }

  updateBackend(newDescription){
    let url_with_id = `http://localhost:3000/beers/` + this.serverId;
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

}
