
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

function rockPaperScissors() {
	var arr = ["rock" , "paper" , "scissors"] ;
	var bigArr =[]
	var smallArr = [] ;
	for (var i = 0; i < arr.length; i++) {
		for(var j=0 ; j<arr.length ; j++){
			for(var k =0 ; k<arr.length ; k++){
			smallArr.push(arr[i] , arr[j] , arr[k])
			bigArr.push(smallArr)
			smallArr=[]
			}
		}
	}
	return bigArr ;
}


function extraRockPaperScissors(n){
	var arr = ["rock" , "paper" , "scissors"] ;
	var bigArr =[]
	outcomes(n, []);
	return bigArr;
	
function outcomes(cnt, smallArr){
  if (cnt === 0) {
    bigArr.push(smallArr);
    return;
  }
  arr.forEach(function(arr){
    outcomes(cnt-1, smallArr.concat(arr))
  })
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

>>>>>>> cba0403161af1b52cd68471d7804b98f26a4bf23
