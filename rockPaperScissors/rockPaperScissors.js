
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

function rockPaperScissors(player){
/* Omega elems = {rock , paper , scissors}
accident1 : rockPaperScissors(1) = 6 probabilities
accident2 :rock-paper-scissors(2) = 12 probabilities
accident3 rock-paper-scissors(3) = 36 probabilities 
etc..*/
 var OmegaElem = ["rock" , "paper" , "scissors" ];
     accid = [];
     accelem;
     index;
     i;
     if (player > 0) {
     	for (i = 0; i < OmegaElem.length; i++) {
     		index = Math.floor(Math.random() * OmegaElem.length);

     		return accid.push(accelem[index]);
     	}
     }
}


