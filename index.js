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
      var Name = element.Name
      newbutton.innerHTML = Name
      newbutton.id = Name
      newbutton.style.width = "50px"
      newbutton.style.height = "50px"
      document.querySelector('#infowindow').append(newbutton)
      document.getElementById(element.Name).addEventListener('click', () => {
        logclick(Name)
      })
      })
     }
      createbirdbuttons(birds);
    })

