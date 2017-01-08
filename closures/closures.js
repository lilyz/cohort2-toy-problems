/*
In this problem set we will review closures. Before you freak out, remember that closure is
just a function that returns another function.

Problem 1:
Write a function that accepts an exponent and returns back a function that accepts
a number and takes it to the power of the exponent.

Example:
var square = pow(2);
var cube = pow(3);

square(3);//should return 9
cube(3);//should return 27
*/

var pow=function (expo) {
 ex=expo
 return{
    pow:function(num){
   return Math.pow(num,ex)
   }
 
}
}


var pingPongTracker =function(){
	var counter=0 /// i make it like minute
	setInterval(function(){counter++; }, 100);
	return{
		timeSpentPlaying:function(){
          return counter
		}
		playOneGame:function(){
			counter=counter+15
			return "Game Played" + counter
		}
		myLevel:function(){
			if(counter < 30 ){
				return "I need to improve my game"
			}
			if(counter>30 && counter < 100){
				return "You need to improve your game"
			}
			if(counter > 100){
	 		return "Wow, I have wasted a lot of time"
			}
		}
	}
}