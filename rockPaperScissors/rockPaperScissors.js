function rockPaperScissors(num){
   var newarr=[]
   var newarr2=[]
   var arr=["rock","paper","scissors"]
   for(var i=0;i<Math.pow(num,num);i++){
   newarr.push(arr[Math.floor(Math.random() * arr.length)])
   
   }
   return newarr

}



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