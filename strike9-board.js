"use strict";
window.onload = function(){
  for(var i = 1; i<=9; i++){
    var canvas = document.getElementById(i.toString());
    var context = canvas.getContext("2d");
    context.fillStyle = "#111";
    context.fillRect(0,0,90,90);
  }
 
  var board = document.getElementById("board");
  board.addEventListener("click", function(evt){
    var e = evt.target; //get the target element that was clicked
    if(e.nodeName.toLowerCase() === "canvas"){ // only trigger canvas elements
        alert("You clicked! " + e);;
        console.log(e);
    }
  });
};