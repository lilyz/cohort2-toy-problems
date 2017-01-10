/*
The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1

It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?
NOTE: Once the chain starts the
 terms are allowed to go above one million.
*/



var longestCollatzSeq = function(start){
  var result,counter= 0;
 // if (start > 1) {
 	//while(start > 1){}
    for(var i = 1000;i > 1;i--){
     if (start%2 === 0) {
      result = start/2
      counter++
     }else{
      result = start*3+1
      counter++
      }
      longestCollatzSeq(result)
    }
 // }
  return counter;
}