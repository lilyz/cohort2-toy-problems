
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

function rockPaperScissors(n){
	var newArr= new Array(n);
	var Arr1=["rock","paper","scissors"];
	for (var i = 0; i < newArr.length; i++) {
		newArr[i]=Arr1[0]+= " "+Arr1[i]
		// Arr1.splice(i,1)
		
	}
	return newArr;
}




