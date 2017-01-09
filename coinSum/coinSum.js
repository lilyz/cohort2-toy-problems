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
 var p= parseInt(str.match(/\d+/)[0] );/// to get number from string and store in var p 
 var count=0;
 if(p>0){

 	var arr=[];
 	for(var i=1;i<100;i++){
 		arr.push(i);
 		/// to make array have num from 1 to 100 
 	}
	for(var i=1;i<arr.length;i++){
		count++;
		for(var j=i;j<arr[i];j++){
			if(p%j==0){

			count++;
		}
		}
		
	}
	return count;
 }
}