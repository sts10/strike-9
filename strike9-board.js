
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
  var player_total = 0;

  var computer_roll = rollTwoDie();
  console.log("Computer rolls a " + computer_roll);
 
  var board = document.getElementById("board");

  board.addEventListener("click", function(evt){
    var e = evt.target; //get the target element that was clicked
    if(e.nodeName.toLowerCase() === "canvas"){ // only trigger canvas elements
        var canvas = document.getElementById(e.id);
        var context = canvas.getContext("2d");

        var box_number = e.id - 1;

        if (board_array[box_number] == 1) {
            console.log("error!");
        // } else if (){
          // console.log("you lost");
        } else {
          context.fillStyle = "#fff";
          context.fillRect(0,0,90,90);
          board_array[box_number] = 1; 
          

          player_total = player_total + box_number + 1;
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



};