
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


function generate () {
	var newArr2 = ["rock", "paper", "scissors"];
		var newArr1 = [];		
		for(var i = 0; i<newArr2.length; i++) {
			for (var x = 0; x < newArr2.length; x++) {
				newArr1.push(newArr2[i]);
			}
		}
		return newArr1;
}