
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

function generate(){
	var result=[]
	var player1="";
	var player2="";
	var player3="";
	var round=["rock", "paper", "scissors"],
  for (var i=0;i<9;i++){
  	for(var j=0;j<3;j++){
  	var arr=["rock"];
  	arr.push(round[i])
  	arr.push(round[j])
  	result.push(arr);
  }

  	}
for (var i=0;i<9;i++){
	for(var j=0;j<3;j++){
  	var arr=["paper"];
  	arr.push(round[i])
  	arr.push(round[j])
  	result.push(arr);
}
  	}
for (var i=0;i<9;i++){
	for(var j=0;j<3;j++){
  	var arr=["scissors"];
  	arr.push(round[i])
  	arr.push(round[j])
  	result.push(arr);

  	}
  	return result
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
