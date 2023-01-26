
// THIS IS A JUNK FILE JUST FOR NOTE PURPOSES




var possible_combinations = [];

function isGameOver(roll, player_moves_remaining){
  var ways_to_fulfill_roll = addAllSubSums(roll);
  if (playerHasAMove(player_moves_remaining, ways_to_fulfill_roll)){
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

  possible_combinations.push([sum]); // can just play the number itself 

  return possible_combinations;
};


function addAllSubSums(sum, baggage){
  // if baggage argument is undefined, make it []
  if (typeof baggage == 'undefined'){
    baggage = [];
    possible_combinations = [];
    possible_combinations.push([sum]); // can just play the number itself 
  }

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
      addAllSubSums(sum-j, new_baggage);
    }
  }
  // if (firstRun == true) {
  //   possible_combinations.push([sum]); // can just play the number itself 
  // }

  return possible_combinations;
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


// playerHasAMove([2,3,4,5,10], [[1,7], [2,6], [2,3,5]]) => true
function playerHasAMove(player_moves_left, passing_moves){
  for(var i = 0; i < passing_moves.length; i++) {
    var matches = 0; 
    for(var j = 0; j < passing_moves[i].length; j++) {  
      // passing_moves[i][j] == 1
      if (player_moves_left.indexOf(passing_moves[i][j]) != -1){
        matches = matches + 1;
      }
    }
    if (matches == passing_moves[i].length){
      return true;
    }
  }
  return false; 
}



// print(playerHasAMove([3,4,5,10], [[1,2], [3]]));

print(isGameOver(11, [1,3,4]));

// => [[1,9],[2,8],[3,7],[4,6], [1,4,5], [1,6,3]
print("huh");

print(addAllSubSums(9).join('\n'));



