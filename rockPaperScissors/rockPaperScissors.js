
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
