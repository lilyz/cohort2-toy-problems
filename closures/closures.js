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
//ptoblem1

 var pow=function(exponent){
 	
 		return function(number){
 		return Math.pow(number,exponent);
 		}
 }
 //problem 2
 var pingPongTracker=function(){
 	var time=0;

 	return {
 	timeSpentPlaying:function(){
 		return time+" "+"minutes";

 	},
 	playOneGame:function(){
 		time=time+15;
 		return "Game played";

 	},
 	myLevel:function(){
 		if(time<30){
 			return "I need to improve my game";

 		}
 		else if(time>=30 && time<=100){
 			return "You need to improve your game";

 		}
 		if(time>100){
 			return "Wow, I have wasted a lot of time";

 		}

 	}

 	}
 }