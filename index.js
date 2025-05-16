fetch("Birds.json")
  .then(response => response.json())
  .then(json => {
    const birds = json
    birds.NativeBirds.forEach(element => {
      let newbutton = document.createElement('button')
      newbutton.innerhtml = element.Name
      console.log(element.Name)
      document.querySelector('#infowindow').append(newbutton)
    });
  }
  );
  
  
