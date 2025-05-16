fetch("Birds.json")
  .then(response => response.json())
  .then(json => {
    const birds = json
    birds.NativeBirds.forEach(element => {
      console.log(element.Name)
    });
  }
  );
  
  
