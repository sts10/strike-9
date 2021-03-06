
"use strict";
window.onload = function(){
  var board_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var player_moves_remaining = [1,2,3,4,5,6,7,8,9];
  var possible_combinations = [];

  var computer_roll = 0;
  var player_total = 0;

  resetGame();


  var board = document.getElementById("board");

  board.addEventListener("click", function(evt){
    var e = evt.target; //get the target element that was clicked
    if(e.nodeName.toLowerCase() === "canvas"){ // only trigger if a canvas element was clicked
      var canvas = document.getElementById(e.id);
      var context = canvas.getContext("2d");

      var box_index = e.id - 1;

      if (board_array[box_index] == 1) {
        console.log("You already have chosen that box!");
      } else {
        // make box white
        context.fillStyle = "#fff";
        context.fillRect(0,0,90,90);

        // update both tracking arrays
        board_array[box_index] = 1; 
        removeElement(player_moves_remaining, e.id);

        // update player_total for this turn
        player_total = player_total + box_index + 1;

        // if on this turn the player successfully summed to the dice roll
        if (player_total == computer_roll){

          // check if player has won
          if (board_array.indexOf(0) == -1){   
            sendMessage("You won!");
            setTimeout(function(){ resetGame(); }, 2000);
          } else { //still playing
            // re-roll dice. 
            computer_roll = rollTwoDie();

            // with new dice roll, we can already figure out if the game is over
            if (isGameOver(computer_roll, player_moves_remaining)){
              postDiceRoll(computer_roll); 
              sendMessage("Game Over");
              setTimeout(function(){ resetGame(); }, 2000);
            } else { // if there exists a way to make the roll's sum...
              sendMessage(randPraise()); // send encouragement 
              postDiceRoll(computer_roll); // and new dice roll

              // reset for new roll, same game
              possible_combinations = []; 
              player_total = 0;
            }
          }
        } else if (player_total > computer_roll){  // if player went above the dice total...
          sendMessage("Game Over");
          setTimeout(function(){ resetGame(); }, 2000);
        }
      }
    }
  });


  function rollTwoDie(){
    var x = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    var y = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    return x + y;
  }

  function removeElement(arrayName,arrayElement){
    for(var i=0; i<arrayName.length;i++ ){ 
      if(arrayName[i]==arrayElement){
        arrayName.splice(i,1); 
      }
    } 
  }

  function sendMessage(mess){
    var messageBox = document.getElementById("messageBox");
    messageBox.innerHTML = mess;
  }

  function postDiceRoll(num){
    var diceRollBox = document.getElementById("diceRoll");
    diceRollBox.innerHTML = num;
  }

  function randPraise(){
    var praise = ["Awesome!", "Good job!", "Knew you could do it!", "Sweet!", "You got this!", "Again! Again!", "Keep it up!", "Keep going!", "Easy, right?"];
    var rand = Math.floor(Math.random() * (praise.length));
    return praise[rand];
  }



  function isGameOver(roll, player_moves_remaining){
    var ways_to_fulfill_roll = getAllPossAddends(roll);
    if (playerHasAMove(player_moves_remaining, ways_to_fulfill_roll)){
      return false; // game is not over
    } else {
      return true; // game is over
    }
  }

  function playerHasAMove(player_moves_left, passing_moves){
    for(var i = 0; i < passing_moves.length; i++) {
      var matches = 0; 
      for(var j = 0; j < passing_moves[i].length; j++) {  
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

  function getAllPossAddends(sum, baggage){
    // if baggage argument is undefined, this is our first run through
    // so set baggage = []
    // baggage is effectively an optional argument with a default value of [] if undefined in function call
    if (typeof baggage == 'undefined'){
      baggage = [];
      possible_combinations = [];
      possible_combinations.push([sum]); // can just play the number itself 
    }

    for (var j=1; j < sum/2; j++){
      // if j is not in baggage and sum-j is not in baggage
      if (baggage.indexOf(j) == -1 && baggage.indexOf(sum-j) == -1){
        // add j and sum-j to baggage to make our new array we may add as a possible_combination
        var new_array = baggage.concat(j, sum-j);

        // if new_array is NOT a subArray of possible_combinations yet... 
        if (!isSubArray(new_array,possible_combinations)){
          possible_combinations.push(new_array);
        }

        // prep new_baggage and send new sum and baggage back to top of the function
        var new_baggage = baggage.concat(j);
        getAllPossAddends(sum-j, new_baggage);
      }
    }

    return possible_combinations;
  }


  // Array manipulation helpers
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


  function resetGame(){
    for(var i = 1; i<=9; i++){
      var canvas = document.getElementById(i.toString());
      var context = canvas.getContext("2d");
      context.fillStyle = "#000";
      context.fillRect(0,0,90,90);

      context.textAlign= "center";
      context.textBaseline = 'middle';
      context.fillStyle = "#fff";
      context.font="30px 'Press Start 2P'";
      context.fillText(i,45,45);
    }

    board_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    player_moves_remaining = [1,2,3,4,5,6,7,8,9];

    player_total = 0;
    sendMessage('New Game');

    computer_roll = rollTwoDie();
    postDiceRoll(computer_roll);

    possible_combinations = [];
  }

};
