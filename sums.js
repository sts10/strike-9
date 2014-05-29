var possible_combinations = [];

function isGameOver(roll, player_moves_remaining){
  var ways_to_fulfill_roll = getPossSums(roll);
  if (containsAll(player_moves_remaining, ways_to_fulfill_roll)){
    return false; // game is not over
  } else {
    return true; // game is over
  }
}


function getPossSums(sum){
  
  for (var i = 1; i < sum/2; i++){ 
    possible_combinations.push([i, sum-i]);
    addAllSubSums([i], sum-i);
  }

  possible_combinations.push(sum); // can just play the number itself 

  return possible_combinations;
};


function addAllSubSums(baggage, sum){
  for (var j=1; j < sum/2; j++){
    // if j is not in baggage and sum-j is not in baggage
    if (baggage.indexOf(j) == -1 && baggage.indexOf(sum-j) == -1){
      // add j and sum-j back to baggage
      var new_array = baggage.concat(j, sum-j);
      // and push all of that to possible_combinations

      // if new_array is NOT a subArray of possible_combinations yet... 
      if (!isSubArray(new_array,possible_combinations)){
        possible_combinations.push(new_array);
      }

      var new_baggage = baggage.concat(j);
      addAllSubSums(new_baggage, sum-j);
    }
  }

};


function sortArray(array){
  return array.sort(function(a, b){return a-b});
};

function sortAllSubArrays(array){
  for(var i = 0; i < array.length; i++){
    array[i] = sortArray(array[i]);
  }
  return array;
};

function isSubArray (subArray, array) {
  subArray = sortArray(subArray);
  array = sortAllSubArrays(array);

  for(var i = 0; i < array.length; i++) {
    if(subArray.toString() === array[i].toString()){
      return true;
    }
  }
  return false;
};


function isSubArrayNoSort (subArray, array){
  for(var i = 0; i < array.length; i++) {
    if(subArray.toString() === array[i].toString()){
      return true;
    }
  }
  return false;
};

function containsAll(subArray, array){
  var array = flatten(array);
  for(var i = 0; i < subArray.length; i++) {
    if (array.indexOf(subArray[i]) == -1) {
      print("subArray[i] is " + subArray[i]);
      return false;
    }
  }
  return true;
}

function flatten(array) {
  var result = [], self = arguments.callee;
  array.forEach(function(item) {
    Array.prototype.push.apply(
      result,
      Array.isArray(item) ? self(item) : [item]
    );
  });
  return result;
};

// var myArray = [[1,2],[4,6]]; 
// print(myArray.join('\n'));
// print(flatten(myArray).join('\n'));

print(containsAll([4,6,3], [[1,2],[4,6]]));

// print(getPossSums(10).join('\n'));

// print(isGameOver(10, [1,3,4,5,6,7,8]));

// => [[1,9],[2,8],[3,7],[4,6], [1,4,5], [1,6,3]