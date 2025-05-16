fetch("Birds.json")
  .then(response => response.json())
  .then(json => {birds = json});
  
  console.log("Testing")
  console.log(birds)