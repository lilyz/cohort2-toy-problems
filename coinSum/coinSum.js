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

// what i understand from the quseion is that he will gave me 
// the money in pence and i will have to cheak how much i can git out from it 
// pound and pence i have to use currency  of 1 $ and and 2 and give the number if how many ways 
//that i can creat out of this amount 


function currency(input){
	var arr=[1,2,5,10,20,50,100,200];
	var counter=0;
	//first i stored all the change of the  coians
	//now if he gave me 100 i have to start giviing him from 1 50p , 2 20p ,5 p,3 p , 3 1p
	
	for(var a=0; a < arr.length; a++ ){
		for(var b = 0; b<arr.length; b++){
			if(arr[a]+arr[b]){
		}
	}


}