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

var longestCollatzSeq = function(start,storage){
	var storage = storage || {};
	var start = start || 10000;
	var node = start;
	var cnt, check, result;
	cnt = 0; check = 0; result = 0; 
	if(start === 1){
		for(var key in storage){
			if(storage[key] > check){
				check = storage[key];
				result = key;
			}
		}
		return result;
	}
	while(node !== 1){
		if(node%2){
			node = node*3 + 1;
			cnt+=1;
		}else{
			node = node/2;
			cnt+=1;
		}
	}
	storage[start] = cnt;
	return longestCollatzSeq(start-1,storage);
}