
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

function rockPaperScissors(num){
	var arr = ["rock","paper","scissors"];
	var final = [];
	var disnum = Math.pow(num,3);
	var counter = 0;
	while(counter < disnum){
		var minArr = [];
		for (var i = 0; i < num; i++) {
			minArr.push(arr[Math.floor(Math.random() * 3)]);
		}
		var isThereSame = false;
		for (var i = 0; i < final.length; i++) {
			if (JSON.stringify(minArr) === JSON.stringify(final[i])) {
				isThereSame = true;
				break;
			}
		}
		if (!isThereSame) {
			final.push(minArr)
			counter+=1;
		}
	}
	return final;
}