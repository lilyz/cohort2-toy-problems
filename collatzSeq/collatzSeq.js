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


var longestCollatzSeq = function(){
	var max=[];
	var arr=[]
	var arr2=[]
	var once=true
	for (var i = 999999 /* this is the number of iterates, sometimes it brakes the browser if it was big*/; i >1 ; i--) {
		n=i;
		while(n!==1){
			if (once){
				arr.push(n);
				once=false;
			}
			if (n%2===0){
				n=n/2;
				arr.push(n)
			}else{
				n=3*n+1;
				arr.push(n)
			}
		}
			once=true;
			arr2.push(arr)
	}
	for (var i = 0; i < arr2.length; i++) {
		(arr2[i].length>max.length) ? max=arr2[i] : null;
	}
	return max[0];
}