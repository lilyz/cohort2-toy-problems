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

var longestChain=function(){
	var arr=[],a,num=[];
	for(var i=99999;i>100;i-=2){//the longest chaine most of time in odd numbers so i test it just with odd numbers...
		num.push(i);
		a=longestCollatzSeq(i)
		arr.push(a.length)
	}
	max=Math.max(...arr);
	index=arr.indexOf(max);
	return "the number is :" + num[index]+", it is longe is :"+ arr[index];
}
var longestCollatzSeq = function(num){
var arr=[num];
   function collecte(n){
	if(arr[arr.length-1]===1){
		return arr;
	}
	else if(n%2===0){
      n/=2;
      arr.push(n);
	}
	else{
		n=3*n+1;
		arr.push(n);
	}
	return collecte(n);
}
arr=collecte(num)	
return arr;

}