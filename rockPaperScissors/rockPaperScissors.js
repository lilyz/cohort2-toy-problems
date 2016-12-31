
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
var arr=[];
function game(){
	var ne=[];
	var r="rock"
	var p="paper"
	var s="scissors"
		 for(var i= 0; i<; i++){
		    	arr.push(r)
			   
			for(var j=0; i<ne; i++){
		     	arr.push(p)
			    
				for(var d= 0; i<27; i++){
					arr.push(s)
					ne.push(arr)
				}

			}
		}	

return ne;
}