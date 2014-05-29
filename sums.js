var combinations = [];

function getPossSums(sum){
  for (var i = 1; i < sum/2; i++){ 
    combinations.push([i, sum-i]);
    getAllSubSums([i], sum-i);
  }

  return combinations;
}


function getAllSubSums(baggage, sum){
  for (var j=1; j < sum/2; j++){
    // if j is not in baggage and sum-j is not in baggage
      // add j and sum-j back to baggage
      var new_array = baggage.concat(j, sum-j);
      // and push all of that to combinations
      combinations.push(new_array);

      var new_baggage = baggage.concat(j);
      getAllSubSums(new_baggage, sum-j);
  }

}






print(getPossSums(5).join('\n'));

// => [[1,9],[2,8],[3,7],[4,6], [1,4,5], [1,6,3]