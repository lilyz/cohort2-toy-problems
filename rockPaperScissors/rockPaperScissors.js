
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
	function rockPaperScissors(){
		var x=["rock","paper","scissors"];
		var result=[];

		for (var i = 0; i < x.length; i++) {
			for (var j = 0; j < x.length; j++) {
				for (var k = 0; k < x.length; k++) {
					 result.push([].concat(x[i],x[j],x[k]));
				}
			}
		}
		return JSON.stringify(result);
		

	}
	function roPaSc(n){
		var x=["rock","paper","scissors"];
		var result=[];
		if(n===0){
			 result.push([].concat(rockPaperScissors()));
			 return result;

		}
		else {
			return roPaSc(n-1);
		}


	}
