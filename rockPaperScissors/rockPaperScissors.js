
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
<<<<<<< HEAD
*/ function rockPaperScissors(n){
	var x = [];
	var box = [];
	var obj = {rock:0,paper:1,scissors:2};
	for (var i = 0; i < n; i++) {
		x[i] = "rock"
	}

for (var i = n-2; i > 0; i--) {
  for (var z in obj){
	for (var key in obj){
		box.push(x);
		x[n-1] = key;
	}
  	x[i] = z;
  }
}

}
