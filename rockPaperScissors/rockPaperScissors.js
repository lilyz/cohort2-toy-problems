
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

function rockpaperscissores(numberofround){
  var result=[];
  var words=["rock","scissor","paper"];
  var pos=Math.pow(3,numberofround);
  for (var i=0;i<=pos;i++){
    var arr=[]
    
    for (var j=0;j<=numberofround-1;j++){
     var rand=Math.floor( Math.random() * (3 - 0) + 0)
       arr.push(words[rand])

    }
      result.push(arr)
  }
    return result
}