/*
In England the currency is made up of pound, £, and pence, p.
There are eight coins in general circulation:

   1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

   1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p

Given that total amount of pences, calculate the number of ways to create that amount.
Example:
coinCombination(200p) //-> 73682
*/

function coinCombination(str){
	var pence = [1 , 2 , 5 , 10 , 20, 50 , 100 , 200]
	var number = str.match(/\d+/)[0]
	var count ; 
	var sum;
	if(str.indexOf("£")>-1){
		number*= 100 
	}
	for (var i = 0; i < pence.length; i++) {
		if(number%pence[i] === 0){
			count++ ;
		}
	}
	
}
//first i added all the coins in an array;
// i've changed the pounds into pences as well ;
// declared a variabla that would hold the sum of any added possibility , and another one to count how many
// possible way exists ;
// basically i wanna loop over the array of coins and then check all the possibilities
 // i'm pretty sure we need recursion btw  