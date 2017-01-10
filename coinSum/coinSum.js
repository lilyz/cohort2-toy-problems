/*
In England the currency is made up of pound, £, and pence, p.
There are eight coins in general circulation:

   1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

   1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p

Given that total amount of pences, calculate the number of ways to create that amount.
Example:
coinCombination(200p) //-> 73682
<<<<<<< HEAD
*/
var coinCombination =function (string) {
	// I convert the string to array and I pop the last element 
	var arr =string.split('');
	var temp = arr.pop();
	//Now  I chieck if last element === p , If yes continue else exit . 	
	if (temp !== "p") {
		return;
	}
	// Now I convert the array to Number ;
	arr=Number(arr.join(''));
	console.log(arr)
	// Declare variable sum with initilize  0;
	var sum =0
	// Now should I compute the number of possabilty for each curncy and each to gether ;
	for (var i = 0; ; i++) {
	sum += arr/ 200 ;
	sum += arr/ 100 ;
	sum += arr/ 50 ;
	sum += arr/ 20 ;
	sum += arr/ 10 ;
	sum += arr/ 5 ;
	sum += arr /2 ;
	sum += arr ;
	// my problem is how I can compute the possabilty with curncy for each together 	
	}

	return sum ;
}
=======
*/
>>>>>>> 343fd57b9115bfa98f2276bd71d7649a0b7f81b4
