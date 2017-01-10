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


var longestCollatzSeq = function(number){
  var result='';
  if( number === 1 ) {
  	result+=1;
  }
  if ( number % 2 === 0 ) {
  	result+= number+'->'+longestCollatzSeq( number / 2 );
  }
  if ( number % 2 === 1 && number !== 1) {
    result+= number+'->'+longestCollatzSeq( 3 * number + 1 );
  }
  return result ;
}

function terms(value) {
  return longestCollatzSeq(value).split('->').length;
}

function longestChain( maxNum) {
  var temp = 0;
  var temp2 = 0;
  for(var i = 1 ; i < maxNum ; i++){
    if( terms ( i ) > temp ) {
      temp = terms ( i );
      temp2 = i;
    }
  }
  return temp + 'the number is:' + i;
}
