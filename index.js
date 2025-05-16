fetch("Birds.json")
  .then(response => response.json())
  .then(json => {

    const birds = json
    
    function createbirdbuttons(buttons) {
      birds.NativeBirds.forEach(element => {
      let newbutton = document.createElement('button')
      newbutton.innerHTML = element.Name
      newbutton.style.width = "50px"
      newbutton.style.height = "50px"
      document.querySelector('#infowindow').append(newbutton)
     }
    })
    createbirdbuttons(birds)
  }  
);
  
