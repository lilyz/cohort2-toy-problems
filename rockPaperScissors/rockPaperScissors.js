
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








