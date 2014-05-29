function getPossSums(sum){
  combinations = [];
  var i = 1;
  while (i<sum/2){
    combinations.push([i, sum-i]);
    var sub_arrays = getAllSubSums(sum-i);

    var k = 0;
    while (k<sub_arrays.length/2){
      sub_arrays[k].push(i);
      combinations.push(sub_arrays[k]);

      
      k = k + 1;
    }
    i = i + 1;
  }

  return combinations;
}


function getAllSubSums(sum){
  sub_combinations = [];
  var j = 1;
  while (j<sum/2){
    sub_combinations.push([j, sum-j]);
    j = j + 1;
  }

  return sub_combinations;
}






print(getPossSums(10).join('\n'));

// => [[1,9],[2,8],[3,7],[4,6], [1,4,5], [1,6,3]