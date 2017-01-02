
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
function rsp(n){
	var x=['rock','scissors','paper'];
	if(n>3){
      for(var i=0;i<n-3;i++){
      	if(x[i]===undefined){
      	x.push(x[i]);	
      	}	
      }
	}
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			for(var k=0;k<n;k++){

				array.push(arr.push(x[i],x[j],x[k]))
			}
		}
	}
	return array;
}
function f(n){
	for(var i=0;i<n;i++){
		console.log(sahar(n));
	}
}

