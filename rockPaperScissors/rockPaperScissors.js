
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


function each(coll, f) {
    if (Array.isArray(coll)) {
       for (var i = 0; i < coll.length; i++) {
           f(coll[i], i);
       }
    } else {
       for (var key in coll) {
           f(coll[key], key);
       }
    }
}

/*function rockPaperScissors2(n){
	var x=[]
	
	var y=["rock","paper","scissors"]
   each(y,function(ele){
   		var getRandom = y[Math.floor(Math.random() * y.length)];
	var z=getRandom
	x.push(z)

   })

return x 

}*/

function rockPaperScissors(n){
	var x=[]
	
	var y=["rock","paper","scissors"]
	var length =Math.pow(y.length,n)

  while(length!==0){
  	for(var i=0;i<length;i++){
  		x.push([y[i],y[i+1],y[i+2]])
  		var temp=y.splice(i,1)
  		//y.splice(2,0,temp)
  		y.push(temp)

  	} 
  	return x  
  }  


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
}


