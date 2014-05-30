## STRIKE NINE (one player vs. computer)

### A JavaScript implementation of "Strike 9". 

[View live demo](http://samschlinkert.com/strike9/)

[Blog post about some of the game-over array checking](http://sts10.github.io/blog/2014/05/30/strike-9-game/)

Rules of the Game:

1) The player has a game board with all numbers from 1-9 visible (inclusive). 

2) The computer rolls two six-sided dice and presents the TOTAL to the player.

3) The player then may remove ANY combination of one or more numbers from his or her board that add up to TOTAL. 

For example, if computer rolls a TOTAL of  9, player can choose to remove any of the following combinations:  [9], [1,8], [2,7], [1,2,6], [2,3,4], etc.  
4) The numbers so chosen are then permanently removed from play. 

5) Once this is done, the computer rolls again and play continues.

PLAYER WINS if he or she removes all their numbers from the board.

PLAYER LOSES if the computer rolls a total that the player cannot remove with the numbers remaining on their board.

