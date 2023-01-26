function randPraise(){
  var praise = ["Awesome!", "Good job!", "Knew you could do it!", "Sweet!", "You got this!", "Again! Again!", "Keep it up!", "Keep going!", "Easy, right?"];
  var rand = Math.floor(Math.random() * (praise.length));
  return praise[rand];
}

print(randPraise());