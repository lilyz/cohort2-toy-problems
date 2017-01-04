
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

>>>>>>> cba0403161af1b52cd68471d7804b98f26a4bf23
