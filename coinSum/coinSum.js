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

function coinCombination(number) {

	var bound = "1p, 2p, 5p, 10p, 20p, 50p, 100p, 200p"
      
    //var index = bound.substring(number,-1)

	var array = []
	 
	for(var i = 0 ; i < bound.length ; i++){///O(n)

		if(bound.indexOf(number) >= 0){
           /////////to equall number
         ///i need to have new array from first index to the number 
         //// i thot i shuld to have to for loop or recergen and slice the array rely idon't know

		}

	}
	return array.join("")
}