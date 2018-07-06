document.addEventListener('DOMContentLoaded', function () {
  console.log('hi')

  const rootURL = 'http://localhost:3000/'
  const beersURL = 'beers'

  data = fetch(rootURL+beersURL).then(r => r.json()).then(beersObj => {
    console.log(beersObj)

    showBeers(beersObj)

    document.addEventListener('click', event => {
      if (event.target.id === 'beer-name')  {
        const beerId = event.target.dataset.beerId
        const detailURL = rootURL + beersURL + '/' + beerId

        data = fetch(detailURL).then(r => r.json()).then(detailObj => {
          console.log(detailObj)
          const detailHTML = `<h1>${detailObj.name}</h1>
          <img src="<${detailObj.image_url}>">
          <h3>${detailObj.tagline}</h3>
          <textarea id="beer-desc" >${detailObj.description}</textarea>
          <button id="edit-beer" data-beer-id=${detailObj.id} class="btn btn-info">
            Save
          </button>`

          const detailDiv = document.getElementById('beer-detail')
          detailDiv.innerHTML = detailHTML

        })
      }
      else if (event.target.id === 'edit-beer') {
        console.log('here in edit beer')
        const descText = document.getElementById("beer-desc").value
        const beerId = event.target.dataset.beerId
        const detailURL = rootURL + beersURL + '/' + beerId

        configObj = {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({description: descText })
        }

        data = fetch(detailURL, configObj).then(r => r.json()).then(patchResult => {
          console.log(patchResult)
        })

      }

    }) // click

  }) // fetch

  function showBeers(beersObj) {

    const sidebarDiv = document.getElementById('col-md-4')
    const ulElement = document.getElementById('col-md-8')

    beersObj.forEach(beerDtl => {
      const liBeer = `<li class="list-group-item" id="beer-name" data-beer-id= ${beerDtl.id}>${beerDtl.name}</li>`
      ulElement.innerHTML += liBeer
    })
  }

}) // main
