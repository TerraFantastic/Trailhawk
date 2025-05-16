fetch("Birds.json")
  .then(response => response.json())
  .then(json => {var birds = json});

console.log(birds[0].NativeBirds[1])
