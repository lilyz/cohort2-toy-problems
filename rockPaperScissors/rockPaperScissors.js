
/*
* Write a function that generates every sequence of throws a single
* player could throw over a three-round game of rock-paper-scissors.
*
* Your output should look something like:
*   [["rock", "rock", "rock"],
*    ["rock", "rock", "paper"],
*    ["rock", "rock", "scissors"],
*    ["rock", "paper", "rock"],
             ...etc...
     ]
*
* Extra credit:
*   - Make your function return answers for any number of rounds.
* Example:
* rockPaperScissors(5); // => [['rock', 'rock', 'rock', 'rock', 'rock'], etc...]
*
*/
function rock (){
  var arr = [];
  var newarr = ['rock', 'paper', 'scissors'];
  for (var i = 0; i < newarr.length; i++) {
    for (var l = 0; l < newarr.length; l++) {
      for (var x = 0; x < newarr.length; x++) {
        arr.push([newarr[i], newarr[l], newarr[x]]);
      }
    }
  }
  return arr;
}
