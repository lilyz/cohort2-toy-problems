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

/*var set =function(n){
var someinstance = {};
someinstance.n = n;
someinstance.pow = function(n){
	Math.pow(n,n)
},
someinstance.square=function(n){
	Math.pow(n,2)
},
someinstance.cube=function(n){
	Math.pow(n,3)
}

return someinstance;

}*/


var set =function(n){
//var someinstance = {};
//someinstance.n = n;
fn:function(x){
	 Math.pow(n,x)
}
return fn
}






/*
Problem 2:
Write a function pingPongTracker that accepts no arguments and returns an object with the
following methods:
- timeSpentPlaying() should return the total amount of time you have played pingpong.
- playOneGame() should increase the total time you played pingpong by 15 minutes 
  and return a string "Game played"
- myLevel() should return your experience level based on how much time you have spent playing
  pingpong. These are the levels: a) Less than 30 minutes - "I need to improve my game"
                                  b) 30-100 minutes - "You need to improve your game"
                                  c) More than 100 minutes - "Wow, I have wasted a lot of time"

Example:
var myGame = pingPongTracker();
myGame.playOneGame();//should return "Game played";
myGame.playOneGame();//should return "Game played";
myGame.timeSpentPlaying(); //should return 30;
myGame.myLevel(); //should return "You need to improve your game"
*/
u

var pingPongTracker=function(){
	var someinstance={};
	someinstance.count=0;
	someinstance.x;
	someinstance.timeSpentPlaying=function(){
		x= setInterval(function(){ cont++ }, 1000)
		return count

	},
	someinstance.playOneGame=function(){
		return count*(15*60)

	},
	someinstance.myLevel=function(){
		if(count / 60 <30){
			return "I need to improve my game"
		}
		else if(30<count /60 <100){
			return "You need to improve your game"
		}
		else if (count / 60 >100){
			return "Wow, I have wasted a lot of time"
		}

	}

}







