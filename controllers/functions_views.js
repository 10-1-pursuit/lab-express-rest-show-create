const { response } = require("express");
const logs_controller = require("./logs_controller");

function AlphabetSort(response, direction) {
  
    if (direction === "asc") {
    const ascSort = response.sort((a, b) =>
      a.title.localeCompare(b.title, "en", { sensitivity: "case" })
    );
    return ascSort;
  } else if (direction === "desc") {
    const descSort = response.sort((a, b) =>
      b.title.localeCompare(a.title, "en", { sensitivity: "case" })
    );
    return descSort;
  } else {
    return "Error in function";
  }
}

function MistakesFilters(response, selection) {
    let mistakesLogs;

  if (selection === "true"){
    mistakesLogs = response.filter((log) =>  log.mistakesWereMadeToday);
  } else if (selection === "false") {
    mistakesLogs = response.filter((log) =>  !log.mistakesWereMadeToday);
  } else {
    return "Error in function";
  }
  return mistakesLogs;
}

function CrisisFilter(response, selection, num){
    let sortedLastCrisis;
    
    if( selection === "gt"){
         sortedLastCrisis = response.filter((log) => log.daysSinceLastCrisis > num)
    } else if (selection === "gte"){
         sortedLastCrisis = response.filter((log) => log.daysSinceLastCrisis >= num)
    } else if (selection === "lt"){
        sortedLastCrisis = response.filter((log) => log.daysSinceLastCrisis < num)
    } else if (selection === "lte"){
         sortedLastCrisis = response.filter((log) => log.daysSinceLastCrisis <= num)
    } else {
        console.log("Error");
    }
   return sortedLastCrisis
}
         

function checkForLogKey(req, res, next){
  console.log(req.body);
  if 
  (

    (req.body.hasOwnProperty( "captainName") && typeof req.body.captainName === "string") || 
    (req.body.hasOwnProperty( "title") && typeof req.body.title === "string")  || 
    (req.body.hasOwnProperty( "post") && typeof req.body.post === "string") || 
    (req.body.hasOwnProperty( "mistakesWereMadeToday") && typeof req.body.mistakesWereMadeToday === "boolean" ) || 
    (req.body.hasOwnProperty( "daysSinceLastCrisis") && typeof req.body.daysSinceLastCrisis === "number"  )
  ){
    return next();
  } else {
    res.send(`invalid object. Please check yo self ${req.body}`);
  }
}



module.exports = {
  AlphabetSort,
  MistakesFilters,
  CrisisFilter,
  checkForLogKey
};
