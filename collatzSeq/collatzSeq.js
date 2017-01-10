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

var length = function(numb){
  var seqarr =[];
  seqarr.push(numb);
  while (numb>1){
    if(numb%2===0){
      numb=numb/2
      seqarr.push(numb);
    }else if (numb%2===1){
      numb = (3*numb)+1
      seqarr.push(numb);
    }
  }
  return seqarr.length
}


var longestCollatzSeq = function(){
  var maxnum=  0 ;
  for (var i = 1000000 - 1 ; i > 0 ; i-- ){
    if(length(maxnum)<  length(i)){
      maxnum = i;
    }    
  }
  return maxnum;
}


