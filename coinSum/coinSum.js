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
function  coinCombination(num,n=0) { // m new argument to make sum with number
	var arr = [1,2,5,10,20,50,100,200]
	if(num===0) return 1;
		// we will make recursion for sumation from arr[n] with num
		// every time we will decrease one and make the sumation

		//if the sumation equale to numbe we will make result + 1 and take the next number
		//until end of array then we will return the final result of sumation  

}










