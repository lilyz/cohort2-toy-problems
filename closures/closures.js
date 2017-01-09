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

function power(exponent){

return{
squareCalc : function(x){
	return Math.pow(x, exponent);
}
cubeCalc :  function(y){
	return Math.pow(y.exponent);
}
	return power;
}
}
