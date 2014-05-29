
"use strict";
window.onload = function(){
  // alert("test");

  for(var i = 1; i<=9; i++){
    var canvas = document.getElementById(i.toString());
    var context = canvas.getContext("2d");
    context.fillStyle = "#111";
    context.fillRect(0,0,90,90);
  }



  var board_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var player_moves_remaining = [1,2,3,4,5,6,7,8,9];

  var player_total = 0;

  var computer_roll = rollTwoDie();
  console.log("Computer rolls a " + computer_roll);

  var possible_combinations = [];

 
  var board = document.getElementById("board");

  board.addEventListener("click", function(evt){
    var e = evt.target; //get the target element that was clicked
    if(e.nodeName.toLowerCase() === "canvas"){ // only trigger canvas elements
        var canvas = document.getElementById(e.id);
        var context = canvas.getContext("2d");

        var box_index = e.id - 1;

        if (board_array[box_index] == 1) {
            console.log("error!");
        // } else if (){
          // console.log("you lost");
        } else {
          context.fillStyle = "#fff";
          context.fillRect(0,0,90,90);
          board_array[box_index] = 1;

          console.log("box_index is "  +  box_index);

          removeElement(player_moves_remaining, e.id);
          console.log("player_moves_remaining " + player_moves_remaining);

          player_total = player_total + box_index + 1;
          console.log("Player total is " + player_total);


          if (player_total == computer_roll){
            // re-roll dice. 
            computer_roll = rollTwoDie();
            console.log("New roll is " + computer_roll);
            console.log("player_moves_remaining " + player_moves_remaining);
            if (isGameOver(computer_roll, player_moves_remaining)){
              console.log("game over");
            } else {
              possible_combinations = [];
              player_total = 0;
            }
          }
        }
    }
  });


  function rollTwoDie(){
    var x = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    var y = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    return x + y;
  };

  function removeElement(arrayName,arrayElement){
    for(var i=0; i<arrayName.length;i++ ){ 
      if(arrayName[i]==arrayElement){
        arrayName.splice(i,1); 
      }
    } 
  };




  function isGameOver(roll, player_moves_remaining){
    var ways_to_fulfill_roll = getPossSums(roll);
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
  };



};