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

// Time complexity: Big O(n^2) : using nested for loops
var longestCollatzSeq = function(){
	var count, longest, temp, arrayLongest;
	longest = 0;

	for ( var i = 10; i < 1000000; i++){
		arrayLongest = [];
		count = 0;
		temp = i;
		for (;temp !== 1;){
			if ( temp % 2 === 0){
				temp = temp / 2;
				arrayLongest.push(temp);
			}else {
				temp = (temp * 3) + 1;
				arrayLongest.push(temp);
			}
		}
		if (arrayLongest.length > longest){
			longest = arrayLongest.length;
		}
	}
	return i + " is the number with the longest chain, which consists of: " + longest + " elements";
}