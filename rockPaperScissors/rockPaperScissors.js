
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