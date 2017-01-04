
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
                                                             /*not all frome me/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function game(){
	var arr=["rock","paper","scissors"]
var ciriar=[]
for(var i=0;i<arr.length;i++){
	for(var j=0;j<arr.length;j++){
		for(var s=0;s<arr.length;s++){
			ciriar.push([],arr[i],arr[j],arr[s])
		}
	}
}
return ciriar 
}
// function game(){
// 	var arr=["rock","rock","rock"]
// 	var arr2=["scissors","scissors","scissors"]
// 	var arr3=["paper","paper","paper"]
//      for(var i = 0 ; i<arr.length;i++){

//      }
// }
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
