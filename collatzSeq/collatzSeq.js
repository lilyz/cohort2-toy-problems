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


var longestCollatzSeq = function(n){ // put n as function parameter
	//let end the chain with 1 as question wants by declare that integer as end point 
	last = 1;
	// empty array to push that sequence
	var arr = [];
	// now we want to generate that sequence under the conditions {longest and end with 1}
	// if we discovered that starting number that produced the last chain
	//assume starting number 10
	// may we can try with small peice less than million
	//apply the sequence with that rule (n/2 + 3n  ) + 1 may this last one be the last element of collatzseq








   return arr;

}