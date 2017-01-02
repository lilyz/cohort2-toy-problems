
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

  function rockPaperScissors(n, list, round) {  
  list = list || [];
  round = round || [];
  var choices = ['rock', 'paper', 'scissors'];

  if (n === 0) { 
  	return list.push(round.slice()); 
  }

  for (var i = 0; i < 3; i++) {
    round.push(choices[i]);
    rockPaperScissors(n-1, list, round);
    round.pop();
  }
  return list;
}
    


function rps(){
	var r=[]
	var choices=['rock','paper','scissors']
	for(var i=0;i<choices.length;i++){
		for(var j=0;j<choices.length;j++){
			for(var h=0;h<choices.length;h++){
				r.push(choices[i],choices[j],choices[h])
			}
		}
	}
	return r
}





















