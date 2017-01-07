
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


function rockPaperScissors(num) {
	var arr3=[];
	var arr4=[];
	var arr5=[];
	var arr = ["rock", "paper", "scissors"];
	for (var i = 0; i < Math.pow(num,3); i++) {
		var arr2=[Math.floor(Math.random()*3),Math.floor(Math.random()*3),Math.floor(Math.random()*3)];
		if (!arr3.includes(arr2)){
			arr3.push(arr2);
		}else{
			i--;
		}
	}
	for (var i = 0; i < arr3.length; i++) {
		for (var x = 0; x < arr3[i].length; x++) {
		 	arr4.push(arr[arr3[i][x]])
		 }
	for (var i = 0; i < arr4.length; i++) {
		arr5.push([arr4[i],arr4[i+1],arr4[i+2]]);
		i=i+2;
	}
	}
	return arr5;
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
>>>>>>> 6568bbd23274e6102779dd33ae75e4ed66b62768
}

