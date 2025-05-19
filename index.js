fetch("Birds.json")
  .then(response => response.json())
  .then(json => {

    const birds = json

    function logclick(selected) {
      console.log("Button Pushed")
      console.log(selected)
    }
    
    function createbirdbuttons(buttons) {
      birds.NativeBirds.forEach(element => {
      let newbutton = document.createElement('button')
      newbutton.innerHTML = element.Name
      newbutton.id = element.Name
      newbutton.style.width = "50px"
      newbutton.style.height = "50px"
      document.querySelector('#infowindow').append(newbutton)
      document.getElementById(element.Name).addEventListener('click', function(element.name) {
        console.log(element.name)
        console.log("button pressed")
      })
      })
     })

  createbirdbuttons(birds);