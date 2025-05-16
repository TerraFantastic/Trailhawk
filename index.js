fetch("Birds.json")
  .then(response => response.json())
  .then(json => {
    const birds = json
    console.log(birds.NativeBirds[0].Name[0])
  }
  );
  
  
