
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
<<<<<<< HEAD


function rockPaperScissors(num){
	var finalResult=[]
	while(num > 0)
	{
		var result=[];
		var x=["rock", "paper","scissors"];
		var y=["rock", "paper","scissors"];
		var z=["rock", "paper","scissors"];

		for(var i=0; i< 3; i++){
									result.push(x[i]);

			for(var j=0; j< 3; j++){
										result.push(y[j]);

				for(var h=0; h< 3; h++){

						result.push(z[h]);
						finalResult.push(result);
					
				}
				result.pop();
			}
			result.pop()

		}

		num--;
	}


	return finalResult;
}


var z=["rock", "paper","scissors"];
var result=[]
var finalResult=[]
var x=3;
function rockPaperScissors(num){
	if(x === 0 && num ===0)
		return finalResult;
	else{
			for(var i=num-1;i>=0; i++){
				result.push(z[i]);
				rockPaperScissors(num--);
				x--;
			}

		finalResult.push(result);
		x=3;
		rockPaperScissors(num);
		}
	} 

=======
function rockPaperScissors(number){
  var array =[];
  var array2 =["rock","paper","scissors"]
  var bigArray=[];
  array.length=3;
  bigArray.length=number;
  	if (number > 0) {
  		for (var i = 0; i < array.length; i++) {
	    	var x=Math.floor(Math.random() * array2.length)
    		array.push(array2[x])
  		}
  			if (bigArray.indexOf(array) === -1) {
  				bigArray.push(array)
  			}
  	}	
  return bigArray + rockPaperScissors(number-1);
}

>>>>>>> 6568bbd23274e6102779dd33ae75e4ed66b62768
