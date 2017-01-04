
/*
* Write a function that generates every sequence of throws a single player could throw over a three-round game of rock-paper-scissors.
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
<<<<<<< HEAD
*/ 

var rock_paper_scissors = function() {
	var array = [];
	var choice = ['rock', 'paper', 'scissors'];
	for (var i = 0; i < choice.length; i++) {
		for (var j = 0; j < choice.length; j++) {
			for (var z = 0; z < choice.length; z++) {
				array.push([choice[i], choice[j], choice[z]]);
			}
		}
	}
	return array;
};
/*
* Extra credit:
*   - Make your function return answers for any number of rounds.
*/
var rock_Paper_ScissorsExtra = function(num) {
	var array = [];
	var choice = ['rock', 'paper', 'scissors'];
	var result = function(play, round) {    
		if (round === 0) {
			array.push(play);
		}
		else {
			for (var i = 0; i < choice.length; i++) {
				result(play.concat(choice[i]), round-1);
			}
		}
	};
	result([], num);
	return array;
};



=======
*
*/
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
>>>>>>> 6568bbd23274e6102779dd33ae75e4ed66b62768

