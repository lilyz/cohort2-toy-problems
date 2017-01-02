
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


var array=[];
function rockPaperScissors(){
	var arr=[];
	var roke="roke";
	var paper="paper";
	var scissors="scissors";   
	for (var i = 0; i < 27; i++){
		array.push(roke)
		for (var j = 0; j < 27; j++) {
			array.push(paper);
			for (var k = 0; k < 27; k++) {
				array.push(scissors);
				arr.push(array)
				
			}
		}
	}
	return arr;
}
