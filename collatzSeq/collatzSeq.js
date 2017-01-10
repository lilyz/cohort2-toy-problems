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

var array=[];
for (var i=1000000;i>1;i--){
	var arr=[];
	for(var j=i;j>1;j--){
		if(j%2==0){
			for(var k=j;k>1;k*0.5){
				arr.push(k);
			}
			array.push(arr);
		}else{
			for(var k=j*3+1;k>1;k*0.5){
				arr.push(k);
			}
			array.push(arr);
		}
	}
}
for(var i=0;i<array.length;i++){
	var longest=array[0];
	if(array[i].length>longest.length){
		longest=array[i];
	}
}
return array;
}