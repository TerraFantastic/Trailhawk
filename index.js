fetch("Birds.json")
  .then(response => response.json())
  .then(json => {

    const birds = json

    function showbirdinfo(selected) {
      document.querySelector('#infowindow').innerHTML = ""
      birds.NativeBirds.forEach(element => {
        if (element.Name == selected) {
          let newinfowindow = document.createElement('p')
          newinfowindow.innerHTML = element.Desc
          document.querySelector('#infowindow').append(newinfowindow)
        }
      })
    }
    
    function createbirdbuttons(buttons) {
      document.querySelector('#infowindow').innerHTML = ""
      birds.NativeBirds.forEach(element => {
      let newbutton = document.createElement('button')
      var Name = element.Name
      newbutton.innerHTML = Name
      newbutton.id = Name
      newbutton.style.width = "50px"
      newbutton.style.height = "50px"
      document.querySelector('#infowindow').append(newbutton)
      document.getElementById(element.Name).addEventListener('click', () => {
        showbirdinfo(Name)
      })
      })
     }
      createbirdbuttons(birds);
    })

