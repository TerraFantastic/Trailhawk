fetch("Birds.json")
  .then(response => response.json())
  .then(json => {var birds = json});
  
  console.log("Testing")
  console.log(birds)