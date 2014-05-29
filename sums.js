var combinations = [];

function getPossSums(sum){
  

  for (var i = 1; i < sum/2; i++){ 
    combinations.push([i, sum-i]);
    addAllSubSums([i], sum-i);
  }

  combinations.push(sum); // can just play the number itself 

  return combinations;
}


function addAllSubSums(baggage, sum){
  for (var j=1; j < sum/2; j++){
    // if j is not in baggage and sum-j is not in baggage
    if (baggage.indexOf(j) == -1 && baggage.indexOf(sum-j) == -1){
      // add j and sum-j back to baggage
      var new_array = baggage.concat(j, sum-j);
      // and push all of that to combinations

      // if new_array is NOT a subArray of combinations yet... 
      if (!isSubArray(new_array,combinations)){
        combinations.push(new_array);
      }

      var new_baggage = baggage.concat(j);
      addAllSubSums(new_baggage, sum-j);
    }
  }

}


function sortArray(array){
  return array.sort(function(a, b){return a-b});
}

function sortAllSubArrays(array){
  for(var i = 0; i < array.length; i++){
    array[i] = sortArray(array[i]);
  }
  return array;
}

function isSubArray (subArray, array) {
  subArray = sortArray(subArray);
  array = sortAllSubArrays(array);

  for(var i = 0; i < array.length; i++) {
    if(subArray.toString() === array[i].toString()){
      return true;
    }
  }
  return false;
}

// print(sortArray([1,90,4,189391,0,2]));

// print(isSubArray([1,2], [[2,1],[3,4]]));

print(getPossSums(7).join('\n'));

// => [[1,9],[2,8],[3,7],[4,6], [1,4,5], [1,6,3]