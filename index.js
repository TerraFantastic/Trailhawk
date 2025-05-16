fetch("Birds.json")
  .then(response => response.json())
  .then(json => {

    const birds = json

    function logclick(selected) {
      console.log("Button Pushed")
      console.log(selected.Name)
    }
    
    function createbirdbuttons(buttons) {
      birds.NativeBirds.forEach(element => {
      let newbutton = document.createElement('button')
      newbutton.innerHTML = element.Name
      newbutton.style.width = "50px"
      newbutton.style.height = "50px"
      newbutton.onclick = logclick(element)
      document.querySelector('#infowindow').append(newbutton)
     })
    }

    createbirdbuttons(birds);