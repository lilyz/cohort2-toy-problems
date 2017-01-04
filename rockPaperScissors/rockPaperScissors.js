
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
function rsp(n){
	var x=['rock','scissors','paper'];
	if(n>3){
      for(var i=0;i<n-3;i++){
      	if(x[i]===undefined){
      	x.push(x[i]);	
      	}	
      }
	}
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			for(var k=0;k<n;k++){

				array.push(arr.push(x[i],x[j],x[k]))
			}
		}
	}
	return array;
}
function f(n){
	for(var i=0;i<n;i++){
		console.log(sahar(n));
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
>>>>>>> cba0403161af1b52cd68471d7804b98f26a4bf23
}

