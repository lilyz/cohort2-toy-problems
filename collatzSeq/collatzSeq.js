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


var longestCollatzSeq = function(n){
  var x=n;           //save the start point 
  var result = [];
  var maxArr=[]
  while(n>1){
    result.push(n)
    if (n%2 === 0){
      n=n/2;
      result.push(n)
    }
    else{
      n=3*n+1
      result.push(n)
    }
  }
  maxArr.push(result.length); //push the long of chain
  maxArr.push(n);              //push the number after his chain long
  if (n<1000000){
    longestCollatzSeq(n+1);
  }
  n=x;
  arrayOfmax(maxArr)  //when he reach to 1000000
}

var arrayOfmax=function(array){
  var max= Math.max.apply(null, numArray)
  indexOfmax=array.indexOf(max);
  return array[max+1];     // I push the number after his chain long 

}