
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

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};

function rockPaperScissors(n){
	var arrayTotal, arraySmall, arrayOptions;
	arrayOptions = ["rock", "paper", "scissors"];
	arrayTotal = [];
	if (n >= 3){
	for (j = 1; j <= factorial(n); j++){
		arraySmall = [];
		for (i = 1; i <= n; i++){
			arraySmall.push(arrayOptions[Math.floor(Math.random() * 3)]);
		}
			for (k = 0; k < arrayTotal.length; k++){}
				if (arrayTotal[k]) // to be continued
		arrayTotal.push(arraySmall);
	}
	return arrayTotal; 
	}
}