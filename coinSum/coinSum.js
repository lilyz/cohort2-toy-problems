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


function coinCombination(num){
	var coinsArray= [1, 2, 5, 10, 20, 50, 100,200];
  // My thougts
  // first i will take the first element and multiply it by input (it will be k)
  var k = num;
  var sum=0;
  var count=0;
  for(var i=0; i<3; i++){
  	// take the element of i
  	while(sum !== num){
    	// multiply it by k
    	// if sum === input, count++
    	// else try coinsArray[i] * k-1 + coinsArray[i+1] * k - input (it will be 1);
    	// untill way is found
    	// retry all combinations
    }
}
return count;
}
