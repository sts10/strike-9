var combinations = [];

function getPossSums(sum){
  
  var i = 1;
  while (i<sum/2){
    combinations.push([i, sum-i]);
    getAllSubSums(i, sum-i);

    i = i + 1;
  }

  return combinations;
}


function getAllSubSums(i, sum){
  var j = 1;
  while (j<sum/2){
    combinations.push([j, sum-j, i]);
    j = j + 1;
  }

}






print(getPossSums(5).join('\n'));

// => [[1,9],[2,8],[3,7],[4,6], [1,4,5], [1,6,3]