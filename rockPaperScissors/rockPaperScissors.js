
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

function rockPaperScissors() {
	var obj={
		0:"rock",
		1:"paper",
		2:"scissors"
	};
	var result=[];
	var innerarr;
	for (var i = 0; i < 3 ; i++) {
		innerarr=[];
		for (var j = 0; j < 3 ; j++) {
				innerarr.push(obj[j]);	 
				}
		result.push(innerarr);		
	}
	return result;	
}


