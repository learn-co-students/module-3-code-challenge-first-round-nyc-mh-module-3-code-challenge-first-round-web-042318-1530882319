
const sidebarUl = document.getElementById("list-group")
const beerDetailDiv = document.getElementById('beer-detail')

document.addEventListener("DOMContentLoaded", function(){

  fetch("http://localhost:3000/beers")
  .then(response=>response.json())
  .then(json=>manageData(json));




  function manageData(data){
    displaySidebar(data);
  }

  function displaySidebar(data){

      data.forEach(function(individualBeer){
        let beerName = individualBeer.name;
        let beerId = individualBeer.id;
        let li = document.createElement("li");
        li.className = "list-group-item"
        li.innerText = beerName
        sidebarUl.append(li);

        // debugger;

        //add click event to display main detail
        li.addEventListener("click", function(e){
          e.preventDefault()//probably not neccessary. Including as precaution.
          getIndividualBeerData(beerId)
        })


        function getIndividualBeerData(beerId){
          let url_with_id = `http://localhost:3000/beers/` + beerId;
          fetch(url_with_id)
          .then(response=>response.json())
          .then(json=>showBeerDetail(json));
        }

          function showBeerDetail(individualBeerData){


            let beerHeadline = document.getElementById("detail-beer-name")
            let beerImage = document.getElementById("detail-beer-image")
            let beerTagline = document.getElementById("detail-beer-tagline")
            let beerDescription = document.getElementById("detail-beer-description")
            let editButton = document.getElementById("edit-beer")

            debugger;

            let individualBeerId = individualBeerData.id;
            let individualBeerName = individualBeerData.name;
            let individualBeerImage = individualBeerData.image_url;
            let individualBeerTagline = individualBeerData.tagline;
            let individualBeerDescription = individualBeerData.description;

            beerHeadline.innerText = individualBeerName;
            beerImage.src = individualBeerImage;
            beerTagline.innerText = individualBeerTagline;
            beerDescription.innerText = individualBeerDescription;

              editButton.addEventListener("click", function(e){
                // e.preventDefault();
                let beerTextField = document.getElementById("detail-beer-description") //difficulty accessing the first time it was assigned
                let newDescription = beerTextField.value;
                updateBackend(individualBeerId, newDescription)
              })

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

            }//close showBeerDetail()





      })
  }







})
