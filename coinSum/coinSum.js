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
function coinCombination (currency){
	var p=[1,2,5,10,20,50];
	var y1=100;
	var y2=200;
	var count =0;
	for(var i =0 ; i< p.length ; i++){
		for (var j = i+1 ; j< p.length-1 ; j++){
			if(p[i]=== currency ){
				count++;
			}
			else if (currency >Math.max.apply(null, p)) {
				if(currency===y1||currency===y2){
					count++;
				}
			}
			else if(p[i]+p[j]===currency){
				count++;
			}
		}
	}
	return count;
}