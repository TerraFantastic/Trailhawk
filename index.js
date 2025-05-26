// Load in Json file 
fetch("Birds.json")
  .then(response => response.json())
  .then(json => {

    // Attach loaded in object to variable "birds"
    const birds = json

    // Function for displaying bird information when selected
    function showbirdinfo(selected) {

      // Clear all elements from the infowindow div
      document.querySelector('#infowindow').innerHTML = ""

      // Find data for selected bird species
      birds.NativeBirds.forEach(element => {
        if (element.Name == selected) {
          
          // Create heading with the bird name
          let birdname = document.createElement('h3')
          birdname.innerHTML = element.Name
          document.querySelector('#infowindow').append(birdname)

          // Display bird image
          let birdimage = document.createElement('img')
          birdimage.src = `pictures/${element.Name}.jpg`
          birdimage.style.width = "20vw"
          birdimage.style.height = "20vw"
          document.querySelector('#infowindow').append(birdimage)

          // Create a back button
          let backbutton = document.createElement('button')
          backbutton.innerHTML = "Change Selected Species"
          backbutton.id = "backbutton"
          document.querySelector('#infowindow').append(backbutton)
          document.querySelector('#infowindow').append(document.createElement('br'))
          document.getElementById("backbutton").addEventListener('click', () => {
          createbirdbuttons(birds) })
          
          // Display species information
          let newinfowindow = document.createElement('p')
          newinfowindow.innerHTML = element.Desc
          document.querySelector('#infowindow').append(newinfowindow)
        }
      })
    }
    
    // Function for displaying all bird options when no specific species is selected 
    function createbirdbuttons(buttons) {
      document.querySelector('#infowindow').innerHTML = ""
      birds.NativeBirds.forEach(element => {
      let newbutton = document.createElement('button')
      var Name = element.Name
      newbutton.innerHTML = Name
      newbutton.id = Name
      newbutton.style.width = "10vw"
      newbutton.style.height = "50px"
      document.querySelector('#infowindow').append(newbutton)
      document.getElementById(element.Name).addEventListener('click', () => {
        showbirdinfo(Name)
      })
      })
     }
     // Set Intial View
      createbirdbuttons(birds);
    })

