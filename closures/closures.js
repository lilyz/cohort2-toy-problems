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
//Time complexity: Big O(1) I think since there are iterations, it's constant
function pow(exponent){
	if (exponent === 2){
		return function square (number){
			return Math.pow(number, 2);}
		}else if( exponent === 3){
		return function cube (number){
			return Math.pow(number, 3);}
	}
};

//Or use this
function pow(exponent){
		return function power (number){
			return Math.pow(number, exponent);}
};