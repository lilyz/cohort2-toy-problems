
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


Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};


function permute(arr){
	var possibleArr = arr;
	var hold;
	var result=[];
	var numOfPoss = Math.pow(arr.length+1,arr.length+1);
	for (var i = 0; i < numOfPoss; i++) {
		var possibleArr = arr;
		
		if(i%arr.length == 0){
			for (var j = i; j < arr.length; j++) {
				
				possibleArr.splice(j,1);
				possibleArr.insert(j,arr[i]);	
			}

			result.push(possibleArr);
		}
		
	}

	return result;
}