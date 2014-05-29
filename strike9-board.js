
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
            player_total = 0;
            console.log("New roll is " + computer_roll);
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



};