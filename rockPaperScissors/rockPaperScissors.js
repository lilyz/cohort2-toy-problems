
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





