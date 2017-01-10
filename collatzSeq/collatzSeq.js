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


var longestCollatzSeq = function(start){
  var start = start || 999999; //if you want to go more than 1 million
  var max = 0;
  var maxLength = 0; 
  for(var i=start; i > 0; i--){ // looping through number from 1 (million -1) till 1
    var sequence = [];
    var number = i;
    while(number !== 1){ // generating sequence for that number
      if(number % 2 === 0){
        number = number / 2;
        sequence.push(number);
      } else if(number % 2 === 1) {
        number= (3 * number + 1);
        sequence.push(number);
      }
    }
    if(sequence.length > maxLength){ // comparing if the last sequence generated length is bigger than the max length
      max = i; // assigning that number to max so we can return it;
      maxLength=sequence.length; // new max length
    }
  }
  return max;
}