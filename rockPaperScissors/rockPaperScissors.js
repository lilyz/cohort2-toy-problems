
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

function rockPaperScissors(){
	var strArr=['rock','paper','scissors']
	var fArr=[]
	for (var i = 0; i < strArr.length; i++) {
		for (var j = 0; j < strArr.length; j++) {
			for (var x = 0; x < strArr.length; x++) {
				var arr=[]
				arr.push(strArr[i],strArr[j],strArr[x])
				fArr.push(arr)
			}
		}
	}
return fArr
}

///// extra credit
function rockPaperScissors1(num){
	var strArr=['rock','paper','scissors']
	var fArr=[]
	for (var i = 0; i < num; i++) {
		for (var j = 0; j < num; j++) {
			for (var x = 0; x < num; x++) {
				var arr=[]
				arr.push(strArr[i],strArr[j],strArr[x])
				fArr.push(arr)
			}
		}
	}
return fArr
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
