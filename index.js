fetch("Birds.json")
  .then(response => response.json())
  .then(json => {const birds = json});
  
  console.log("Testing")