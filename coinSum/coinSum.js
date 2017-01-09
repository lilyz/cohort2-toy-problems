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

function coinCombination (num){
	var result = 0;
	var arr = [1,2,5,10,20,50,100,200]
	//
	var calculate = function () {
		for(var i =0; i<arr.length; i++) {
			if(num === arr[i]) {
				result++;
				arr.splice(i,1);
				if(arr[i]>num){
					arr.splice(i,1);
				}
				if(num%arr[i]===0) {
					result++;
				}
			}
			else if (num != arr[i]){
				if(num%arr[i]===0) {
					result++;
				}
			}
		}
			calculate();
	}
	return result;
}