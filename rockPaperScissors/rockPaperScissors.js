
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
function plyer (n){
    var ar=["rock","paper","scissors"]
    var newarr=[]
    var array=[]
    for ( var i =0 ; i< ar.length; i++){
        for ( var j=0 ; j<n ; j++){
    newarr.push(Math.random(i.toString()))
}
array.push (newarr)
}
return array
}