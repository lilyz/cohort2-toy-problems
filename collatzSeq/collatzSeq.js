/*
The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1

It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.
*/


var longestCollatzSeq = function(num){
	var arr =[];
	var length = 0;
	for (var i = num; i >= 1; i--) {
	arr.push(num)	
	var num = i ;
	while(num!==1){
		if (num%2===1) {
		arr.push(3*num+1)
		num =3*num+1
		}
		else {
		arr.push(num/2)
		num =num/2;
		}	
	}
	if(length<arr.length){
		length =arr.length
		// console.log(length)
		arr=[];
	}
		arr=[];
	
}
	return length;
}