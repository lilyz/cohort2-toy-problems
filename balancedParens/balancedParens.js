/*
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *	"())"
 */



 function balancedParens(input){  
  var Arr = [];
  var pairs = {'[':']','{':'}','(':')'
  };
  var close = {')': 1,
    ']': 1,
    '}': 1};
  for(var i = 0; i < input.length; i++){
    var first = input[i];
    if(pairs[first]){
      Arr.push(pairs[first]);
    } else if(first in close){
      if(Arr[Arr.length -1] === first){
        Arr.pop();
      } else{
        return false;
      }
    }
  }
  // if(input.indexOf('function')>-1){
  // 	var res = JSON.parse(input);
  // 	balancedParens(res)

  // }
  return !Arr.length;
}








	