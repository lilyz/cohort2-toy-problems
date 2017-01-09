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

// Big O(x^n)
var coinCombination = function(target) {
	var coinTypes, count, len;
  coinTypes = [1,2,5,10,20,50,100,200];  count = 0;
	len = coinTypes.length; //using a shorthand for the length of the array of coint types

  //we will use a recursive approach to go through the array of coins and substract them from our total
  for (var a = target; a >= 0; a -= coinTypes [ len - 1]){
  	// going through one coin type at a time, combining it with other coins, and using count++
  	// to measure where we reached with our combinations
  	for (var b = a; b >= 0; b -= coinTypes [ len - 2]){
  		for (var c = b; c >= 0; c -= coinTypes [ len - 3]){
  			for (var d = c; d >= 0; d -= coinTypes [ len - 4]){
  				for (var e = d; e >= 0; e -= coinTypes [ len - 5]){
  					for ( var f = e; f >= 0; f -= coinTypes [ len - 6]){
  						for (var g = f; g >= 0; g -= coinTypes [ len - 7]){
  								count++;
  							}
  						}
  					}
  				}
  			}
  	}
  }
  return count + " combinations";
}