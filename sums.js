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
    var new_array = baggage.concat(j, sum-j);
    combinations.push(new_array);
  }

}






print(getPossSums(7).join('\n'));

// => [[1,9],[2,8],[3,7],[4,6], [1,4,5], [1,6,3]