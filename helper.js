function filterByMistakes(response, selection) {
  let mistakesLog;

  if (selection === 'true'){
    mistakesLog = response.filter((log) => log.mistakesWereMadeToday);
  } else if (selection === 'false') {
    mistakesLog = response.filter((log) => !log.mistakesWereMadeToday);
  } else {
    return "Error in function";
  }
  return mistakesLog
}

function sortLogs(response, order) {
    if (order === 'asc') {
        const ascSort = response.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: "case"}));
        return ascSort
    } else if (order === 'desc') {
        const descSort = response.sort((a, b) => b.title.localeCompare(a.title, 'en', { sensitivity: 'case'}));
        return descSort
    } else {
    return "Error in function"
    }
}

function filterByLastCrisis(response, prefix, num) {

    const number = Number(num)
console.log("Number:", number);

let sortedLastCrisis;

if (prefix === 'gt'){
    console.log("Filtering for gt");
    sortedLastCrisis = response.filter((log) => log.daysSinceLastCrisis > number)
} else if (prefix === 'gte'){
    console.log("Filtering for gte");
    sortedLastCrisis = response.filter((log) => log.daysSinceLastCrisis >= number)
} else if (prefix === 'lt'){
    console.log("Filtering for lt");
    sortedLastCrisis = response.filter((log) => log.daysSinceLastCrisis < number)
} else if (prefix === 'lte'){
    console.log("Filtering for lte");
    sortedLastCrisis = response.filter((log) => log.daysSinceLastCrisis <= number)
} else {
    console.log ('Error');
}
console.log("sortedLastCrisis:", sortedLastCrisis);
return sortedLastCrisis;

}


module.exports = {
    filterByMistakes,
    sortLogs, 
    filterByLastCrisis
  };